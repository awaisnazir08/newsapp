import React, { Component } from "react";
import loading from "./loading.gif";
export class Loader extends Component {
  render() {
    return (
      <div className="text-center">
        <img src={loading} alt="Loading"></img>
      </div>
    );
  }
}

export default Loader;
