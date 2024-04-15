import { useDispatch } from "react-redux";
import { changeRoom } from "../../redux/roomSlice";

const Rooms = ({ room }) => {
  const dispatch = useDispatch();

  const roomHandleClick = ($id) => {};
  return (
    <li
      onClick={() => roomHandleClick(dispatch(changeRoom(room)))}
      className="w-full h-[4rem] bg-secondary/50 rounded-md my-2 flex items-center justify-between px-3 cursor-pointer hover:bg-secondary/90 transition duration-100 ease-in-out"
    >
      <div className="flex items-center">
        <div
          id="image"
          className="w-[3rem] h-[3rem] bg-primary rounded-full mr-2"
        ></div>
        <div className="flex flex-col">
          <p className="text-neutral_dark font-medium ">{room?.room_name}</p>
          <p className="text-neutral_dark italic">{room?.last_message_value}</p>
        </div>
      </div>
      <p>{room?.time.last_message_date}</p>
    </li>
  );
};
export default Rooms;
