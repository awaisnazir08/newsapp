import "./App.css";

import React, { Component} from "react";
import News from "./components/News";
import NavBar from "./components/NavBar";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
export default class App extends Component {
  apiKey= process.env.REACT_APP_NEWS_API_KEY
  constructor(){
    super();
    this.state={
      mode:'light',
      category:"general",
      country:'us',
      pageSize:12,
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
          <Router>
          <NavBar mode={this.state.mode} apiKey={this.apiKey} modeToggler={this.modeToggler} />
          <Routes>
            <Route exact path='/' element={<News key="general" mode={this.state.mode} apiKey={this.apiKey} pageSize={this.state.pageSize} category='general' country={this.state.country}/>}/>
            <Route exact path='/entertainment' element={<News key="entertainment" heading='NewsMonkey - Top Entertainment Headlines' mode={this.state.mode} apiKey={this.apiKey} pageSize={this.state.pageSize} category='entertainment' country={this.state.country}/>}/>
            <Route exact path='/business' element={<News key="business" heading='NewsMonkey - Top Business Headlines' mode={this.state.mode} apiKey={this.apiKey} pageSize={this.state.pageSize} category='business' country={this.state.country}/>}/>
            <Route exact path='/technology' element={<News key="technology" heading='NewsMonkey - Top Technology Headlines' mode={this.state.mode} apiKey={this.apiKey} pageSize={this.state.pageSize} category='technology' country={this.state.country}/>}/>
            <Route exact path='/sports' element={<News key="sports" heading='NewsMonkey - Top Sports Headlines' mode={this.state.mode} apiKey={this.apiKey} pageSize={this.state.pageSize} category='sports' country={this.state.country}/>}/>
            <Route exact path='/science' element={<News key="science"  heading='NewsMonkey - Top Science Headlines' mode={this.state.mode} apiKey={this.apiKey} pageSize={this.state.pageSize} category='science' country={this.state.country}/>}/>
            <Route exact path='/health' element={<News key="health" heading='NewsMonkey - Top Health Headlines' mode={this.state.mode} apiKey={this.apiKey} pageSize={this.state.pageSize} category='health' country={this.state.country}/>}/>
          </Routes>
          </Router>
        </div>
      </>
    );
  }
}
