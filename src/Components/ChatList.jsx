import React, { useEffect, useRef } from "react";
import { useChatBotContext } from "../Context/ChatBotContext";
import ResponseLoading from "./ResponseLoading";

const ChatList = ({ userName }) => {
  const { Chat, FetchingData } = useChatBotContext();
  const chatRef = useRef(null);
  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [Chat]);
  return (
    <>
      {Chat.map((msg, index) => (
        <React.Fragment key={index}>
          <div className="lg:w-[80%] w-[97%] flex-col lg:flex-row flex gap-3 bg-[#040E1A] px-4 py-4 rounded-xl shadow-md shadow-gray-600 break-all">
            <div className="h-8 w-8 rounded-full bg-blue-800 flex-shrink-0 flex items-center justify-center text-base font-medium">
              {userName?.split("")[0]?.toString().toUpperCase()}
            </div>
            <p className="font-normal lg:text-[18px] text-[17px] tracking-wide">
              {msg.Prompt}
            </p>
          </div>
          {msg.Response && (
            <div className="lg:w-[80%] w-[97%] flex-col lg:flex-row flex gap-3 bg-[#040E1A] px-4 py-4 rounded-xl shadow-md shadow-gray-600 break-all">
              <div className="h-8 w-8 rounded-full bg-blue-800 flex-shrink-0 flex items-center justify-center text-base font-medium object-cover">
                <img src="/assets/responseDp.png" alt="" />
              </div>
              <p className="font-normal lg:text-[18px] text-[17px] tracking-wide">
                {msg.Response || "No Response From Api Please try later."}
              </p>
            </div>
          )}
        </React.Fragment>
      ))}
      {FetchingData && <ResponseLoading />}
      <div ref={chatRef}></div>
    </>
  );
};

export default ChatList;
