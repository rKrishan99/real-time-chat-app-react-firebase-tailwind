import Details from "./components/details/Details";
import Chat from "./components/chat/Chat";
import List from "./components/list/List";
import Login from "./components/login/Login";
import Notification from "./components/notification/Notification";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useUserStore } from "./lib/userStore";
import {auth} from './lib/firebase'

function App() {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();

  useEffect(() => {

    const unSub = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User logged in:", user.uid);
        fetchUserInfo(user.uid); // Fetch user info if user is logged in
      } else {
        console.log("No user is logged in.");
        fetchUserInfo(null); // Set currentUser to null if no user is logged in
      }
    });

    return () => {
      unSub(); // Unsubscribe from the listener when the component unmounts
    };
  }, [fetchUserInfo]);

  console.log("Current User State:", currentUser);

  if (isLoading) {
    return (
      <div className="p-10 text-lg rounded-lg bg-sky-800">Loading...</div>
    );
  }


  return (
    <div
      className="w-screen h-screen bg-slate-800 bg-opacity-80 backdrop-blur-sm backdrop-saturate-50 border-2 border-neutral-800 border-opacity-40
      flex "
    >
      {currentUser === null ? (
        <>
          <h1>No User Logged In</h1> {/* Debugging: Confirm currentUser is null */}
          <Login style={{ backgroundColor: "red", height: "100vh" }} />
      
        </>
      ) : (
        <>
          <List />
          <Chat />
          <Details />
        </>
      )}
      <div className="absolute">
        <Notification />
      </div>
    </div>
  );
}

export default App;
