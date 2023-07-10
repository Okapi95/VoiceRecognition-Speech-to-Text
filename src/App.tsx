import React, { useEffect, useState } from "react";
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
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.lang = "ru-RU";
  recognition.continuous = true;
  recognition.interimResult = true;

  recognition.onsoundend = () => console.log("прием аудио закончен");

  const [wordsOnScreen, setWordsOnScreen] = useState<Array<string>>([]);

  function handlerRecognitionON() {
    recognition.start();
    recognition.onstart = () => console.log("onstart");

    recognition.onresult = (event: any) => {
      console.log("сработал onresult");

      const wordsArray: Array<Array<{ transcript: string }>> = Array.from(
        event.results
      );
      console.log(wordsArray.map((item) => item[0].transcript));

      setWordsOnScreen(() => wordsArray.map((item) => item[0].transcript));
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
          {wordsOnScreen.map((words) => (
            <VoiceMessage words1={words} />
          ))}
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
