import { container, bounceball, text } from "./ResponseLoading.module.css";

const ResponseLoading = () => {
  return (
    <div className={container}>
      <div>
        <div className={bounceball}></div>
        <div className={text}>Generate Response...</div>
      </div>
    </div>
  );
};

export default ResponseLoading;
