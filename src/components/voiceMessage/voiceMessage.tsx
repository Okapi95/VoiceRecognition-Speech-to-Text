import React from "react";
import classes from "./voiceMessage.module.css";

function VoiceMessage({ words1 }: { words1: string }) {
  return <div className={classes.voiceMessage}>{words1}</div>;
}

export default VoiceMessage;
