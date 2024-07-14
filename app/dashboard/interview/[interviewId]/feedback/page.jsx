"use client";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { CircleChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const Feedback = ({ params }) => {
  const [feedback, setFeedback] = useState([]);
  const router = useRouter();

  useEffect(() => {
    GetFeedback();
  }, []);

  const GetFeedback = async () => {
    // Get feedback from the database
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.idRef, params.interviewId))
      .orderBy(UserAnswer.id);

    console.log(result);
    setFeedback(result);
  };
  return (
    <div className="p-8">
      {feedback?.length == 0 ? (
        <div>
          <h3 className="text-xl text-red-500 my-3 font-medium">
            No feedback available for this interview.
          </h3>
        </div>
      ) : (
        <>
          <h2 className="text-4xl font-bold text-green-500">Congratulation!</h2>
          <h3 className="text-2xl font-bold">
            Here is your interview feedback
          </h3>

          <h3 className="text-xl text-primary my-3">
            Your overall interview rating: <strong>7/10</strong>
          </h3>

          <h5 className="text-sm text-gray-500">
            Find below interview question with correct answer, Your answer and
            feedback for improvement.
          </h5>

          {feedback &&
            feedback.map((item, index) => (
              // console.log(item),
              <Collapsible key={index} className="mt-6">
                <CollapsibleTrigger className="flex justify-between p-2 px-4 bg-secondary rounded-lg my-2 text-left w-full">
                  {item.question} <CircleChevronDown />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="flex flex-col gap-3">
                    <h3 className="text-red-500 p-2 border rounded-lg">
                      <strong>Rating : </strong>
                      {item.rating}
                    </h3>
                    <h2 className="p-2 border rounded-lg bg-red-50 text-sm text-red-800">
                      <strong>Your Answer : </strong>
                      {item.userAns}
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-green-50 text-sm text-green-800">
                      <strong>Correct Answer : </strong>
                      {item.correctAns}
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-blue-50 text-sm text-primary">
                      <strong>Feedback : </strong>
                      {item.feedback}
                    </h2>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
        </>
      )}

      <Button onClick={() => router.replace("/dashboard")}>Go Home</Button>
    </div>
  );
};

export default Feedback;
