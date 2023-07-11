import React, { useRef, useState } from "react";
import classes from "./App.module.css";
import voiceOffSvg from "./icons/voiceOff.svg";
import voiceOnSvg from "./icons/voiceOn.svg";
import VoiceMessage from "./components/voiceMessage/voiceMessage";
import { v4 as uuidv4 } from "uuid";

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
function App() {
  const [transcript, setTranscript] = useState<string[][]>([[" "]]);
  const recognitionRef = useRef<any>(new SpeechRecognition());

  recognitionRef.current.lang = "ru-RU";
  recognitionRef.current.continuous = true;
  recognitionRef.current.interimResults = true;

  function randomInteger(min: number, max: number) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

  let phrase: string[] = [];
  function handlerRecognitionON() {
    recognitionRef.current.start();
    recognitionRef.current.onresult = (event: any) => {
      const word =
        randomInteger(1, 100) +
        " " +
        event.results[event.resultIndex][0].transcript +
        " ";
      phrase[event.resultIndex] = word;

      setTranscript(() => [phrase]);
    };
  }

  function handlerRecognitionOFF() {
    recognitionRef.current.stop();
  }

  return (
    <div className={classes.app}>
      <section className={classes.appSection}>
        <div className={classes.windowOfMessage}>
          {transcript[0].map((item) => (
            <VoiceMessage key={uuidv4()} words={item} />
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
