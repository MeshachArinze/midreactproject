import { useEffect } from "react";
import PropTypes from "prop-types";
import Header from "../components/header";
import Timeline from "../components/timeline";
import Sidebar from "../components/sidebar";
import useUser from "../hooks/use-user";
import LoggedInUserContext from "../context/logged-in-user";

// eslint-disable-next-line react/prop-types
export default function Dashboard(user) {

 
  // eslint-disable-next-line react/prop-types
  const { users, setActiveUsers } = useUser(user.uid);
  useEffect(() => {
    document.title = "Instagram";
  }, []);

  return (
    <LoggedInUserContext.Provider value={{ users, setActiveUsers }}>
      <div className="bg-gray-background">
        <Header />
        <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
          <Timeline />
          <Sidebar />
        </div>
      </div>
    </LoggedInUserContext.Provider>
  );
}

Dashboard.propTypes = {
  user: PropTypes.any,
};
