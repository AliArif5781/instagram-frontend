import img from "/instagram-login-page.webp";
import Form from "../../../components/Form";
import { Link, useNavigate } from "react-router-dom";
import { signupSchema } from "../schema/schema";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import { signupUserThunk } from "../../../store/slice/user.thunk";
import { useEffect, useState } from "react";
import { clearButtonLoading } from "../../../store/slice/user.slice";
import { IKUpload } from "imagekitio-react";
import Loader from "../../../components/Loader";

const Signup = () => {
  const { buttonLoading, isAuthenticated } = useAppSelector(
    (state) => state.user
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // ✅ store uploaded profile image URL
  const [profileImageUrl, setProfileImageUrl] = useState("");

  // ! change this to axios
  const authenticator = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/imagekit/auth"
      );
      const data = await response.json();
      return data; // must return { token, expire, signature }
    } catch (err) {
      console.error("ImageKit auth failed:", err);
    }
  };

  const handleSubmit = async (data: Record<string, string | File>) => {
    const response = await dispatch(
      signupUserThunk({
        fullName: data.fullName as string,
        username: data.username as string,
        email: data.email as string,
        password: data.password as string,
        profileImage: profileImageUrl, // ✅ include uploaded URL
      })
    );

    if (response.payload.success) {
      navigate("/");
    }
  };

  useEffect(() => {
    return () => {
      dispatch(clearButtonLoading());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  return (
    <main className="min-h-dvh  flex justify-center items-center px-4 py-8">
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-6xl w-full">
        {/* Left Side - Phone Image */}
        <aside
          className="hidden md:block md:w-1/2 lg:w-3/5"
          aria-label="App preview"
        >
          <figure>
            <img
              src={img}
              alt="Instagram app preview showing mobile interface"
              className="w-full max-w-lg mx-auto"
            />
          </figure>
        </aside>

        {/* Right Side - Signup Form */}
        <section className="w-full max-w-sm" aria-label="Signup section">
          <article className="p-8 mb-4">
            {/* Instagram Logo */}
            <header className="flex justify-center mb-8" role="banner">
              <h1>
                <svg
                  aria-label="Instagram"
                  fill="currentColor"
                  height="48"
                  role="img"
                  viewBox="0 0 448 512"
                  width="48"
                  className="text-white"
                  focusable="false"
                >
                  <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                </svg>
              </h1>
            </header>

            {/* Signup Form Fields */}
            <Form onSubmit={handleSubmit} schema={signupSchema} />

            {/* ✅ Profile Image Upload */}
            <div className="mt-4 flex flex-col items-center gap-2 ">
              <IKUpload
                fileName="profile.jpg"
                onSuccess={(res: any) => setProfileImageUrl(res.url)}
                onError={(err: any) => console.error("Upload failed:", err)}
                authenticator={authenticator}
                className="border border-gray-700 border-dashed text-white px-3 py-2 rounded cursor-pointer"
              />

              {profileImageUrl && (
                <img
                  src={profileImageUrl}
                  alt="preview"
                  className="w-20 h-20 rounded-full object-cover mt-2"
                />
              )}
            </div>

            {/* Submit Button */}
            <button
              disabled={buttonLoading}
              type="submit"
              form="login-form"
              className={`mt-6 w-full bg-[var(--color-blue)] text-white py-2 px-4 rounded-md hover:bg-blue-700 transition cursor-pointer
                 ${buttonLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {buttonLoading ? (
                <span className="flex items-center justify-center">
                  <Loader />
                </span>
              ) : (
                "Sign up"
              )}
            </button>

            {/* Login Redirect */}
            <div className="p-4 text-center text-white mt-2">
              <p className="text-sm">
                Already have an account?{" "}
                <Link to={"/login"} className="text-blue-500 font-semibold">
                  Login
                </Link>
              </p>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
};

export default Signup;
