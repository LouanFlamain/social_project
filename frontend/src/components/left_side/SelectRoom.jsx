import React, { useEffect, useRef, useState } from "react";
import Rooms from "./Rooms";
import { fetchEventSource } from "@microsoft/fetch-event-source";

const SelectRoom = ({ userData }) => {
  const [rooms, setRooms] = useState([]);
  const [localSearch, setLocalSearch] = useState([]);

  const ref2 = useRef(false);

  const token = localStorage.getItem("token_jwt");
  const mercure_token = localStorage.getItem("token_mercure");

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
  useEffect(() => {
    if (userData !== null) {
      if (!ref.current) {
        fetch(`${process.env.REACT_APP_API_URL}/api/get_rooms`, {
          method: "POST",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(fetchData),
        })
          .then((response) => response.json())
          .then((results) => {
            setRooms(results.data);
            console.log(results.data);
          });
        ref.current = true;
      }
      subscribeToMercure();
    }
  }, []);
  console.log(rooms);

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
        {rooms != [] ? (
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
