"use client";

import { uploadFiles } from "@/services/api";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form action={uploadFiles}>
        <input name="image" type="file" />
        <button type="submit">Upload</button>
      </form>
    </main>
  );
}
