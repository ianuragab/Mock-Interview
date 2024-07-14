import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const InterviewCard = ({ interview }) => {
  const router = useRouter();

  const onStart = () => {
    router.push(`/dashboard/interview/${interview.id}`);
  };

  const onFeedback = () => {
    router.push(`/dashboard/interview/${interview.id}/feedback`);
  };

  return (
    <div className="border shadow-sm rounded-lg p-3">
      <h2 className="font-bold text-primary capitalize">
        {interview?.jobPosition}
      </h2>
      <h4 className="text-sm text-gray-600">
        {interview?.jobExperience} Years of exp.
      </h4>
      <h6 className="text-xs text-gray-400">
        Created At: {interview?.createdAt}
      </h6>

      <div className="flex justify-between mt-4 gap-5">
        <Button
          size="sm"
          variant="outline"
          className="w-full"
          onClick={onFeedback}
        >
          Feedback
        </Button>
        <Button size="sm" className="w-full" onClick={onStart}>
          Start
        </Button>
      </div>
    </div>
  );
};

export default InterviewCard;
