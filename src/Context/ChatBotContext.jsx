import { createContext, useContext, useEffect, useState, useRef } from "react";
import { db } from "../utilities/firebase";
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  arrayUnion,
  Timestamp,
  query,
  where,
  getDocs,
  getDoc,
  orderBy,
} from "firebase/firestore";
import { useAuth } from "./AuthContext";
import { GeminiApiCall } from "../utilities/Gemini";
import { VoiceChat } from "@mui/icons-material";

const ChatBotContext = createContext({
  handleInput: () => {},
  sendIcon: false,
  handleSend: () => {},
  currentMsg: "",
  isChat: false,
  FetchingData: false,
  Chat: [],
  setChat: () => {},
  startNewChat: () => {},
  getDataToFirebase: () => {},
  handleStop: () => {},
  history: "",
  run: () => {},
  userName: "",
  fetchUserName: true,
  fetchChatSessions: () => {},
  fetchChatSession: () => {},
  setIsChat: () => {},
  fetchedHistory: true,
  showPauseIcon: false,
  setSelectedResult: () => {},
  selectedResult: null,
  handleVoiceChat: () => {},
  isConversation: false,
  handleCancel: () => {},
  AskQuestion: false,
  disable: false,
  voiceChat: false,
  setVoiceChat: () => {},
});

export const ChatBotContextProvider = ({ children }) => {
  const [sendIcon, setSendIcon] = useState(false);
  const [currentMsg, setCurrentMsg] = useState("");
  const [isChat, setIsChat] = useState(false);
  const [FetchingData, setFetchingData] = useState(false);
  const [Chat, setChat] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [userName, setUserName] = useState("");
  const [fetchUserName, fetchingUserName] = useState(true);
  const [history, setHistory] = useState("");
  const [fetchedHistory, fetchHistory] = useState(true);
  const [showPauseIcon, setShowPauseIcon] = useState(false);
  const [stopResponse, setStopResponse] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);
  const [voiceChat, setVoiceChat] = useState(false);
  const [isConversation, setIsConversation] = useState(false);
  const [AskQuestion, setAskQuestion] = useState(false);
  const [disable, setDisable] = useState(false);
  const { User, setError } = useAuth();

  const stopResponseRef = useRef(stopResponse);

  useEffect(() => {
    stopResponseRef.current = stopResponse;
  }, [stopResponse]);

  useEffect(() => {
    getUserName();
  }, []);

  const handleStop = () => {
    setFetchingData(false);
    setStopResponse(true);
    setShowPauseIcon(false);
  };

  const handleInput = (e) => {
    const val = e.target.value;
    setCurrentMsg(val);
    setSendIcon(val.trim() !== "");
  };

  const startNewChat = async () => {
    fetchChatSessions();
    setChat([]);
    setIsChat(false);
    setCurrentChatId(null);
    setCurrentMsg("");
    setFetchingData(false);
    setShowPauseIcon(false);
    setStopResponse(true);
    if (selectedResult) {
      setSelectedResult(null);
    }
  };

  const handleSend = async (e) => {
    if (!showPauseIcon) {
      if (selectedResult) {
        setSelectedResult(null);
      }
      e.preventDefault();
      if (currentMsg?.trim() !== "") {
        setStopResponse(false);
        setShowPauseIcon(true);
        setCurrentMsg("");
        setSendIcon(false);
        setIsChat(true);

        setChat((prevChat) => [
          ...prevChat,
          { Prompt: currentMsg, Response: "" },
        ]);

        await run(currentMsg);
      }
    }
  };

  const saveUserChat = async ({ Prompt, Response }) => {
    try {
      if (!currentChatId) {
        const chatDocRef = await addDoc(collection(db, "Chats"), {
          userId: User.uid,
          messages: arrayUnion({
            Prompt,
            Response,
          }),
          timestamp: Timestamp.now(),
        });
        setCurrentChatId(chatDocRef.id);
      } else if (currentChatId) {
        const chatDocRef = doc(db, "Chats", currentChatId);
        await updateDoc(chatDocRef, {
          messages: arrayUnion({
            Prompt,
            Response,
          }),
          timestamp: Timestamp.now(),
        });
      }
    } catch (error) {
      setError(error.code || error.message);
    }
  };

  const getUserName = async () => {
    try {
      const docRef = doc(db, "users", User.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        fetchingUserName(false);
        setUserName(docSnap.data().name);
      }
    } catch (error) {
      setError(error.code || error.message);
    }
  };

  const fetchChatSessions = async () => {
    fetchHistory(true);
    try {
      const q = query(
        collection(db, "Chats"),
        where("userId", "==", User.uid),
        orderBy("timestamp", "desc")
      );
      const querySnapshot = await getDocs(q);

      const sessions = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setHistory(sessions);
    } catch (error) {
      setError(error.code || error.message);
    } finally {
      fetchHistory(false);
    }
  };

  const fetchChatSession = async (sessionId) => {
    if (selectedResult) {
      setSelectedResult(null);
    }
    try {
      const chatDocRef = doc(db, "Chats", sessionId);
      const chatDoc = await getDoc(chatDocRef);
      if (chatDoc.exists()) {
        setChat(chatDoc.data().messages);
        setCurrentChatId(chatDoc.id);
      }
    } catch (error) {
      setError(error.code || error.message);
    }
  };

  const typeResponse = (
    fullText = "No Response from Api please try later:"
  ) => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (stopResponseRef.current) {
        clearInterval(typingInterval);
        return;
      }
      setChat((prevChat) => {
        const updatedChat = [...prevChat];
        const lastMessage = updatedChat[updatedChat.length - 1];
        if (index < fullText?.length) {
          lastMessage.Response += fullText[index];
          index += 1;
        } else {
          clearInterval(typingInterval);
          setShowPauseIcon(false);
        }
        return updatedChat;
      });
    }, 25);
  };

  const findChats = () => {
    return Chat.map((obj) => ({ text: obj.Prompt }));
  };

  const run = async (UserInput) => {
    setFetchingData(true);
    let responseText;
    try {
      const ChatHistory = findChats();
      if (ChatHistory.length < 1) {
        responseText = await GeminiApiCall(UserInput);
      } else if (ChatHistory.length >= 1) {
        responseText = await GeminiApiCall(UserInput, [
          { role: "user", parts: ChatHistory },
        ]);
      }
      await saveUserChat({
        Prompt: UserInput,
        Response: responseText,
      });
      typeResponse(responseText);
    } catch (error) {
      setError(error.code || error.message);
      typeResponse("No response from API Please Try later");
    } finally {
      setFetchingData(false);
    }
  };
  const speakText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "hi-GB";
    utterance.pitch = 1;
    utterance.rate = 1;
    utterance.volume = 1;
    window.speechSynthesis.speak(utterance);
    utterance.onend = () => {
      setIsConversation(false);
    };
  };

  const startSpeechRecognition = () => {
    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.start();
    let spokenText = "";
    recognition.onresult = async (event) => {
      spokenText = event.results[0][0].transcript;
      if (spokenText.trim() === "") {
        setIsConversation(false);
        setDisable(false);
        return;
      }
      try {
        const result = await GeminiApiCall(spokenText);
        let customResult =
          result.split("**").length > 1
            ? result.split("**")
            : result.split("*");
        speakText(customResult.join(""));
        setDisable(false);
      } catch (error) {
        setError(error.code || error.message);
        speakText(
          "An error Occured Please Try Later" + error.code || error.message
        );
      }
    };

    recognition.onerror = (event) => {
      setError(event.error);
      if (event.error === "no-speech") {
        setError("User didn't speak anything.");
      }
    };

    recognition.onend = () => {
      if (spokenText.trim() === "") {
        setIsConversation(false);
        setDisable(false);
        setAskQuestion(false);
      } else {
        setIsConversation(true);
        setAskQuestion(false);
      }
    };
  };

  const handleVoiceChat = () => {
    setAskQuestion(true);
    startSpeechRecognition();
    setDisable(true);
  };

  const handleCancel = () => {
    window.speechSynthesis.cancel();
    setIsConversation(false);
  };

  return (
    <ChatBotContext.Provider
      value={{
        disable,
        AskQuestion,
        selectedResult,
        handleStop,
        history,
        handleInput,
        sendIcon,
        handleSend,
        currentMsg,
        isChat,
        run,
        FetchingData,
        Chat,
        setChat,
        startNewChat,
        userName,
        fetchUserName,
        fetchChatSessions,
        fetchChatSession,
        setIsChat,
        fetchedHistory,
        showPauseIcon,
        setSelectedResult,
        handleVoiceChat,
        isConversation,
        handleCancel,
        setVoiceChat,
        voiceChat,
      }}
    >
      {children}
    </ChatBotContext.Provider>
  );
};

export const useChatBotContext = () => {
  return useContext(ChatBotContext);
};
