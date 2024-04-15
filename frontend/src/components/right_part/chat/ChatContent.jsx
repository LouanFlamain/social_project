import EndBubble from "./bubble/EndBubble";
import StartBubble from "./bubble/StartBubble";
import React, { useEffect, useRef } from "react";

const ChatContent = ({ users, rightPopupState, messages, personnalId }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  };

  useEffect(() => {
    console.log("message ", messages);
    scrollToBottom();
  }, [messages]);
  return (
    <div className="w-full bg-slate-100 chat-content-height relative overflow-hidden">
      <ul className="overflow-scroll w-full h-full px-2">
        <div className="text-center cursor-pointer hover:text-neutral_dark ease-linear duration-150">
          load more
        </div>
        {messages?.map((message, index) => {
          if (message?.user_id == personnalId) {
            return <EndBubble key={index} message={message} />;
          } else {
            return <StartBubble key={index} message={message} />;
          }
        })}
        <div ref={messagesEndRef} />
      </ul>
      {rightPopupState ? (
        <div className="right-float-popup bg-neutral_dark w-20 right-float-popup-open ease-in duration-300 rounded-full flex flex-col items-center py-3">
          {" "}
          {users.map((user, index) => {
            return (
              <div
                key={index}
                id="image"
                className="w-[3rem] h-[3rem] bg-primary rounded-full mb-2"
              ></div>
            );
          })}
        </div>
      ) : (
        <div className="right-float-popup bg-neutral_dark w-20 right-float-popup-close ease-in duration-300 flex flex-col items-center py-3">
          {users.map((user, index) => {
            return (
              <div
                key={index}
                id="image"
                className="w-[3rem] h-[3rem] bg-primary rounded-full mb-2"
              ></div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default ChatContent;
