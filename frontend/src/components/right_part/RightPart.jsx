import React, { useState, useEffect, useRef } from "react";
import ChatFooter from "./chat/ChatFooter";
import ChatHeader from "./chat/ChatHeader";
import ChatContent from "./chat/ChatContent";
import { useDispatch, useSelector } from "react-redux";
import { selectRoom } from "../../redux/roomSlice";
import { selectUser, useMercureToken, useToken } from "../../redux/userSlice";
import getInfoRoom from "../../api/room/getRoomInfo";
import getMessage from "../../api/message/getMessage";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { addMessage, selectMessages } from "../../redux/messagesSlice";
import { getMessagesAsync } from "../../redux/messagesSlice";
const RightPart = () => {
  let roomData = useSelector(selectRoom);
  let userData = useSelector(selectUser);
  const token = useSelector(useToken)
  const messagesList = useSelector(selectMessages)
  const mercure_token = useSelector(useMercureToken)
  const dispatch = useDispatch()

  const [rightPopupState, setRightPopupState] = useState(false);
  const [usersData, setUsersData] = useState([]);
  const [offset, setOffset] = useState(0);

  let ref = useRef(false);

  const subscribeToMercure = (topic) => {
    const url = new URL("http://localhost:9090/.well-known/mercure");
    console.log("ROOOOOOOM", roomData?.id);
    url.searchParams.append("topic", `chat_room_${roomData?.id}`);

    fetchEventSource(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${mercure_token}`,
        Accept: "text/event-stream",
      },
      onopen() {
        console.log("connexion établie");
      },
      onmessage(event) {
        if (!ref.current) {
          const message = JSON.parse(event.data)
          dispatch(addMessage(message))
        } else {
          ref.current = false;
        }
      },
      onclose() {
        console.log("connexion fermé");
      },
      onerror(error) {
        console.error("Erreur de connexion à Mercure:", error);
      },
    });
  };

  useEffect(() => {
    if (roomData !== null) {
      //récupère les infos de la room
      getInfoRoom(roomData?.id, userData?.id, token).then((response) => {
        setUsersData(response);
      });
      //recupère les messages
      const request = {
        user_id: userData?.id,
        room_id: roomData?.id,
        offset: offset,
      };
      const payload = { request, token}
      dispatch(getMessagesAsync(payload))
      subscribeToMercure(`chat_room_${roomData?.id}`);
    }
  }, [roomData]);

  return (
    <div className="w-full h-full pl-5">
      <div className="p-3 bg-neutral_dark/80 h-full rounded-2xl">
        <ChatHeader
          rightPopupState={rightPopupState}
          setRightPopupState={setRightPopupState}
          roomData={roomData}
        />
        <ChatContent
          personnalId={userData?.id}
          messages={messagesList}
          users={usersData}
          rightPopupState={rightPopupState}
        />
        <ChatFooter />
      </div>
    </div>
  );
};
export default RightPart;
