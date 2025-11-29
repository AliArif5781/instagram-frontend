import { useRoutes } from "react-router";
import { routes } from "./routes/index";
import { useEffect } from "react";
import { useAppDispatch } from "./store/hook";
import { getUserProfileThunk } from "./store/slice/user.thunk";

const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    (async () => {
      await dispatch(getUserProfileThunk());
    })();
  }, []);

  const element = useRoutes(routes);
  return element;
};

export default App;
