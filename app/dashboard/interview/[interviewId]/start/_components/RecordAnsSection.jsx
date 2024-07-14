"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic, StopCircle } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAIModal";
import { UserAnswer } from "@/utils/schema";
import moment from "moment";
import { db } from "@/utils/db";
import { useUser } from "@clerk/nextjs";

const RecordAnsSection = ({
  interviewQuestion,
  activeQuestion,
  interviewData,
}) => {
  const {user} = useUser() // get user from clerk context
  const [userAnswer, setUserAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    error,
    interimResult,
    isRecording,
    results,
    setResults,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  // console.log(interviewData);

  useEffect(() => {
    results.map((result) =>
      setUserAnswer((prevAns) => prevAns + result?.transcript)
    );
  }, [results]);
  // console.log(results);

  useEffect(() => {
    if (!isRecording && userAnswer?.length > 10) {
      UpdateUserAnswer();
    }
  }, [userAnswer]);

  if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;

  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  };

  const UpdateUserAnswer = async () => {
    setLoading(true);

    const feedbackPrompt =
      "Question: " +
      interviewQuestion[activeQuestion]?.question +
      ", User answer: " +
      userAnswer +
      ", Depends on question and user answer for given interview question" +
      " please give us rating (out of 5) for answer and feedback as area of improvement if any," +
      " in just 3 to 5 lines to improve it in JSON format with rating field and feedback field.";

    const result = await chatSession.sendMessage(feedbackPrompt);

    const mockJsonRes = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");

    console.log(mockJsonRes);

    const mockJson = JSON.parse(mockJsonRes);

    // console.log(interviewData);

    const resp = await db.insert(UserAnswer).values({
      idRef: interviewData?.id,
      question: interviewQuestion[activeQuestion]?.question,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      correctAns: interviewQuestion[activeQuestion]?.answer,
      userAns: userAnswer,
      rating: mockJson?.rating,
      feedback: mockJson?.feedback,
      createdAt: moment().format("DD-MM-YYYY"),
    });

    if (resp) {
      toast("Answer saved successfully!");
      setUserAnswer("");
      setResults([]);
    }
    setResults([]);
    setLoading(false);
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
          style={{ height: 320, width: "100%", zIndex: 10 }}
        />
      </div>
      <Button
        disabled={loading}
        variant="outline"
        className="my-5"
        onClick={StartStopRecording}
      >
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
