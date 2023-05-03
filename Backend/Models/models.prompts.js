import mongoose from "mongoose";

const PromptSchema = new mongoose.Schema({
    prompt: {
        type: String,
        required: true
    }
});

const Prompt = mongoose.model('Prompt', PromptSchema);

export default Prompt