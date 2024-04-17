import { useState } from "react";
import createRoom from "../../../../api/room/createRoom";
import firstMessage from "../../../../api/room/firstMessage";
import { useDispatch, useSelector } from "react-redux";
import { changeMobile } from "../../../../redux/mobileSlice";

const Section = ({ list, setList, userInfo }) => {
  const [unvalid, setUnvalid] = useState(false);
  const dispatch = useDispatch();
  const removeToList = (id) => {
    setList((current) => {
      const filteredList = current.filter((item) => item.user_id !== id);
      return filteredList;
    });
  };

  const handleCreateRoom = () => {
    let idList = [userInfo.id];
    list.map((element) => idList.push(element.user_id));
    const data = {
      users: idList,
      message_value: "hello world",
    };
    createRoom(data).then((response) => {
      if (!response) {
        setUnvalid(true);
        console.log("conversation déjà existante");
      } else {
        const data = {
          user_id: userInfo.id,
          room_id: response,
          message_value: "Chat crée",
        };
        firstMessage(data);
        dispatch(changeMobile(false));
      }
    });
  };
  return (
    <div className="w-full md:w-1/2 bg-secondary h-full p-4">
      <h3
        onClick={() => console.log(list)}
        className="text-center text-neutral_dark text-xl h-[2rem]"
      >
        Liste des personnes
      </h3>
      <ul className="custom-height-list overflow-scroll">
        {list.map((data, index) => {
          return (
            <li
              key={index}
              className="bg bg-neutral_dark bg-neutral_dark w-full h-[4rem] rounded-xl flex items-center justify-between px-4 mb-2"
            >
              <div className="flex items-center">
                <div className="avatar mr-2">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    />
                  </div>
                </div>
                <p className="text-neutral_white">{data?.username}</p>
              </div>
              <button
                onClick={() => removeToList(data?.user_id)}
                className="btn text-neutral_white  bg-neutral_dark hover:bg-neutral_white border-neutral_white drop-shadow-sm hover:text-neutral_dark"
              >
                remove
              </button>
            </li>
          );
        })}
      </ul>
      {list.length > 0 ? (
        <div className="h-[3rem] flex justify-center">
          <button onClick={handleCreateRoom} className="btn">
            Valider
          </button>
        </div>
      ) : (
        <div className="h-[3rem] flex justify-center"></div>
      )}
    </div>
  );
};
export default Section;
