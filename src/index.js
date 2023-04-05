import axios from 'axios';

const generateTextButton = document.getElementById('generate-button');
const inputText = document.getElementById('prompt');
const ouputContainer = document.getElementById('output-container');
const loader = document.querySelector('.loader');

require('dotenv').config();

const apiKey = process.env.API_KEY;

loader.classList.add('off');

const generateText = async () => {
  const prompt = inputText.value;
  console.log(prompt);

  const length = Number(document.getElementById('length').value);

  const apiUrl = `https://api.openai.com/v1/completions`;

  const params = {
    model: 'text-davinci-003',
    prompt: prompt,
    max_tokens: length,
    temperature: 0,
  };

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  };

  const loaderToggle = () => {
    loader.classList.toggle('off');
  };

  try {
    loaderToggle();
    if (ouputContainer.lastElementChild.classList.contains('output')) {
      ouputContainer.lastElementChild.classList.toggle('off');
    }
    const response = await axios.post(apiUrl, params, {
      headers,
    });
    loaderToggle();

    const generatedText = response.data.choices[0].text;

    if (ouputContainer.lastElementChild.classList.contains('output')) {
      ouputContainer.lastElementChild.remove();
    }

    const outputElement = document.createElement('p');
    ouputContainer.insertAdjacentElement('beforeend', outputElement);
    outputElement.classList.add('output');
    outputElement.textContent = generatedText;
  } catch (error) {
    console.error(error);
  }
};

const generateTextAfterClick = () => {
  if (inputText.value.length > 0) {
    generateText();
  }
};

const generateTextAfterKeyPressed = (event) => {
  if (inputText.value.length > 0 && event.key === "Enter") {
    generateText();
  }
};

generateTextButton.addEventListener('click', generateTextAfterClick);
inputText.addEventListener('keypress', generateTextAfterKeyPressed);
