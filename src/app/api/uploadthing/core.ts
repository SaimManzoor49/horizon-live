import { getSelf } from "@/lib/auth-service";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  thumbnailUploder: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  }).middleware(async()=>{
    const self = await getSelf()
    return {user:self}
  })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
