import Button from "../Components/Button";
import { Link } from "react-router-dom";
import Result from "../Components/Result";
import ProgressBar from "../Components/ProgressBar";
import { useInterviewContext } from "../Context/InterviewContext";

const InterviewQuestions = () => {
  const handleChange = (e) => {
    setCurrentAnswer(e.target.value);
  };

  const {
    handleNextQuestion,
    response,
    questions,
    interviewComplete,
    btndisable,
    generateResult,
    index,
    setCurrentAnswer,
    currentAnswer,
  } = useInterviewContext();

  return (
    <div className="min-h-[calc(100dvh-80px)] py-6 w-full flex items-center justify-center">
      <div className="max-w-[1200px] lg:w-[80%] w-[97%] rounded-xl bg-[#040E1A] min-h-[80%] shadow-md shadow-blue-300 md:px-5 px-3 py-4">
        {Array.isArray(questions) && questions?.length > 0 && (
          <ProgressBar
            currentIndex={index}
            totalQuestions={questions.length}
          ></ProgressBar>
        )}
        {Array.isArray(questions) && questions?.length > 0 && (
          <div className="w-full flex items-center flex-col gap-10">
            <div className="w-full flex md:flex-row md:gap-3 gap-1">
              <p className="text-xl font-medium">{`Q${index + 1}:`}</p>
              <p className="md:text-xl text-lg font-medium">
                {questions[index].question || questions[index]}
              </p>
            </div>
            <div className="w-full flex flex-col md:gap-3 gap-1">
              <label
                htmlFor="answer"
                className="text-xl text-center md:text-left font-semibold"
              >
                Enter Your Answer:
              </label>
              <textarea
                value={currentAnswer}
                onChange={handleChange}
                id="answer"
                rows="7"
                placeholder="Write Answer..."
                className="bg-[#CBD5E1] w-full outline-none md:text-xl text-lg font-semibold text-black px-3 py-1 rounded-lg placeholder-black custom-sidebar"
              ></textarea>
            </div>
            <div className="w-full flex justify-end">
              <Button
                Click={handleNextQuestion}
                disabled={btndisable}
                text={
                  generateResult
                    ? "Generating Result..."
                    : questions.length - 1 === index
                    ? "Submit"
                    : "Next Question"
                }
              />
            </div>
          </div>
        )}
        {interviewComplete && <Result percentage={response} />}
        {!questions?.length && !interviewComplete && (
          <div className="w-full h-full lg:px-20 flex items-center justify-end flex-col gap-8 py-5">
            <p className="lg:text-3xl text-xl font-semibold text-center">
              Interview questions currently unavailable. Please fill the form to
              proceed with the interview.
            </p>
            <Button>
              <Link to="/interview-form">Interview Form</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewQuestions;
