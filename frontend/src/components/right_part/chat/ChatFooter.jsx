import { useState } from "react";
import { BsFillSendFill } from "react-icons/bs";
import { GoFileMedia } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { selectUser , useToken} from "../../../redux/userSlice";
import { selectRoom } from "../../../redux/roomSlice";
import createMessage from "../../../api/message/createMessage";

const ChatFooter = () => {
  const userSelector = useSelector(selectUser);
  const roomSelector = useSelector(selectRoom);
  const [messageValue, setMessageValue] = useState("");
  const token =  useSelector(useToken)

  let data = {
    user_id: userSelector?.id,
    room_id: roomSelector?.id,
    message_value: messageValue,
  };

  const handleChange = (event) => {
    setMessageValue(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    createMessage(data, token).then((result) => {
      if (result) {
        setMessageValue("");
      }
    });    
  };
  return (
    <div className="bg-primary w-full flex items-center p-3 rounded-md h-16">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex items-center w-full"
      >
        <button className="btn">
          <GoFileMedia />
        </button>
        <input
          onChange={(e) => handleChange(e)}
          type="text"
          value={messageValue}
          placeholder="Type here"
          className="input input-bordered input-md w-full max-w-3xl"
        />
        <button type="submit" className="btn">
          <BsFillSendFill />
        </button>
      </form>
    </div>
  );
};
export default ChatFooter;
