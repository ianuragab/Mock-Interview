"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb, WebcamIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";

const Interview = ({ params }) => {
  const [interviewData, setInterviewData] = useState();
  const [webCamEnabled, setWebCamEnabled] = useState(false);

  useEffect(() => {
    // console.log(params);
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

    setInterviewData(result[0]);
    // console.log(result);
  };
  return (
    <div className="my-10">
      <h2 className="font-bold text-2xl">Let's Get Started</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-2">
        <div className="flex flex-col mt-6 gap-5">
          <div className="flex flex-col p-3 gap-2 rounded-lg border">
            <h3 className="capitalize">
              <strong>Job Role/Position: </strong>
              {interviewData?.jobPosition}
            </h3>
            <h3 className="capitalize">
              <strong>Job Description/Tech Stack: </strong>
              {interviewData?.jobDesc}
            </h3>
            <h3>
              <strong>Years of Experience: </strong>
              {interviewData?.jobExperience}
            </h3>
          </div>

          <div className="p-4 border rounded-lg border-yellow-300 bg-yellow-100">
            <h2 className="flex gap-2 items-center text-yellow-500">
              <Lightbulb />
              <strong>Information</strong>
            </h2>
            <h4 className="text-gray-500 mt-2">
              Enable Video Web Cam and Microphone to start your AU Generated
              Mock Interview. It has 5 uestions which you can answer and at last
              you will get the report on the basis of your answer.
              <strong>Note:</strong> We never record your vedio, Web cam access
              you can disable at any time if you want.
            </h4>
          </div>
        </div>

        <div>
          {webCamEnabled ? (
            <Webcam
              onUserMedia={() => setWebCamEnabled(true)}
              onUserMediaError={() => setWebCamEnabled(false)}
              mirrored={true5}
              style={{ height: 280, width: 300 }}
            />
          ) : (
            <>
              <WebcamIcon className="h-56 w-full my-6 p-20 bg-secondary rounded-lg border" />
              <Button
                variant="ghost"
                className="w-full font-semibold"
                onClick={() => setWebCamEnabled(true)}
              >
                Enable Web Cam and Microphone
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="flex justify-end items-end">
        <Link href={'/dashboard/interview/' + params.interviewId + '/start'}>
          <Button>Start Interview</Button>
        </Link>
      </div>
    </div>
  );
};

export default Interview;
