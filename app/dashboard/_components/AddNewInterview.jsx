"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LoaderCircle } from "lucide-react";
import { chatSession } from "@/utils/GeminiAIModal";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

const AddNewInterview = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobRole, setJobRole] = useState();
  const [jobDesc, setJobDesc] = useState();
  const [jobExp, setJobExp] = useState();
  const [loading, setLoading] = useState(false);
  const [jsonRsp, setJsonResp] = useState([]);
  const { user } = useUser();
  const router = useRouter();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const inputPrompt =
      "Job Position " +
      jobRole +
      ", Job description " +
      jobDesc +
      " and years of experience " +
      jobExp +
      ". Depends on this information please give me " +
      process.env.NEXT_PUBLIC_NUMOF_QUESTIONS +
      " interview questions along with answers in JSON format. Give questions and answers as fill in JSON";

    const result = await chatSession.sendMessage(inputPrompt);
    const mockJsonRes = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");
    // console.log(JSON.parse(mockJsonRes));
    setJsonResp(mockJsonRes);

    if (mockJsonRes) {
      const resp = await db
        .insert(MockInterview)
        .values({
          mockId: uuidv4(),
          jsonMockResp: mockJsonRes,
          jobPosition: jobRole,
          jobDesc: jobDesc,
          jobExperience: jobExp,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          // createdBy: "anurag@ab.com",
          createdAt: moment().format("DD-MM-YYYY"),
        })
        .returning({ id: MockInterview.id });

      console.log("Inserted ID: ", resp);
      if (resp) {
        setOpenDialog(false);
        router.push("/dashboard/interview/" + resp[0]?.id);
      }
    } else {
      console.log("Error");
    }
    setLoading(false);
  };
  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md transition-all cursor-pointer"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="font-semibold text-lg text-center">+ Add New</h2>
      </div>
      <Dialog open={openDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl">
              Tell us about your job interview
            </DialogTitle>
            <DialogDescription>
              <div>
                <h2>
                  Add details about your job position/role. Job description and
                  year of experience.
                </h2>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mt-5 my-3">
                  <label>Job Role/Position</label>
                  <Input
                    placeholder="Ex. Full Stack Developer."
                    required
                    onChange={(e) => setJobRole(e.target.value)}
                  />
                </div>
                <div className="my-3">
                  <label>Job description/ Tech Stack (In short)</label>
                  <Textarea
                    placeholder="Ex. Angular, MySQL, Node, Epress, etc."
                    required
                    onChange={(e) => setJobDesc(e.target.value)}
                  />
                </div>
                <div className="my-3">
                  <label>Years of Experience</label>
                  <Input
                    placeholder="Ex. 2"
                    type="number"
                    required
                    onChange={(e) => setJobExp(e.target.value)}
                  />
                </div>
                <div className="flex gap-5 justify-end">
                  <Button variant="ghost" onClick={() => setOpenDialog(false)}>
                    Cancle
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <LoaderCircle className="animate-spin" />
                        Gentrating from AI...
                      </>
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewInterview;
