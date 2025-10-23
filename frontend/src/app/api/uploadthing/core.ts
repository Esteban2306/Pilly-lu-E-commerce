import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const uploadRouter = {
    productImage: f({
        image: { maxFileSize: "16MB", maxFileCount: 4 },
    })
        .onUploadComplete(async ({ file }) => {
            return { url: file.url };
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof uploadRouter;