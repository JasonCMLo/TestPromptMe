import React, { useEffect, useRef, useState } from 'react';
import { Card } from 'react-bootstrap';
import './stories.css';

function StoryExerpt(props) {

  const [full, setFull] = useState(false)
  const [story, setStory] = useState("");

  useEffect( () => {
    setStory(props.content);

  }, [])

  const splitLines = (input, index) => {

    if (input != "") {
      return <p key={index}>{input}</p>
    } 

  }

  const HandleClick = () => {
    setFull(!full);
  }

  return (
    <Card className="storyCard" onClick={HandleClick}>
        <Card.Header>{props.header}</Card.Header>
      <Card.Body
        style={{
            paddingTop: '10px',
            paddingBottom: '10px',
            textAlign: 'left',
            transition: "height 0.5s ease-in-out" 
        }}>          
        {full
            ? story.split("\n").map( (line, index) => {
                return splitLines(line, index);
            })
            : story.substring(0, 140)+"..."}
      </Card.Body>
    </Card>
  );
};

export default StoryExerpt;