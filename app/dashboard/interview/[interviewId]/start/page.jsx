"use client";

import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import QuestionSection from "./_components/QuestionSection";
import RecordAnsSection from "./_components/RecordAnsSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const StartInterview = ({ params }) => {
  const [interviewData, setInterviewData] = useState();
  const [interviewQuestion, setInterviewQuestion] = useState();
  const [activeQuestion, setActiveQuestion] = useState(1);

  // console.log(interviewData);

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  // change setActiveQuestion on clicking the question in the QuestionSection
  useEffect(() => {
    if (interviewQuestion) {
      setActiveQuestion(0);
    }
  }, [interviewQuestion]);

  /**
   * Used to Get Interviewer's Details by MockId / Interviewer Id
   */
  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));
    setInterviewData(result[0]);
    // console.log(result);

    const jsonResp = JSON.parse(result[0].jsonMockResp);
    setInterviewQuestion(jsonResp);
  };
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Question Section  */}
        <QuestionSection
          interviewQuestion={interviewQuestion}
          activeQuestion={activeQuestion}
        />

        {/* Video/ Audio Recrding */}
        <RecordAnsSection
          interviewQuestion={interviewQuestion}
          activeQuestion={activeQuestion}
          interviewData={interviewData}
        />
      </div>
      <div className="flex justify-end gap-3 pt-4">
        {activeQuestion > 0 && (
          <Button onClick={() => setActiveQuestion(activeQuestion - 1)}>
            Previous Question
          </Button>
        )}
        {activeQuestion != interviewQuestion?.length - 1 && (
          <Button onClick={() => setActiveQuestion(activeQuestion + 1)}>
            Next Question
          </Button>
        )}
        {activeQuestion == interviewQuestion?.length - 1 && (
          <Link href={"/dashboard/interview/"+interviewData?.mockId+"/feedback"}>
            <Button>End Interview</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default StartInterview;
