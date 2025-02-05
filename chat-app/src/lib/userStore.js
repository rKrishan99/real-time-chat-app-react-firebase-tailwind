import { doc, getDoc } from "firebase/firestore";
import { create } from "zustand";
import { db } from "./firebase";

export const useUserStore = create((set) => ({
  currentUser: null,
  isLoading: true,
  fetchUserInfo: async (uid) => {

    console.log("Fetching user info for UID:", uid); // Debugging: Log the UID
    
    // If no uid is provided, set currentUser to null and stop further execution
    if (!uid) {
      console.log("No UID provided. Setting currentUser to null.");
      return set({ currentUser: null, isLoading: false });
    }

    try {
      // Fetch user data from Firestore
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("User data fetched successfully:", docSnap.data());
        set({ currentUser: docSnap.data(), isLoading: false });
      } else {
        console.log("No user data found for UID:", uid);
        set({ currentUser: null, isLoading: false });
      }
    } catch (err) {
      console.error("Error fetching user info:", err);
      set({ currentUser: null, isLoading: false });
    }
  },
}));
