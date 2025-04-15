import TagInput from "../Components/TagInput";
import { useInterviewContext } from "../Context/InterviewContext";

const InterviewForm = () => {
  const {
    industriesAndJobs,
    handleIndustryChange,
    jobTitles,
    handleSubmit,
    onSubmit,
    register,
    GenerateQuestions,
    btndisable,
  } = useInterviewContext();

  return (
    <div className="min-h-[100dvh] w-full flex items-center justify-center px-2">
      <div className="w-full max-w-[900px] lg:w-[50%]  my-7 bg-[#040E1A] rounded-xl shadow-lg shadow-blue-300 flex items-center py-6">
        <div className="flex flex-col h-full w-full gap-7 px-1">
          <h1 className="text-center text-3xl font-bold">
            Tell Us About Your Job Focus
          </h1>
          <div className="w-full grid grid-cols-1 gap-6 lg:px-10 px-3">
            <div className="flex flex-col gap-1 text-black">
              <label
                htmlFor="industries"
                className="text-lg font-semibold text-gray-100"
              >
                Select Industry:
              </label>
              <select
                id="industries"
                className="bg-slate-300 outline-none text-base font-semibold py-3 rounded-lg px-3"
                {...register("selectIndustry")}
                onChange={handleIndustryChange}
              >
                <option className="text-base font-semibold " value="">
                  Choose Industry...
                </option>

                {industriesAndJobs.map((obj, index) => {
                  return (
                    <option
                      key={index}
                      className="text-base font-semibold "
                      value={obj.industry}
                    >
                      {obj.industry}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="flex flex-col gap-1 text-black">
              <label
                htmlFor="Job-Title"
                className="text-lg font-semibold text-gray-100"
              >
                Job Title:
              </label>
              <select
                id="Job-Title"
                className="bg-slate-300 outline-none text-base font-semibold py-3 rounded-lg px-3"
                {...register("JobTitle")}
              >
                <option className="text-base font-semibold " value="">
                  Choose Job Title...
                </option>
                {jobTitles.map((job, index) => (
                  <option
                    className="text-base font-semibold "
                    key={index}
                    value={job}
                  >
                    {job}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1 text-black">
              <label
                htmlFor="description"
                className="text-lg font-semibold text-gray-100"
              >
                Job Description:
              </label>
              <textarea
                id="description"
                rows="4"
                placeholder="Enter Job Description..."
                className="placeholder-black outline-none bg-slate-300 rounded-lg px-3 py-1 text-base font-semibold custom-sidebar"
                {...register("Description")}
              ></textarea>
            </div>

            <div className="flex flex-col gap-1 text-black">
              <label
                htmlFor="Experience"
                className="text-lg font-semibold text-gray-100"
              >
                What's Your Experince:
              </label>
              <select
                {...register("Experience")}
                id="Experience"
                className="bg-slate-300 outline-none text-base font-semibold py-3 rounded-lg px-3"
              >
                <option className="text-base font-semibold " value="">
                  Choose Experience...
                </option>
                <option className="text-base font-semibold " value={"Student"}>
                  Student
                </option>
                <option className="text-base font-semibold " value={"Fresher"}>
                  Fresher
                </option>
                <option
                  className="text-base font-semibold "
                  value={"Intermediate"}
                >
                  Intermediate
                </option>
                <option className="text-base font-semibold " value={"Senior"}>
                  Senior
                </option>
              </select>
            </div>
            <div className="flex  w-full flex-col gap-1 text-black">
              <TagInput></TagInput>
            </div>
          </div>

          <div className="w-full lg:px-10 flex flex-col lg:flex-row gap-1 items-center justify-center px-3">
            <h1 className="self-start text-lg font-semibold">Note:</h1>
            <p className="lg:pl-2 text-lg font-semibold">
              Please fill out each section carefully. Your interview will be
              based on the information you provide.
            </p>
          </div>

          <div className="mt-3 w-full lg:px-10 flex items-center justify-center px-3">
            <button
              disabled={btndisable}
              onClick={handleSubmit(onSubmit)}
              type="submit"
              className="bg-cyan-600 text-xl w-full font-bold lg:px-6 rounded-xl py-2  text-black hover:bg-cyan-700 hover:text-white transition-all"
            >
              {GenerateQuestions ? "Generate Interview Questions..." : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewForm;
