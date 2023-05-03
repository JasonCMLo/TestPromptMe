
import axios from 'axios';
import fs from 'fs';
import request from 'request';

const target= "http://localhost:3000/newPrompt";

// Create a function to read the file
const readFile = (fileName) => {
  // Read the file
  let data = fs.readFileSync(fileName, 'utf8');

  // Split the file into lines
  let lines = data.split('\n');

  // Iterate through each line
  lines.forEach(line => {

    data = {
        newPrompt: line
    }
    // Make the POST request for each line
    axios.post(target, data, (err, res, body) => {
      if (err) {
        console.error(err);
      } else {
        console.log(body);
      }
    });
  });
}

// Call the readFile function
readFile('prompts.txt');