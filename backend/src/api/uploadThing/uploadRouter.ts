import { createUploadthing, type FileRouter } from "uploadthing/express";

const f = createUploadthing();


export const uploadRouter = {
    imageUploader: f({
        image: { maxFileSize: "4MB", maxFileCount: 1 },
    })
        .onUploadComplete(async ({ file }) => {

            return { url: file.url }
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof uploadRouter