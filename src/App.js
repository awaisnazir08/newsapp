import "./App.css";

import React, { Component} from "react";
import News from "./components/News";
import NavBar from "./components/NavBar";
export default class App extends Component {
  constructor(){
    super();
    this.state={
      mode:'light'
    }
  }
  modeToggler=()=> {
    if(this.state.mode==='dark'){
      this.setState({mode:'light'})
      document.body.style.backgroundColor="white";
    }
    else{
      this.setState({mode:'dark'})
      document.body.style.backgroundColor="#042743";
    }
  } 
  render() {
    return (
      <>
        <div>
          <NavBar mode={this.state.mode} modeToggler={this.modeToggler}/>
          <News mode={this.state.mode} pageSize={9}/>
        </div>
      </>
    );
  }
}
