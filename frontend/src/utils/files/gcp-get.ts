export async function uploadFile(file: File) {
  const res = await fetch("/api/upload");
  const { url, fileName } = await res.json();

  await fetch(url, {
    method: "PUT",
    body: file,
    headers: {
      "Content-Type": file.type,
    },
  });

  console.log("Subido a:", `https://storage.googleapis.com/${process.env.NEXT_PUBLIC_BUCKET}/${fileName}`);
}