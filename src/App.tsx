import React, { useState } from "react";
import classes from "./App.module.css";
import voiceOffSvg from "./icons/voiceOff.svg";
import voiceOnSvg from "./icons/voiceOn.svg";
import VoiceMessage from "./components/voiceMessage/voiceMessage";

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

function App() {
  const [words, setWords] = useState<string>(" ");

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.lang = "ru-RU";
  recognition.continuous = true;
  recognition.interimResult = true;

  recognition.onsoundend = () => console.log("прием аудио закончен");

  function randomInteger(min: number, max: number) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

  function handlerRecognitionON() {
    recognition.start();
    recognition.onresult = (event: any) => {
      const phrase =
        randomInteger(1, 100) +
        " " +
        event.results[event.resultIndex][0].transcript +
        " ";
      console.log(phrase);
      setWords((words) => words + phrase);
    };
  }

  function handlerRecognitionOFF() {
    recognition.onsoundend = () =>
      console.log(
        "прием аудио закончен в handlerRecognitionOFF, сработал onsoundend"
      );
    recognition.stop();
  }

  return (
    <div className={classes.app}>
      <section className={classes.appSection}>
        <div className={classes.windowOfMessage}>
          <VoiceMessage words={words} />
        </div>
        <div className={classes.buttons}>
          <button
            className={classes.buttons__microphoneButton}
            onClick={() => handlerRecognitionON()}
          >
            <img
              alt="microphoneOn"
              src={voiceOnSvg}
              style={{ width: "30px", height: "30px" }}
            />
          </button>
          <button
            className={classes.buttons__microphoneButton}
            onClick={() => handlerRecognitionOFF()}
          >
            <img
              alt="microphoneOff"
              src={voiceOffSvg}
              style={{ width: "30px", height: "30px" }}
            />
          </button>
        </div>
      </section>
    </div>
  );
}

export default App;
