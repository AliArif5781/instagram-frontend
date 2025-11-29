import {
  BadgeCheck,
  Bookmark,
  Ellipsis,
  Heart,
  MessageCircle,
  Share,
} from "lucide-react";
import { useState } from "react";
import Form from "../../../components/Form";
import { createPostSchema } from "../schema/schema";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import { createPostThunk } from "../../../store/postSlice/post.thunk";
import { IKUpload } from "imagekitio-react";
import { authenticator } from "../../../utils/Authenticator";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader";

const CreatePost = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { userProfile, buttonLoading } = useAppSelector((state) => state.user);

  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(1254);
  const [isSaved, setIsSaved] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [mediaType, setMediaType] = useState<"image" | "video" | null>(null);
  const [localError, setLocalError] = useState("");
  const [isUploading, setIsUploading] = useState(false); // New loading state
  const [isSubmitting, setIsSubmitting] = useState(false);

  const postData = {
    author: {
      username: "privee_.jutt",
      location: "USA, California",
      avatar: "https://ik.imagekit.io/sv6rjk3rj/profile_RfLX57D4l.jpg",
    },
    image:
      "https://images.unsplash.com/photo-1579546929662-711aa81148cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    likes: 1254,
    comments: [
      { id: 1, user: "john_doe", text: "Amazing shot! 🔥", time: "2h" },
      { id: 2, user: "sarah_m", text: "Wish I was there! 😍", time: "1h" },
      {
        id: 3,
        user: "travel_lover",
        text: "Which beach is this?",
        time: "45m",
      },
    ],
    timestamp: "1 min",
  };

  // Function to generate optimized URL and log optimization status
  const getOptimizedUrl = (url: string, type: "image" | "video" | null) => {
    if (!url || !type) return url;
    const baseUrl = url.split("?")[0];

    let optimizedUrl;
    if (type === "image") {
      optimizedUrl = `${baseUrl}?tr=f-webp,q-80,pr`;
    } else {
      optimizedUrl = `${baseUrl}?tr=q-70`;
    }

    return optimizedUrl;
  };

  const handleLike = () => {
    if (isLiked) {
      setLikesCount((prev) => prev - 1);
    } else {
      setLikesCount((prev) => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleSubmit = async (data: Record<string, string>) => {
    if (isSubmitting || buttonLoading) return;
    setLocalError("");

    if (!imageUrl) {
      setLocalError("Please upload an image or video first");
      return;
    }

    if (!mediaType || !["image", "video"].includes(mediaType)) {
      setLocalError("Invalid media type");
      return;
    }

    if (!data.caption || data.caption.trim().length === 0) {
      setLocalError("Caption cannot be empty");
      return;
    }
    try {
      setIsSubmitting(true);

      await dispatch(
        createPostThunk({
          imageUrl,
          caption: data.caption.trim(),
          mediaType,
        })
      ).unwrap();

      // Reset form on success
      setImageUrl("");
      setMediaType(null);
      setLocalError("");
      navigate("/profile");
    } catch (error) {
      console.error("Failed to create post:", error);
      setLocalError("Failed to create post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-12 md:gap-5 p-5">
      <div className=" col-span-12 lg:col-span-6">
        <div className="max-w-xl mx-auto text-white rounded-lg border border-gray-800 shadow-lg">
          <header className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <img
                src={userProfile?.profileImage}
                alt="author"
                className="h-10 w-10 rounded-full object-cover"
              />
              <div className="w-full">
                <div className="flex items-center text-[#F5F5F5] font-semibold text-sm">
                  {userProfile?.username}
                  <BadgeCheck className="w-4 h-4 text-blue-400 mx-1.5" />
                  <div className="ml-2 text-[#A8A8A8] text-xs flex items-center">
                    <span className="font-extrabold mr-[0.8px]">·</span>
                    <span className="font-medium">{postData.timestamp}</span>
                  </div>
                </div>
                <span className="block text-xs py-1 font-semibold text-gray-400">
                  {userProfile?.location || ""}
                </span>
              </div>
            </div>
            <button className="p-2 hover:bg-gray-800 rounded-full">
              <Ellipsis size={20} />
            </button>
          </header>

          <div className="w-full">
            {isUploading ? (
              <div className="flex justify-center items-center w-full h-[30rem]">
                <Loader />
              </div>
            ) : imageUrl ? (
              mediaType === "image" ? (
                <img
                  src={getOptimizedUrl(imageUrl, mediaType)}
                  alt="post"
                  className="w-full h-[30rem] object-cover"
                  loading="lazy"
                />
              ) : (
                <video
                  src={getOptimizedUrl(imageUrl, mediaType)}
                  controls
                  className="w-full h-[20rem] object-contain"
                />
              )
            ) : (
              <div className="flex items-center w-full h-[30rem] object-cover">
                <h1 className="text-5xl px-5 font-semibold text-[var(--color-lighterr-gray)] animate-pulse">
                  Upload an image or video to preview here
                </h1>
              </div>
            )}
          </div>

          <div className="p-4">
            <div className="flex justify-between items-center mb-3">
              <div className="flex gap-4">
                <button
                  onClick={handleLike}
                  className={`p-1 transition-all duration-200 ${
                    isLiked ? "text-red-500 scale-110" : "text-white"
                  }`}
                >
                  <Heart size={24} fill={isLiked ? "currentColor" : "none"} />
                </button>
                <button className="p-1 hover:text-gray-400 transition-colors">
                  <MessageCircle size={24} />
                </button>
                <button className="p-1 hover:text-gray-400 transition-colors">
                  <Share size={24} />
                </button>
              </div>
              <button
                onClick={handleSave}
                className={`p-1 transition-all duration-200 ${
                  isSaved ? "text-yellow-400" : "text-white"
                }`}
              >
                <Bookmark size={24} fill={isSaved ? "currentColor" : "none"} />
              </button>
            </div>

            <div className="mb-2">
              <span className="font-semibold text-sm">
                {likesCount.toLocaleString()} likes
              </span>
            </div>

            <div className="mb-2">
              <span className="font-semibold text-sm mr-2">
                {postData.author.username}
              </span>
            </div>

            {postData.comments.length > 0 && (
              <button
                onClick={() => setShowComments(!showComments)}
                className="text-gray-400 text-sm mb-2 hover:text-gray-300"
              >
                {showComments ? "Hide" : "View"} all {postData.comments.length}{" "}
                comments
              </button>
            )}

            {showComments && (
              <div className="space-y-3 mb-3">
                {postData.comments.map((comment) => (
                  <div key={comment.id} className="flex items-start gap-2">
                    <span className="font-semibold text-sm">
                      {comment.user}
                    </span>
                    <span className="text-sm flex-1">{comment.text}</span>
                    <span className="text-gray-400 text-xs">
                      {comment.time}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="pt-7 md:pt-0 col-span-12 lg:col-span-6 space-y-5">
        {localError && (
          <div className="p-3 bg-red-800 font-semibold border rounded-lg">
            <p className="text-red-200 text-sm">{localError}</p>
          </div>
        )}

        <Form schema={createPostSchema} onSubmit={handleSubmit} />

        <div className="mt-4 flex flex-col items-center gap-2">
          <IKUpload
            accept="image/*,video/*"
            fileName="post-media"
            validateFile={(file: File) => {
              const fileSize = file.size / 1024 / 1024;
              console.log(
                `File selected: ${file.name}, Size: ${fileSize.toFixed(2)} MB`
              );
              if (fileSize > 10) {
                setLocalError(
                  `File size too large: ${fileSize.toFixed(
                    2
                  )} MB. Maximum allowed is 10MB`
                );
                setIsUploading(false);
                return false;
              }
              setIsUploading(true);
              return true;
              // return file.size < 10 * 1024 * 1024; // 10MB limit
            }}
            onSuccess={(res: any) => {
              console.log(res, "RES== createPost ===");
              const extension =
                res.name.split(".").pop()?.toLowerCase() || "unknown";
              const sizeMB = (res.size / 1024 / 1024).toFixed(2); // Convert bytes to MB
              console.log("ImageKit upload success:", {
                url: res.url,
                fileName: res.name,
                extension,
                size: `${sizeMB} MB`,
                fileType: res.fileType,
                thumbnails: res.thumbnailUrl,
              });
              setImageUrl(res.url);
              setMediaType(res.fileType === "image" ? "image" : "video");
              setIsUploading(false);
              setLocalError("");
            }}
            onError={(err: any) => {
              console.error("Upload failed:", err);
              setLocalError("Failed to upload media. Please try again.");
              setIsUploading(false);
            }}
            authenticator={authenticator}
            className="border border-gray-700 border-dashed text-white px-3 py-2 rounded cursor-pointer"
          />

          {imageUrl && (
            <div className="text-center">
              {mediaType === "image" ? (
                <img
                  src={getOptimizedUrl(imageUrl, mediaType)}
                  alt="preview"
                  className="w-20 h-20 rounded-lg object-cover mt-2 mx-auto"
                  loading="lazy"
                />
              ) : (
                <video
                  src={getOptimizedUrl(imageUrl, mediaType)}
                  controls
                  className="w-20 h-20 rounded-lg object-cover mt-2 mx-auto"
                />
              )}
              <p className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                ✓ Media uploaded successfully!
              </p>
            </div>
          )}
        </div>

        <button
          type="submit"
          form="login-form"
          className={`mt-6 py-2 px-4 rounded-md transition  ${
            isSubmitting || buttonLoading || !imageUrl
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-[var(--color-blue)] hover:bg-blue-700 cursor-pointer"
          } text-white`}
          disabled={isSubmitting || buttonLoading || !imageUrl}
        >
          {isSubmitting || buttonLoading ? <Loader /> : "Create Post"}
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
