import React, { useEffect, useRef, useState } from "react";
import Rooms from "./Rooms";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { useSelector } from "react-redux";
import { logout, useMercureToken, useToken } from "../../redux/userSlice";
import getRooms from "../../api/room/getRooms";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

const SelectRoom = ({ userData }) => {
  const [rooms, setRooms] = useState([]);
  const [localSearch, setLocalSearch] = useState([]);

  const ref2 = useRef(false);

  const token = useSelector(useToken)
  const mercure_token = useSelector(useMercureToken)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const fetchData = {
    user_id: userData?.id,
  };

  const ref = useRef(false);

  const subscribeToMercure = () => {
    const url = new URL("http://localhost:9090/.well-known/mercure");
    url.searchParams.append("topic", `select_room_${userData?.id}`);

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
        if (JSON.parse(event.data).code === 200) {
          const newData = JSON.parse(event.data).data;
          setRooms((currentRooms) => {
            // Filtrer pour enlever l'ancien élément avec le même ID
            const filteredRooms = currentRooms.filter(
              (item) => item.id !== newData.id
            );

            // Ajouter le nouvel élément au début du tableau
            return [newData, ...filteredRooms];
          });
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
  const retrieveData = async () =>{
    try {  
    const res = await getRooms(token, fetchData)
      setRooms(res) 
    } catch (error) {
      if(error.code === 401){
        dispatch(logout())
        navigate("/")
      }
    }
  }


  useEffect(() => {
    if (userData !== null) {
      if (!ref.current) {
        retrieveData()
        ref.current = true;
      }
      subscribeToMercure();
    }
  }, []);


  return (
    <>
      <div className="flex justify-between my-3">
        <input
          type="text"
          placeholder="Recherchez un utilisateur / groupe"
          className="input input-bordered w-full max-w-xs bg-neutral_white/90 text-neutral_dark"
        />
        <button className="btn">+</button>
      </div>
      <div className="rooms-custom-height overflow-auto">
        {rooms != undefined ? (
          <ul>
            {rooms.map((room, index) => {
              return <Rooms room={room} key={index} />;
            })}
          </ul>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default SelectRoom;
