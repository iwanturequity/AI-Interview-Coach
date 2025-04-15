import {
  SendRounded,
  BorderColorOutlined,
  StopCircleRounded,
  KeyboardVoiceRounded,
} from "@mui/icons-material";
import { useChatBotContext } from "../Context/ChatBotContext";

const ChatForm = () => {
  const {
    handleSend,
    currentMsg,
    handleInput,
    startNewChat,
    sendIcon,
    isChat,
    handleStop,
    showPauseIcon,
    setVoiceChat,
  } = useChatBotContext();

  return (
    <div className="w-full h-[90px] flex items-center justify-between flex-col gap-2 absolute bottom-0 px-2">
      <form
        onSubmit={handleSend}
        className="w-full h-full flex items-center justify-center"
      >
        <div className="flex items-center justify-center lg:w-[80%] w-full gap-2 lg:gap-1">
          <KeyboardVoiceRounded
            onClick={() => setVoiceChat(true)}
            sx={{
              fontSize: { xs: 30, lg: 40 },
              cursor: "pointer",
              transition: "transform 0.2s ease-in-out",
              "&:hover": { transform: "scale(1.09)" },
            }}
          />
          <input
            value={currentMsg}
            type="text"
            className={`w-full rounded-3xl lg:text-lg lg:h-[54px] h-[48px] lg:font-semibold text-white placeholder-gray-200 outline-none px-5 bg-[#040E1A] shadow-md shadow-gray-600 border-[1px] border-gray-100  ${
              showPauseIcon && "cursor-not-allowed"
            }`}
            placeholder="Enter your Prompt here."
            onChange={handleInput}
          />
          {showPauseIcon && (
            <StopCircleRounded
              onClick={handleStop}
              sx={{
                fontSize: { xs: 30, lg: 40 },
                cursor: "pointer",
                transition: "transform 0.2s ease-in-out",
                "&:hover": { transform: "scale(1.09)" },
              }}
            />
          )}
          {isChat && (
            <BorderColorOutlined
              onClick={startNewChat}
              sx={{
                fontSize: { xs: 30, lg: 40 },
                cursor: "pointer",
                transition: "transform 0.2s ease-in-out",
                "&:hover": { transform: "scale(1.09)" },
              }}
            />
          )}
          <button type="submit" disabled={showPauseIcon}>
            <SendRounded
              disabled={showPauseIcon}
              sx={{
                fontSize: { xs: 30, lg: 35 },
                display: sendIcon ? "block" : "none",
                cursor: showPauseIcon ? "not-allowed" : "pointer",
                opacity: showPauseIcon ? 0.3 : 1,
                transition: "transform 0.2s ease-in-out",
                "&:hover": { transform: "scale(1.09)" },
              }}
            ></SendRounded>
          </button>
        </div>
      </form>
      <p className="lg:font-semibold lg:text-base text-sm">
        Developed by Rajiv Kumar.
      </p>
    </div>
  );
};

export default ChatForm;
