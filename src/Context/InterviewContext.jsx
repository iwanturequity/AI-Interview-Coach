import { createContext, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { GeminiApiCall } from "../utilities/Gemini";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../utilities/firebase";

const interviewContext = createContext({
  industriesAndJobs: [],
  handleIndustryChange: () => {},
  jobTitles: [],
  onSubmit: () => {},
  register: () => {},
  handleSubmit: () => {},
  GenerateQuestions: false,
  setValue: [],
  value: [],
  questions: [],
  handleNextQuestion: () => {},
  btndisable: false,
  interviewComplete: false,
  response: null,
  generateResult: false,
  index: 0,
  setCurrentAnswer: "",
  currentAnswer: "",
});

const InterviewContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const industriesAndJobs = [
    {
      industry: " Software Development",
      jobs: [
        " Software Engineering",
        "Application Development",
        "Systems Integration",
        "Quality Assurance and Testing",
      ],
    },
    {
      industry: " Web and Mobile App Development",
      jobs: [
        "Mernstack ",
        "Frontend Developer",
        "Backend Developer",
        "Fullstack Developer",
        "Mobile App Developer (iOS/Android)",
        "React Developer",
        "Angular Developer",
        "UI/UX Designer",
        "Flutter Developer",
      ],
    },
    {
      industry: " Data Science and Analytics",
      jobs: [
        "Data Scientist",
        "Data Analyst",
        "Data Engineer",
        "Business Intelligence Analyst",
        "Machine Learning Engineer",
        "Data Visualization Specialist",
      ],
    },
    {
      industry: "Artificial Intelligence",
      jobs: [
        "AI Research Scientist",
        "Machine Learning Engineer",
        "Deep Learning Specialist",
        "AI Software Engineer",
        "Computer Vision Engineer",
        "NLP Engineer",
      ],
    },
    {
      industry: "Cybersecurity",
      jobs: [
        "Cybersecurity Analyst",
        "Security Engineer",
        "Penetration Tester",
        "Ethical Hacker",
        "Security Operations Center (SOC) Analyst",
        "Network Security Engineer",
      ],
    },
    {
      industry: "Education Technology (EdTech)",
      jobs: [
        " E-Learning Developer",
        "Curriculum Designer (Tech-based)",
        "Educational Data Analyst",
        "Instructional Designer",
      ],
    },
    {
      industry: " Cloud Computing and DevOps",
      jobs: [
        " Cloud Engineering (AWS, Azure, GCP)",
        "DevOps Engineer (CI/CD, Kubernetes)",
        "Site Reliability Engineering (SRE)",
        "Cloud Solutions Architect",
      ],
    },
    {
      industry: "E-commerce & Fintech",
      jobs: [
        "E-commerce Manager",
        "Product Manager (Fintech)",
        "Blockchain Developer",
        "Fintech Analyst",
        "Payment Gateway Specialist",
        "Digital Marketing Manager",
      ],
    },
    {
      industry: "Telecommunications & Networking",
      jobs: [
        "Network Engineer",
        "Telecommunications Technician",
        "Wireless Communications Specialist",
        "IoT Engineer",
        "Network Administrator",
      ],
    },
    {
      industry: "Robotics & Automation",
      jobs: [
        "Robotics Engineer",
        "Automation Engineer",
        "Mechatronics Engineer",
        "Control Systems Engineer",
        "Industrial Automation Specialist",
      ],
    },
    {
      industry: "Gaming & Entertainment",
      jobs: [
        "Game Developer",
        "Game Designer",
        "3D Animator",
        "VR/AR Developer",
        "Multimedia Designer",
        "Sound Designer",
      ],
    },
    {
      industry: "Internet of Things and Smart Technology",
      jobs: [
        "IoT Engineer",
        "Embedded Systems Engineer",
        "IoT Security Specialist",
        "IoT Data Analyst",
      ],
    },
    {
      industry: "Health Tech",
      jobs: [
        "Health Informatics Specialist",
        "Biomedical Engineer",
        "Clinical Systems Analyst",
        "Health Data Analyst",
        "Telemedicine Specialist",
      ],
    },
  ];
  const location = useLocation();
  const [Answers, setAnswers] = useState([]);
  const [index, setIndex] = useState(0);
  const [response, setResponse] = useState(null);
  const [interviewComplete, setInterviewComplete] = useState(false);
  const [generateResult, setGenerateResult] = useState(false);
  const { register, handleSubmit } = useForm();
  const [jobTitles, setJobTitles] = useState([]);
  const [GenerateQuestions, setGenerateQuestions] = useState(false);
  const [value, setValue] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [btndisable, setBtnDisable] = useState(false);
  const [questions, setQuestions] = useState(location?.state?.questions || []);
  const [jobTitle, setJobTitle] = useState(location?.state?.jobTitle || null);
  const [userdetail, setUserDetail] = useState(
    location?.state?.userDetails || null
  );
  const { setError, User } = useAuth();

  useEffect(() => {
    if (response) {
      addDoc(collection(db, "Interview"), {
        Result: response,
        timestamp: serverTimestamp(),
        UserId: User.uid,
        jobTitle,
      })
        .then(() => {
          setQuestions([]);
          setGenerateResult(false);
          setBtnDisable(false);
          setJobTitle(null);
          setInterviewComplete(true);
          setUserDetail(null);
        })
        .catch((error) => {
          setBtnDisable(false);
          setGenerateResult(false);
          setError(error.code || error.message);
        });
    }
  }, [response]);

  const onSubmit = async (formData) => {
    const { selectedIndustry, Description, Experience, JobTitle } = formData;
    if (
      selectedIndustry === "" ||
      Description === "" ||
      Experience === "" ||
      JobTitle === "" ||
      value.length <= 0
    ) {
      setError("Please Fill all Fields");
      return;
    }
    if (Description.length > 300) {
      setError("Your Description exceeds 300 characters. Please shorten it");
      return;
    }

    setBtnDisable(true);
    const prompt = `Generate a JSON array of realistic, professional interview questions based on the following job details. Focus on questions that assess the candidate’s skills, experience, and fit for the role in a real-world interview setting. Make questions natural and relevant. Job Details:Industry: ${selectedIndustry},  Job Title: ${JobTitle} , Job Description: ${Description} , Required Skills: ${value.join(
      " , "
    )} , Experience Level: ${Experience} Output only the questions as a JSON array, with no additional text or symbols.`;
    setGenerateQuestions(true);
    const userDetails = `I am a ${JobTitle} my sills is ${value.join(
      ","
    )} and my experience is ${Experience}.`;

    try {
      const result = await GeminiApiCall(prompt);
      const cleanResponse = result
        .replace(/```json/, "")
        .replace(/```/, "")
        .trim();
      const parse = JSON.parse(cleanResponse);
      setGenerateQuestions(false);
      setBtnDisable(false);
      navigate("/interview", {
        replace: true,
        state: {
          questions: parse,
          jobTitle: JobTitle,
          userDetails: userDetails,
        },
      });
    } catch (error) {
      setError(error.code || error.message);
      setBtnDisable(false);
      setGenerateQuestions(false);
    }
  };

  const handleIndustryChange = (e) => {
    const selectedIndustry = e.target.value;
    const findJobs = industriesAndJobs.find(
      (obj) => obj.industry === selectedIndustry
    );
    if (findJobs) {
      setJobTitles(findJobs.jobs);
    } else {
      setJobTitles([]);
    }
  };

  const handleNextQuestion = async () => {
    if (index < questions.length - 1) {
      if (currentAnswer.trim() === "") {
        setError("Please write answer in text Area:");
        return;
      }
      if (currentAnswer.trim().length > 600) {
        setError("Your Answer exceeds 600 characters. Please shorten it");
        return;
      }
      setAnswers((prev) => [...prev, currentAnswer]);
      setIndex(index + 1);
      setCurrentAnswer("");
    } else if (index === questions.length - 1) {
      if (currentAnswer.trim() === "") {
        setError("Please write answer in text Area:");
        return;
      }
      if (currentAnswer.trim().length > 600) {
        setError("Your Answer exceeds 600 characters. Please shorten it");
        return;
      }
      setAnswers((prev) => [...prev, currentAnswer]);
      setBtnDisable(true);
      setGenerateResult(true);
      const AllQuestions = questions.map((item) => ({
        text: item.question || item,
      }));

      const allAnswers = [...Answers, currentAnswer];
      const AnswersStructure = allAnswers.map(
        (item, index) => `AnsNo:${index + 1}: ${item}`
      );

      const prompt = `Please evaluate the following answers based on the questions provided in the previous history. Rate each answer out of 5, then calculate the total percentage. Ensure that the answers align with the context and are concise and clear. provide only the total percentage , without any extra text." ${AnswersStructure.join(
        "\n"
      )}`;
      try {
        const ApiResponse = await GeminiApiCall(prompt, [
          {
            role: "user",
            parts: [{ text: userdetail }, ...AllQuestions],
          },
        ]);
        if (ApiResponse.trim().endsWith("%")) {
          setResponse(ApiResponse.slice(0, -2));
        } else if (ApiResponse.trim().length > 4) {
          setResponse(0);
        } else {
          setResponse(ApiResponse);
        }
      } catch (error) {
        setError(error.code || error.message);
        setGenerateResult(false);
        setBtnDisable(false);
      }
    }
  };

  return (
    <interviewContext.Provider
      value={{
        industriesAndJobs,
        handleIndustryChange,
        jobTitles,
        onSubmit,
        register,
        handleSubmit,
        btndisable,
        GenerateQuestions,
        setValue,
        value,
        questions,
        handleNextQuestion,
        interviewComplete,
        response,
        generateResult,
        index,
        setCurrentAnswer,
        currentAnswer,
      }}
    >
      {children}
    </interviewContext.Provider>
  );
};

const useInterviewContext = () => {
  return useContext(interviewContext);
};

export { InterviewContextProvider, useInterviewContext };
