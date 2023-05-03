import Story from "../Models/models.story.js";
import Prompt from "../Models/models.prompts.js";


export function updateStory(req, res) {
    Story.findByIdAndUpdate(req.body.id, {Story: req.body.Story}, {new: true}, (err, doc) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(doc);
      }
    });
  };

export function createPrompts(req, res) {

    const {newPrompt} = (req.body);

    console.log(newPrompt);

    let mongoPrompt = new Prompt({
        prompt: newPrompt
    })

    mongoPrompt.save();

    res.send("Success!");
};

export function getPrompts(req, res) {
    Prompt.find({}).then((items) => res.json(items));
}

export function getStories(req, res) {

    let skip = req.query.skip || 0;
    Story.find({}, undefined, {skip, limit: 10}).sort({date: -1}).then((items) => res.json(items));
}

export function lockPrompt(req, res) {
    
    Prompt.find().then((items) => {
        let x = Math.floor(Math.random() * items.length);
        res.json(items[x].prompt)
    })

}

export function createStory(req, res) {

  try {
    const {prompt, story} = (req.body);

    let newStory = new Story({
      prompt: prompt,
      story: story,
    })
  
    newStory.save();
  
    res.send("Success!");
  } catch {
    res.send("Failure");
  }

}