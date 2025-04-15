import { NavLink } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import Button from "../Components/Button";

const Hero = () => {
  const { User } = useAuth();
  return (
    <div className="w-full min-h-[calc(100svh-80px)] flex items-center justify-center lg:flex-row flex-col-reverse gap-10 lg:gap-0 pb-8 lg:pb-0">
      <div className="w-full lg:w-1/2 h-full flex items-center lg:items-start justify-center lg:px-20 px-5 flex-col gap-10">
        <h1 className="lg:text-5xl 2xl:text-6xl lg:font-bold text-center font-semibold text-4xl lg:text-left ">
          Ai-Interviewer and ChatBot.
        </h1>
        <h4 className="lg:text-xl 2xl:text-2xl text-lg font-semibold text-center lg:text-left text-gray-300">
          Boost your confidence and skills with our AI-powered mock interviews!
        </h4>
        <NavLink to={`${User ? "/app" : "/login"}`}>
          <Button text={"Get Started"} />
        </NavLink>
      </div>
      <div className="w-full lg:w-1/2 h-full flex items-center justify-center lg:px-0 mt-10 lg:mt-0 px-5">
        <img
          src="/assets/robot.jpg"
          alt="hero"
          className="rounded-xl shadow-lg shadow-blue-400"
        />
      </div>
    </div>
  );
};

export default Hero;
