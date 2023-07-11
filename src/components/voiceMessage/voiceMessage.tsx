import React from "react";
import classes from "./voiceMessage.module.css";

function VoiceMessage({ words }: { words: string }) {
  return <div className={classes.voiceMessage}>{words}</div>;
}

export default VoiceMessage;
