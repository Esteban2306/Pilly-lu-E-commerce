async function uploadFile(file: File) {
  // Pide URL firmada
  const res = await fetch("/api/upload");
  const { url, fileName } = await res.json();

  // Sube directo a GCS
  await fetch(url, {
    method: "PUT",
    body: file,
    headers: {
      "Content-Type": file.type,
    },
  });

  console.log("Subido a:", `https://storage.googleapis.com/${process.env.NEXT_PUBLIC_BUCKET}/${fileName}`);
}