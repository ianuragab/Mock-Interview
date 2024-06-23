import { Lightbulb, Volume2 } from "lucide-react";
import React from "react";

const QuestionSection = ({ interviewQuestion, activeQuestion }) => {
  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Sorry, Your browser does not support text to speech.");
    }
  };
  return (
    interviewQuestion && (
      <div className="p-5 border rounded-lg my-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {interviewQuestion &&
            interviewQuestion.map((ques, index) => (
              <>
                <h2
                  className={`bg-secondary rounded-full p-2 text-xs md:text-sm text-center cursor-pointer ${
                    activeQuestion == index && "bg-primary text-white"
                  }`}
                  key={index}
                >
                  Question #{index + 1}
                </h2>
              </>
            ))}
        </div>
        <h2 className="my-4 text-md md:text-lg">
          {interviewQuestion[activeQuestion]?.question}
        </h2>
        <Volume2
          className="cursor-pointer"
          onClick={() =>
            textToSpeech(interviewQuestion[activeQuestion]?.question)
          }
        />

        <div className="border rounded-lg p-4 bg-blue-100 mt-5">
          <h2 className="flex gap-2 items-center text-primary">
            <Lightbulb />
            <strong>Note:</strong>
          </h2>
          <h2 className="text-sm text-primary my-2">
            Click on Record Answer when you want to answer the question. At the
            end of interview we will give you the feedback along with correct
            answer for each of question and your answer to compare it.
          </h2>
        </div>
      </div>
    )
  );
};

export default QuestionSection;
