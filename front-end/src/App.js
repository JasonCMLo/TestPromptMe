import logo from './logo.svg';
import './App.css';
import React from 'react';
import axios from 'axios';
import {Button} from 'react-bootstrap'
import StoryInput from './Components/Stories/NewStory';
import Stories from "./Components/Stories/Stories"
import Header from "./Components/Partials/Header"

import 'bootstrap/dist/css/bootstrap.min.css';




function App() {
  
  return (
    
    <div className="App">
      <Header/>
      <Stories/>
    </div>
  );
}

export default App;
