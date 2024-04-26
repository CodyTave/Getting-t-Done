import { useState, useEffect } from "react";

export const useFileInput = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result as string);
      };
      fileReader.readAsDataURL(file);
    } else {
      setPreviewUrl(null); // Clear preview if no file is selected
    }
  }, [file]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile =
      event.target.files && event.target.files[0]
        ? event.target.files[0]
        : null;
    setFile(selectedFile);
  };
  const handleImageDisplay = (url: string) => {
    setPreviewUrl(url);
  };

  return {
    file,
    previewUrl,
    bind: {
      onChange: handleFileChange,
      reset: () => {
        setFile(null);
        setPreviewUrl(null);
      },
      display: (url: string) => handleImageDisplay(url),
    },
  };
};
