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

  // const [isListening, setIsListening] = useState(false);
  // const [note, setNote] = useState<string>("");

  // useEffect(() => {
  //   handleListen();
  // }, [isListening]);

  // const handleListen = () => {
  //   if (isListening) {
  //     mic.start();
  //     mic.onend = () => {
  //       console.log("continue..");
  //       mic.start();
  //     };
  //   } else {
  //     mic.stop();
  //     console.log("stop");
  //     mic.onend = () => {
  //       console.log("Stopped Mic on Click");
  //     };
  //   }
  //   mic.onstart = () => {
  //     console.log("Mics on");
  //   };

  //   mic.onresult = (event: any) => {
  //     console.log(event);
  //     console.log(Array.from(event.results));
  //     // const transcript = event.results
  //     //   .map((result) => result[0])
  //     //   .map((result) => result.transcript)
  //     //   .join("");
  //     const transcript = "";
  //     console.log(transcript);
  //     setNote(() => transcript);
  //     mic.onerror = (event: any) => {
  //       console.log(event.error);
  //     };
  //   };
  // };

  recognition.onsoundend = () => console.log("прием аудио закончен");

  const [wordsOnScreen, setWordsOnScreen] = useState<Array<string>>([]);

  function handlerRecognitionON() {
    recognition.start();
    console.log("Идёт распознавание речи");
    recognition.onstart = () => console.log("onstart");
    setWordsOnScreen(() => ["начали распозновать"]);
    recognition.onaudiostart = () =>
      console.log("начинаем принимать аудио, сработал onaudiostart ");

    recognition.onresult = (event: any) => {
      console.log("сработал onresult");

      const wordsArray: Array<Array<{ transcript: string }>> = Array.from(
        event.results
      );
      console.log(wordsArray.map((item) => item[0].transcript));
      // console.log("это массив wordsArray");

      // const stringArr = wordsArray.map((item) => item[0].transcript);
      // console.log(stringArr);

      setWordsOnScreen(() => wordsArray.map((item) => item[0].transcript));
    };
  }

  function handlerRecognitionOFF() {
    recognition.onsoundend = () =>
      console.log(
        "прием аудио закончен в handlerRecognitionOFF, сработал onsoundend"
      );
    console.log("stop");
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
