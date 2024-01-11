import React, { useState, useEffect, useRef } from "react";
import ChatFooter from "./chat/ChatFooter";
import ChatHeader from "./chat/ChatHeader";
import ChatContent from "./chat/ChatContent";
import { useSelector } from "react-redux";
import { selectRoom } from "../../redux/roomSlice";
import { selectUser } from "../../redux/userSlice";
import getInfoRoom from "../../api/room/getRoomInfo";
import getMessage from "../../api/message/getMessage";
import { fetchEventSource } from "@microsoft/fetch-event-source";

const RightPart = () => {
  let roomData = useSelector(selectRoom);
  let userData = useSelector(selectUser);
  const mercure_token = localStorage.getItem("token_mercure");

  const [rightPopupState, setRightPopupState] = useState(false);
  const [usersData, setUsersData] = useState([]);
  const [messages, setMessages] = useState([]);
  const [isLoaded, SetIsLoaded] = useState(false);
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
          setMessages((oldArray) => [...oldArray, JSON.parse(event.data)]);
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
      getInfoRoom(roomData?.id, userData?.id).then((response) => {
        setUsersData(response);
      });
      //recupère les messages
      const request = {
        user_id: userData?.id,
        room_id: roomData?.id,
        offset: offset,
      };
      getMessage(request).then((response) => {
        setMessages(response);
        SetIsLoaded(true);
      });
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
          messages={messages}
          users={usersData}
          rightPopupState={rightPopupState}
        />
        <ChatFooter />
      </div>
    </div>
  );
};
export default RightPart;
