import { IoIosPeople } from "react-icons/io";

const ChatHeader = ({ roomData, rightPopupState, setRightPopupState }) => {
  const handleOpen = () => {
    if (rightPopupState) {
      setRightPopupState(false);
    } else {
      setRightPopupState(true);
    }
  };
  return (
    <div className="w-full h-16 flex items-center p-3 justify-between">
      <div className="flex items-center">
        <div
          id="image"
          className="w-[3rem] h-[3rem] bg-primary rounded-full mr-2"
        ></div>
        <p className="text-neutral_white font-semibold">
          {roomData?.room_name}
        </p>
      </div>
      <div className="flex items-center">
        <button
          onClick={handleOpen}
          className="w-[48px] h-[48px] flex items-center justify-center hover:text-neutral_white ease-in duration-100"
        >
          {rightPopupState ? (
            <IoIosPeople className="scale-[2.0] text-primary" />
          ) : (
            <IoIosPeople className="scale-[2.0]" />
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
