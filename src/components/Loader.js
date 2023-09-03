import React from "react";
import loading from "./loading.gif";
const Loader =()=> {
    return (
      <div className="text-center">
        <img src={loading} alt="Loading"></img>
      </div>
    );
  }
export default Loader;
