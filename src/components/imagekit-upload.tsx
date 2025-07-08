//@ts-nocheck
"use client";

import { IKUpload } from "imagekitio-next";
import { Button } from "./ui/button";
import { useRef, useState } from "react";
import { toast } from "sonner";

const authenticator = async () => {
  try {
    const response = await fetch("/api/auth");

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error: any) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

export default function ImageKitUpload() {
  const ikUploadRef = useRef<any>(null);
  const [progressBar, setProgressBar] = useState<number>(0);
  // const [fileLink, setFileLink] = useState<string>("");
  return (
    <div className="flex flex-col justify-center items-center h-24 gap-2">
      <IKUpload
        ref={ikUploadRef}
        folder={`/imagekit-file-uploader`}
        onSuccess={(res) => {
          console.log(res);
          // setFileLink(res.url);
        }}
        // validateFile={(file) => {
        //   if (file.size > 1024 * 1024 * 100) {
        //     toast.message("File size should be less than 100MB");
        //     return false;
        //   }
        //   const allowTypes = ["video/mp4"];
        //   if (!allowTypes.includes(file.type)) {
        //     toast.error("Only mp4 files are allowed.");
        //     return false;
        //   }
        //   return true;
        // }}
        onUploadProgress={(progress) => {
          const progressPercent = Math.round(
            (progress.loaded / progress.total) * 100
          );
          if (progressPercent === 100) {
            toast.success("File Uploaded Successfully.");
            setTimeout(() => {
              setProgressBar(0);
            }, 1000);
          }
          setProgressBar(progressPercent);
        }}
        urlEndpoint={process.env.NEXT_PUBLIC_URL_ENDPOINT}
        publicKey={process.env.NEXT_PUBLIC_PUBLIC_KEY}
        authenticator={authenticator}
        className="hidden"
      />
      <Button
        onClick={() => {
          ikUploadRef.current.click();
        }}
        variant={"outline"}
        className="rounded mt-2 w-fit cursor-pointer shadow-xl"
      >
        Upload here
      </Button>

      <div className="mt-6 h-4 w-[400px] relative">
        {progressBar > 0 && (
          <div>
            <div className="absolute top-0 left-0 bg-gray-300 h-4 w-full rounded-2xl z-[0]" />
            <div
              className="absolute top-0 left-0 bg-green-500 h-4 rounded-2xl z-[1] text-center text-xs text-white"
              style={{ width: `${progressBar}%` }}
            >
              {progressBar}%
            </div>
          </div>
        )}
      </div>

      {/* {fileLink && (
        <div className="flex flex-col items-center gap-2">
          <Link
            href={fileLink}
            target="_blank"
            className="mt-4 border-2 border-white/70 rounded p-1 text-green-400 underline"
          >
            {`${fileLink}?tr=w-600`}
          </Link>
          <div className="w-[800px] flex items-center justify-center">
            <video src={`${fileLink}?tr=w-600`} controls autoPlay muted loop />
          </div>
        </div>
      )} */}
    </div>
  );
}
