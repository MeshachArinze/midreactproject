/* eslint-disable no-undef */
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes, redirect } from "react-router-dom";
import Loader from "./components/loader";
import * as ROUTES from "./constant/routes";
import UserContext from "./context/user";
import useAuthListener from "./hooks/use-auth-listener";

// import ProtectedRoute from "./helpers/protected-route";

const Login = lazy(() => import("./pages/login"));
const SignUp = lazy(() => import("./pages/sign-up"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const Profile = lazy(() => import("./pages/profile"));
const NotFound = lazy(() => import("./pages/not-found"));

export default function App() {
  const { user } = useAuthListener();

  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
            <Route path={ROUTES.PROFILE}  element={<Profile />} />
            <Route
              user={user}
              path={ROUTES.DASHBOARD}
              element={<Dashboard />}
              loader={async () => {
                const user = await fake.getUser();

                if(!user) throw redirect(ROUTES.LOGIN)
              }}
            />
            <Route element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}
