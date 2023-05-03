
import React, { useRef, useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';

import Timer from './Timer'
import axios from 'axios';

function StoryInput(props) {
  const [isWriting, setIsWriting] = useState(false);
  const [prompt, setPrompt] = useState("Click the button to start a new prompt!")
  const [story, setStory] = useState();
  const [buttonText, setButtonText] = useState("Start");
  const [buttonState, setButtonState] = useState("primary");

  const promptRef = useRef();
  const storyRef = useRef();

  promptRef.current = prompt;
  storyRef.current = story;


  const updateStory = (event) => {
    const story = event.target.value;

    setStory(story);
    
    console.log(story);

  }

  const handleClick = () => {

    if (!isWriting) {
      setIsWriting(true);
      handlePrompt();
    } else {
      handleSubmit();
    }
    
  };

  const handlePrompt = () => {
    axios
      .get("/newStory")
      .then((res) => {
        setPrompt(res.data)
      })
      .then(
        setButtonText(<Timer timesUp = {timesUp} duration ={10000} warning={fiveMinutes}/>))
  }

  const fiveMinutes = () => {
    setButtonState("danger");
  }

  const timesUp = () => {
    setIsWriting(false);

    handleSubmit();
    
  }

  const handleSubmit = () => {

      axios
        .post("/sendStory", {
          prompt: promptRef.current,
          story: storyRef.current
        })
        .then( (res) => {
          if (res.status === 200) {
            setButtonText("Successfully submitted!");
            refreshComponent();
          }
        })
    };

  const refreshComponent = () => {
    props.reloadStories();
    setStory("");
    setPrompt("Click the button to start a new prompt!")
    setButtonState("primary");
    setButtonText("Start");
    setIsWriting(false);

  }

  return (

    <Card className="storyCard">
    <Card.Header>{prompt}</Card.Header>
    <Card.Body>
      <Form>
        <Form.Group controlId="formBasicTextarea">
          <Form.Control as="textarea" rows={isWriting ? 15 : 3} value={story} onChange={updateStory} readOnly={!isWriting}/>
        </Form.Group>
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <Button variant={buttonState} onClick={handleClick} style={{width:"30%"}}>
            {buttonText}
          </Button>
        </div>
      </Form>
      
    </Card.Body>
    </Card>
    
  );
};

export default StoryInput;