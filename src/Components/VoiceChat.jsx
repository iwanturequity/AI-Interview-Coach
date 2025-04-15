import { CancelOutlined, KeyboardVoiceRounded } from "@mui/icons-material";
import Button from "./Button";
import { useChatBotContext } from "../Context/ChatBotContext";

const VoiceChat = () => {
  const {
    handleVoiceChat,
    isConversation,
    handleCancel,
    AskQuestion,
    disable,
    setVoiceChat,
  } = useChatBotContext();
  return (
    <div className="h-[calc(100svh-80px)] py-1 w-full flex items-center justify-center">
      <div className="max-w-[500px] w-[97%] rounded-xl bg-[#040E1A] h-[90%] shadow-md shadow-blue-300 md:px-5 px-3 py-4 ">
        <div className="w-full h-full flex items-center justify-around flex-col relative">
          <CancelOutlined
            className="absolute top-0 right-0"
            sx={{
              fontSize: { xs: 30, lg: 35 },
              cursor: "pointer",
              transition: "transform 0.2s ease-in-out",
              "&:hover": { transform: "scale(1.09)" },
            }}
            onClick={() => setVoiceChat(false)}
          />
          <img
            src="/assets/Voice1.webp"
            alt="voice"
            className="size-60 object-contain xl:size-80"
          />
          <div className="flex items-center justify-center">
            <Button
              disable={disable}
              Click={isConversation ? handleCancel : handleVoiceChat}
              icon={<KeyboardVoiceRounded />}
              text={
                isConversation
                  ? "Stop Speaking"
                  : AskQuestion
                  ? "Listening"
                  : "Speak Your Question"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceChat;
