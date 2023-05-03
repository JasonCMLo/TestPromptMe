import mongoose from 'mongoose';
import express from 'express';
import session from "express-session";

import { createPrompts, getPrompts, getStories, lockPrompt , createStory} from './Controller/controller.story.js';
import bodyParser from "body-parser";


const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/prompts', getPrompts)
app.get('/stories', getStories);
app.get('/newStory', lockPrompt)

app.post("/newPrompt", createPrompts)
app.post("/sendStory", createStory);

app.listen(4000, () => {
  console.log('Server running on port 4000');
});

let uri = "mongodb+srv://Jason-Stories:stories1234@cluster0.tstbsbq.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.log(err));