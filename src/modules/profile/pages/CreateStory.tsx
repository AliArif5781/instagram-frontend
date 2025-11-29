import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Form from "../../../components/Form";
import { createPostSchema } from "../schema/schema";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import { createStoryThunk } from "../../../store/postSlice/post.thunk";
import { authenticator } from "../../../utils/Authenticator";
import { IKUpload } from "imagekitio-react";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader";

const CreateStory = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [localError, setLocalError] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { loading } = useAppSelector((state) => state.post);

  const handleStorySubmit = async (data: Record<string, string>) => {
    console.log("object");
    setLocalError(""); // reset old error first

    if (!profileImageUrl) {
      setLocalError("Please upload an image first");
      return;
    }

    if (!data.caption || data.caption.trim().length === 0) {
      setLocalError("Caption cannot be empty");
      return;
    }

    await dispatch(
      createStoryThunk({
        imageUrl: profileImageUrl,
        caption: data.caption,
      })
    );

    setProfileImageUrl("");
    setLocalError("");
    navigate(-1);
  };

  const imageSrc = profileImageUrl || "";

  return (
    <section className="grid grid-cols-12 md:gap-5 p-5 text-white">
      {/* LEFT SIDE IMAGE */}
      <div className="grid col-span-6 mx-auto">
        <div className="overflow-hidden">
          {profileImageUrl ? (
            <>
              {" "}
              <img
                src={profileImageUrl}
                alt="Story Preview"
                className="w-[20rem] h-[20rem] object-cover cursor-pointer hover:scale-105 transition-all duration-300 rounded-xl"
                onClick={() => setIsOpen(true)}
              />
              <span className=" absolute text-[var(--color-dark-gray)] text-xs mt-0.5 animate-pulse">
                Click the image to preview
              </span>
            </>
          ) : (
            <div className="text-gray-400 text-lg font-medium  h-full w-full flex items-center animate-pulse">
              Upload story to see here
            </div>
          )}
        </div>
      </div>

      {/* RIGHT SIDE FORM */}
      <div className="col-span-6 space-y-5 mx-auto">
        <Form schema={createPostSchema} onSubmit={handleStorySubmit} />

        <div className="mt-4 flex flex-col items-center gap-2 ">
          <IKUpload
            fileName="story.jpg"
            onSuccess={(res: any) => setProfileImageUrl(res.url)}
            onError={(err: any) => console.error("Upload failed:", err)}
            authenticator={authenticator}
            className="border border-gray-700 border-dashed text-white px-3 py-2 rounded cursor-pointer hover:border-[var(--color-dark-gray)] transition-all duration-200"
          />
        </div>

        {localError && (
          <div className="p-3 bg-red-800 font-semibold outline-none rounded-lg">
            <p className="text-[var(--color-lighter-gray)] text-sm">
              {localError}
            </p>
          </div>
        )}

        <button
          type="submit"
          form="login-form"
          disabled={loading.createStoryLoading}
          className={`mt-6 py-2 px-4 rounded-md transition cursor-pointer bg-[var(--color-blue)] text-white hover:bg-blue-700 flex items-center justify-center ${
            loading.createStoryLoading ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {loading.createStoryLoading ? <Loader /> : "Add Story"}
        </button>
      </div>

      {/* IMAGE PREVIEW MODAL */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{
                duration: 0.4,
                ease: "easeInOut",
              }}
              onClick={(e) => e.stopPropagation()} // Prevent modal close on image click
              className="rounded-xl overflow-hidden shadow-2xl"
            >
              <img
                src={imageSrc}
                alt="Preview"
                className="object-cover w-[45rem] h-[30rem] rounded-xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CreateStory;
