import React, { useEffect, useState } from "react";
import axios from "axios";
import StoryExerpt from "./StoryExerpt";
import NewStory from "./NewStory"
import './stories.css';
import InfiniteScroll from "react-infinite-scroll-component";

function GetStories() {
  const [stories, setStories] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    loadStories();

  }, []);

  const loadStories =() => {

    let target = "/stories?skip=" + stories.length;

    console.log("triggering scroll");
    console.log(stories.length);

    axios
    .get(target)
    .then((res) => {
      if (res.data.length ===0) {
        setHasMore(false);
      } else {
        setStories([...stories, ...res.data]);
      }
      
    })
    .catch((err) => {
      console.log(err);
    });
  }


  return (
    <div className="storyDiv">
    <NewStory reloadStories={loadStories}/>

    <InfiniteScroll
      dataLength={stories.length}
      hasMore={hasMore}
      next={loadStories}
      loader={<h1>Loading...</h1>}
      endMessage={<h1>End - Write more stories!</h1>}
      >
      {stories.map((story) => (
        <StoryExerpt content={story.story} header={story.prompt} key={story._id}/>
      ))}
    </InfiniteScroll>
    </div>
  );
  
};

export default GetStories;