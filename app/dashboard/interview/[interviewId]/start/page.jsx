"use client";

import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import QuestionSection from "./_components/QuestionSection";
import RecordAnsSection from "./_components/RecordAnsSection";

const StartInterview = ({ params }) => {
  const [interviewData, setInterviewData] = useState();
  const [interviewQuestion, setInterviewQuestion] = useState();
  const [activeQuestion, setActiveQuestion] = useState(0);

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  /**
   * Used to Get Interviewer's Details by MockId / Interviewer Id
   */
  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));
    // console.log(result);

    const jsonResp = JSON.parse(result[0].jsonMockResp);
    setInterviewQuestion(jsonResp);
    setInterviewData(result[0]);
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Question Section  */}
      <QuestionSection
        interviewQuestion={interviewQuestion}
        activeQuestion={activeQuestion}
      />

      {/* Video/ Audio Recrding */}
      <RecordAnsSection />
    </div>
  );
};

export default StartInterview;
