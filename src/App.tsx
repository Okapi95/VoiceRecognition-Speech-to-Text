import React, { useEffect, useState, useRef } from "react";
import classes from "./App.module.css";
import voiceOffSvg from "./icons/voiceOff.svg";
import voiceOnSvg from "./icons/voiceOn.svg";
import VoiceMessage from "./components/voiceMessage/voiceMessage";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

// declare global {
//   interface Window {
//     SpeechRecognition: any;
//     webkitSpeechRecognition: any;
//   }
// }

function App() {
  const [currentArr, setCurrentArray] = useState<Array<string>>([]);
  console.log("jnhbcjdrf");
  const { transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();
  if (!browserSupportsSpeechRecognition) {
    return null;
  }
  const startListening = () =>
    SpeechRecognition.startListening({
      continuous: true,
      language: "ru",
    });
  const stopListening = () => SpeechRecognition.stopListening();

  function randomInteger(min: number, max: number) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

  const arr = transcript.split(" ");
  if (transcript) {
    setCurrentArray((currentArr) => [...currentArr, arr[arr.length - 1]]);
  }

  console.log(currentArr);

  console.log(arr);

  return (
    <div className={classes.app}>
      <section className={classes.appSection}>
        <div className={classes.windowOfMessage}>
          {/* {wordsOnScreen.map((words) => (
            <VoiceMessage words1={words} />
          ))} */}
          {/* {currentArr.map((word) => randomInteger(1, 100) + " " + word + " ")} */}
        </div>
        <div className={classes.buttons}>
          <button
            className={classes.buttons__microphoneButton}
            onClick={() => startListening()}
          >
            <img
              alt="microphoneOn"
              src={voiceOnSvg}
              style={{ width: "30px", height: "30px" }}
            />
          </button>
          <button
            className={classes.buttons__microphoneButton}
            onClick={() => stopListening()}
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
