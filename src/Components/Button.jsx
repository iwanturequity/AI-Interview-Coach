const Button = ({ icon, text, children, Click, Class, disable }) => {
  return (
    <button
      disabled={disable}
      className={`flex items-center gap-2 px-4 py-2 border-2 border-blue-500 rounded-lg shadow-md shadow-blue-400 text-lg ${Class}`}
      onClick={Click}
    >
      {icon}
      {text}
      {children}
    </button>
  );
};

export default Button;
