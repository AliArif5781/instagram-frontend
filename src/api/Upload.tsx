import { useState } from "react";
import { IKUpload } from "imagekitio-react";
import { api } from "../api/axios";

const Upload = () => {
  const [fileUrl, setFileUrl] = useState("");

  const onSuccess = async (res: any) => {
    console.log("Uploaded:", res);
    setFileUrl(res.url);

    // ✅ Send file URL to backend
    try {
      await api.post("/api/posts", {
        title: "My first post",
        media: res.url,
      });
      console.log("Post saved to DB");
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  const onError = (err: any) => {
    console.error("Upload failed:", err);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <IKUpload
        fileName="upload-file.jpg"
        onError={onError}
        onSuccess={onSuccess}
      />

      {fileUrl && (
        <img
          src={fileUrl}
          alt="preview"
          className="mt-4 w-48 rounded-lg shadow-lg"
        />
      )}
    </div>
  );
};

export default Upload;
