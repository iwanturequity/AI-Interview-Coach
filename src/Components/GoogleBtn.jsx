import { useAuth } from "../Context/AuthContext";

const GoogleBtn = ({ navigate }) => {
  const { signInWithGoogle, loading } = useAuth();
  return (
    <button
      onClick={() => signInWithGoogle(navigate)}
      disabled={loading}
      className={`bg-[#05070A] border-[1px] border-gray-500 sm:w-[85%] w-[95%] rounded-lg text-md font-semibold py-2 text-white flex items-center justify-center gap-9 ${
        loading ? "opacity-60 " : ""
      }`}
    >
      <img
        src="/assets/google.webp"
        alt="Google Logo"
        className="h-7 w-7 object-cover"
      />
      <p>Sign in with Google</p>
    </button>
  );
};

export default GoogleBtn;
