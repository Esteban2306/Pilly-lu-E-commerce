import { NextResponse } from "next/server";
import { Storage } from "@google-cloud/storage";

const storage = new Storage({
  projectId: process.env.GCP_PROJECT_ID,
  credentials: {
    client_email: process.env.GCP_CLIENT_EMAIL,
    private_key: process.env.GCP_PRIVATE_KEY?.replace(/\\n/g, "\n"), // importante
  },
});

const bucket = storage.bucket(process.env.GCP_BUCKET_NAME!);

export async function GET() {
  try {
    // Nombre único para el archivo
    const fileName = `uploads/${Date.now()}.jpg`; // puedes cambiar extensión
    const file = bucket.file(fileName);

    // Generar signed URL para subir
    const [signedUrl] = await file.getSignedUrl({
      version: "v4",
      action: "write",
      expires: Date.now() + 60 * 60 * 10000, // válido 1 hora
      contentType: "image/jpeg",
    });

    // Construir URL pública (requiere que el bucket tenga public access)
    const publicUrl = `https://storage.googleapis.com/${process.env.GCP_BUCKET_NAME}/${fileName}`;

    return NextResponse.json({
      signedUrl,
      fileName,
      publicUrl,
    });
  } catch (error: unknown) {
    console.error("Error generando Signed URL:", error);
    return NextResponse.json(
      { error: "No se pudo generar el Signed URL" },
      { status: 500 }
    );
  }
}
