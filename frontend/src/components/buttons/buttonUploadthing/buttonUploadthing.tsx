'use client'

import { useDropzone } from "react-dropzone";
import { useEffect, useState } from "react";
import { generateReactHelpers } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

const { useUploadThing } = generateReactHelpers<OurFileRouter>();

type Props = {
    onUploadComplete?: (urls: string[]) => void;
    onRemove?: (url: string) => void;
    onSetMain?: (url: string) => void;
    isMain?: boolean;
};

export default function ProductImageUploader({
    onUploadComplete,
    onRemove,
    onSetMain,
    isMain,
}: Props) {
    const { startUpload, isUploading } = useUploadThing("productImage");
    const [preview, setPreview] = useState<string | null>(null);
    const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

    const onDrop = async (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        const localPreview = URL.createObjectURL(file);
        setPreview(localPreview);

        const res = await startUpload(acceptedFiles);
        if (res) {
            const urls = res.map((r) => r.url);
            setUploadedUrl(urls[0]);
            onUploadComplete?.(urls);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div className="flex flex-col items-center gap-2">
            <div
                {...getRootProps()}
                className="relative size-40 border-2 border-dashed rounded-md flex items-center justify-center text-gray-400 text-sm cursor-pointer hover:border-secondary transition overflow-hidden"
            >
                <input {...getInputProps()} />

                {preview ? (
                    <img
                        src={preview}
                        alt="preview"
                        className="absolute inset-0 w-full h-full object-cover rounded-md"
                    />
                ) : (
                    <span className="text-lg">Arrastra o haz click</span>
                )}

                {isUploading && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-xs">
                        Subiendo...
                    </div>
                )}
            </div>

            {uploadedUrl && (
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={() => onSetMain?.(uploadedUrl)}
                        className={`px-2 py-1 text-xs rounded ${isMain ? "bg-green-500 text-white" : "bg-gray-200"}`}
                    >
                        {isMain ? "Main" : "Marcar main"}
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            if (uploadedUrl) {
                                onRemove?.(uploadedUrl);
                                setPreview(null);
                                setUploadedUrl(null);
                            }
                        }}
                        className="px-2 py-1 text-xs bg-red-200 rounded"
                    >
                        Eliminar
                    </button>
                </div>
            )}
        </div>
    );
}