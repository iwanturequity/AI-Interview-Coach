import { ManageHistoryOutlined, CancelOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useChatBotContext } from "../Context/ChatBotContext";
import Loader from "./Loader";
import { useAuth } from "../Context/AuthContext";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../utilities/firebase";

const Sidebar = ({ sidebarOpen, setSidebarOpen, handleSidebarToggle }) => {
  const {
    history,
    fetchChatSessions,
    fetchChatSession,
    setIsChat,
    fetchedHistory,
    setSelectedResult,
  } = useChatBotContext();
  const { User, setError } = useAuth();

  const [Interviews, setInterviews] = useState([]);

  const handleHistory = (id) => {
    fetchChatSession(id);
    setIsChat(true);
    setSidebarOpen(!sidebarOpen);
  };

  const handleInterviewHistory = (id, result) => {
    setSidebarOpen(!sidebarOpen);
    setIsChat(true);
    setSelectedResult(result);
  };

  const fetchInterview = async () => {
    try {
      const q = query(
        collection(db, "Interview"),
        where("UserId", "==", User.uid),
        orderBy("timestamp", "desc")
      );
      const querySnapshot = await getDocs(q);
      const interviewsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setInterviews(interviewsData);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    if (User?.uid) {
      fetchChatSessions();
      fetchInterview();
    }
  }, [User]);

  return (
    <>
      <ManageHistoryOutlined
        sx={{
          fontSize: { xs: 30, lg: 35 },
          cursor: "pointer",
          transition: "transform 0.2s ease-in-out",
          "&:hover": { transform: "scale(1.1)" },
        }}
        className="absolute top-6 left-5 z-[1060] "
        onClick={handleSidebarToggle}
      />
      <div
        className={`h-screen w-full shadow-2xl shadow-black lg:w-[400px] bg-[#081229]  rounded-lg absolute z-[1061] py-3 transition-all duration-300 ease-in-out top-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Chat History Section */}
        <div className="w-full h-[50%] flex flex-col pl-5">
          <div className="w-full flex justify-between items-center">
            <h1 className="lg:text-2xl text-xl font-bold text-slate-100">
              Chat History
            </h1>
            <CancelOutlined
              sx={{
                fontSize: { xs: 30, lg: 35 },
                cursor: "pointer",
                transition: "transform 0.2s ease-in-out",
                "&:hover": { transform: "scale(1.09)" },
              }}
              onClick={handleSidebarToggle}
            />
          </div>
          <div className="w-full h-full overflow-y-auto my-4 custom-sidebar">
            {history.length > 0 ? (
              history.map((session) => (
                <div
                  className="w-full hover:cursor-pointer hover:bg-[#18274a]  mb-3 rounded-lg py-1 px-2  flex items-center justify-between"
                  key={session.id}
                  onClick={() => handleHistory(session.id)}
                >
                  <p className="lg:text-xl font-medium">
                    {session.messages[0]?.Prompt.slice(0, 15)}...
                  </p>
                  <p>
                    {new Date(
                      session.timestamp.seconds * 1000
                    ).toLocaleDateString()}
                  </p>
                </div>
              ))
            ) : (
              <div className="h-full w-full flex items-center justify-center text-xl font-semibold flex-col gap-7">
                {fetchedHistory ? <Loader /> : "No History Available Yet."}
              </div>
            )}
          </div>
        </div>

        {/* Interview History Section */}
        <div className="w-full h-[50%] flex flex-col pl-5">
          <h1 className="lg:text-2xl text-xl font-bold text-slate-100">
            Interview History
          </h1>
          <div className="w-full h-full overflow-y-auto my-4 custom-sidebar">
            {Interviews.length > 0 ? (
              Interviews.map((doc) => (
                <div
                  key={doc.id}
                  className="w-full hover:cursor-pointer hover:bg-[#18274a] mb-3 rounded-lg py-1 px-2 flex items-center justify-between"
                  onClick={() => handleInterviewHistory(doc.id, doc.Result)}
                >
                  <p className=" md:text-lg  xl:text-xl font-medium">
                    {doc.jobTitle || "No JobTitle available"}
                  </p>
                  <p>
                    {doc.timestamp
                      ? new Date(
                          doc.timestamp.seconds * 1000
                        ).toLocaleDateString()
                      : "No Date Available"}
                  </p>
                </div>
              ))
            ) : (
              <div className="h-full w-full flex items-center justify-center text-xl font-semibold flex-col gap-7">
                {fetchedHistory ? <Loader /> : "No History Available Yet."}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
