import calculateHour from "../../../../functions/calculateHour";

const StartBubble = ({ message }) => {
  const hour = calculateHour(message?.createdAt?.date);
  return (
    <li className="chat chat-start">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
          />
        </div>
      </div>
      <div className="chat-header flex items-center">
        <p className="mr-1">{message?.username}</p>
        <time className="text-xs opacity-50">{hour}</time>
      </div>
      <div className="chat-bubble">{message?.value}</div>
    </li>
  );
};

export default StartBubble;
