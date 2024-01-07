import React, { useEffect, useRef, useState } from "react";

const SelectRoom = ({ userData }) => {
  const [rooms, setRooms] = useState([]);

  const token = localStorage.getItem("token_jwt");

  const fetchData = {
    user_id: userData?.id,
  };

  const ref = useRef(false);
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
              return (
                <li
                  key={index}
                  className="w-full h-[4rem] bg-secondary/50 rounded-md my-2 flex items-center"
                >
                  <div
                    id="image"
                    className="w-[3rem] h-[3rem] bg-primary rounded-full mr-2"
                  ></div>
                  <div className="flex flex-col">
                    <p>{room?.usernames}</p>
                    <p>{room?.last_message_value}</p>
                  </div>
                  <p></p>
                </li>
              );
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
