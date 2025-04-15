import { loader } from "./Loader.module.css";

const Loader = () => {
  return (
    <>
      <div className={loader}></div>
      <p>Fetching History...</p>
    </>
  );
};

export default Loader;
