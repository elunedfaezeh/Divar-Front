import React from "react";
import { BallTriangle } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="flex items-center justify-center">
      
      <BallTriangle
        height={60}
        width={60}
        radius={5}
        color="red"
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
      
    </div>
  );
};

export default Loader;
