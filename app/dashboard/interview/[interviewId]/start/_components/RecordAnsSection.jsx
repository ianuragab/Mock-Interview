"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic, StopCircle } from "lucide-react";

const RecordAnsSection = () => {
  const [userAnswer, setUserAnswer] = useState("");
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    results.map((result) =>
      setUserAnswer((prevAns) => prevAns + result?.transcript)
    );
  }, [results]);

  if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;

  const saveUserAns = () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex flex-col mt-10 justify-center items-center bg-black rounded-lg p-4">
        <Image
          src={"/webcam.png"}
          width={120}
          height={120}
          className="absolute"
        />
        <Webcam
          mirrored={true}
          style={{ height: 280, width: "100%", zIndex: 10 }}
        />
      </div>
      <Button variant="outline" className="my-5" onClick={saveUserAns}>
        {isRecording ? (
          <h2 className="text-red-600 flex gap-1 animate-pulse items-center">
            <StopCircle /> Stop Recording
          </h2>
        ) : (
          <h2 className="text-primary flex gap-1 items-center">
            <Mic /> Record Answer
          </h2>
        )}
      </Button>

      <Button onClick={() => console.log(userAnswer)}>Show User Answer</Button>
    </div>
  );
};

export default RecordAnsSection;
