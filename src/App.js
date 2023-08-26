import "./App.css";

import React, { Component} from "react";
import News from "./components/News";
import NavBar from "./components/NavBar";
export default class App extends Component {
  constructor(){
    super();
    this.state={
      mode:'light',
      category:"general",
      country:'us'
    }
  }

  // newsCategory=(choice)=>{
  //   if(choice==='sports')
  //   {
  //     this.setState({category:'category=sports'})
  //   }
  //   else if(choice==='business')
  //   {
  //     this.setState({category:'category=business'})
  //   }
  //   else if(choice==='technology')
  //   {
  //     this.setState({category:'category=technology'})
  //   }
  //   else if(choice==='health')
  //   {
  //     this.setState({category:'category=health'})
  //   }
  //   else if(choice==='science')
  //   {
  //     this.setState({category:'category=science'})
  //   }
  //   else if(choice==='general')
  //   {
  //     this.setState({category:'category=general'})
  //   }
  //   else if(choice==='entertainment')
  //   {
  //     this.setState({category:'category=entertainment'})
  //   }
  // }

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
          <NavBar mode={this.state.mode} modeToggler={this.modeToggler} />
          <News mode={this.state.mode} pageSize={15} category={this.state.category} country={this.state.country}/>
        </div>
      </>
    );
  }
}
