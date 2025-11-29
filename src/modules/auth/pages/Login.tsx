import img from "/instagram-login-page.webp";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import { loginUserThunk } from "../../../store/slice/user.thunk";
import Form from "../../../components/Form";
import { LoginSchema } from "../schema/schema";
import { clearButtonLoading } from "../../../store/slice/user.slice";
import { useEffect } from "react";
import Loader from "../../../components/Loader";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { buttonLoading, isAuthenticated } = useAppSelector(
    (state) => state.user
  );

  const handleSubmit = async (data: Record<string, string>) => {
    const response = await dispatch(
      loginUserThunk({
        email: data.email,
        password: data.password,
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
  }, [isAuthenticated]);

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

        {/* Right Side - Login Form */}
        <section className="w-full max-w-sm" aria-label="Login section">
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

            {/* Login Form */}
            <Form onSubmit={handleSubmit} schema={LoginSchema} />
            <button
              disabled={buttonLoading}
              type="submit"
              form="login-form"
              className={`mt-6  w-full bg-[var(--color-blue)] text-white py-2 px-4 rounded-md hover:bg-blue-700 transition cursor-pointer
                 ${buttonLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {buttonLoading ? <Loader /> : "Login"}
            </button>

            {/* Separator */}
            {/* Sign Up Section */}
            <footer className="p-4 text-center text-white">
              <p className="text-sm">
                Don't have an account?{" "}
                <Link to={"/signup"} className="text-blue-500 font-semibold">
                  Sign up
                </Link>
              </p>
            </footer>
          </article>
        </section>
      </div>
    </main>
  );
};

export default Login;
