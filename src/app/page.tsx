import ImageKitUpload from "@/components/imagekit-upload";
import { ModeToggle } from "@/components/modeToggle";

export default function HomePage() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <ModeToggle />
      <div className="p-2 py-5 flex flex-col items-center gap-2 w-full sm:w-[40%] justify-center text-center border-x-4 border-primary/20 rounded-lg text-balance">
        <h1 className="text-4xl font-bold mb-1 bg-gradient-to-r from-blue-800 to-red-500 text-transparent bg-clip-text underline">
          File Uploader
        </h1>
        <p className="text-xl">
          Upload your images and videos here! It will be stored in imagekit and
          we are using nextjs + imagekitio
        </p>
        <ImageKitUpload />
      </div>
    </div>
  );
}
