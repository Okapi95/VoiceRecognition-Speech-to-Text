import React, { useState } from "react";
import classes from "./App.module.css";
import voiceOffSvg from "./icons/voiceOff.svg";
import voiceOnSvg from "./icons/voiceOn.svg";
import VoiceMessage from "./components/voiceMessage/voiceMessage";

function App() {
  const [voiceIsRecording, setVoiceIsRecording] = useState(true);
  return (
    <div className={classes.app}>
      <section className={classes.appSection}>
        <div className={classes.windowOfMessage}>
          <VoiceMessage />
          <VoiceMessage />
          <VoiceMessage />
          <VoiceMessage />
          <VoiceMessage />
          <VoiceMessage />
          <VoiceMessage />
          <VoiceMessage />
          <VoiceMessage />
          <VoiceMessage />
          <VoiceMessage />
          <VoiceMessage />
          <VoiceMessage />
          <VoiceMessage />
        </div>
        {voiceIsRecording ? (
          <button className={classes.microphoneButton}>
            <img
              alt="microphoneOff"
              src={voiceOffSvg}
              style={{ width: "30px", height: "30px" }}
            />
          </button>
        ) : (
          <button className={classes.microphoneButton}>
            <img
              alt="microphoneOn"
              src={voiceOnSvg}
              style={{ width: "30px", height: "30px" }}
            />
          </button>
        )}
      </section>
    </div>
  );
}

export default App;
