import React from "react";
import "./Loader.css";

const Loader: React.FC = () => {
  return <div className="loader"></div>;
};

export const LoaderWrapper = () => {
  return (
    <div className="h-[100vh] w-full bg-black z-50 fixed top-0 left-0 flex justify-center items-center">
      <Loader />
    </div>
  );
};

export default Loader;
