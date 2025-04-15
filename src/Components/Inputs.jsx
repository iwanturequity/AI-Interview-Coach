const Inputs = ({ fields }) => {
  return (
    <>
      {fields.map((input, index) => {
        return (
          <div className="w-full flex items-center flex-col gap-3" key={index}>
            <label
              htmlFor={input.label}
              className="self-start sm:pl-8 pl-3 text-gray-300"
            >
              {input.label}
            </label>
            <input
              id={input.id}
              ref={input.ref}
              type={input.type}
              placeholder={input.placeholder}
              autoComplete={input.autocomplete}
              className="sm:w-[85%] w-[92%] bg-[#05070A] border-[1px] border-solid border-blue-700 rounded-lg px-4 py-2 outline-none"
            />
          </div>
        );
      })}
    </>
  );
};

export default Inputs;
