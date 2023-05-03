import mongoose from "mongoose";

const StorySchema = new mongoose.Schema({
    date: {
      type: Date,
      default: Date.now
    },
    story: {
      type: String,
      required: true
    },
    prompt: {
      type: String,
      required: true
    }
  });
  
  const Story = mongoose.model('Story', StorySchema);
  
export default Story;