import React from "react";
import classes from "./voiceMessage.module.css";

function VoiceMessage({ words1 }: { words1: string }) {
  function randomInteger(min: number, max: number) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

  return (
    <div className={classes.voiceMessage}>
      <p>{randomInteger(1, 100)}</p> {words1}
    </div>
  );
}

export default VoiceMessage;
