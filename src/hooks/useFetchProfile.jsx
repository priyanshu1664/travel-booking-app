import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";

import { setUser } from "../store/userSlice";
import { auth, db } from "../firebase/firebaseConfig";

const useFetchProfile = () => {
  const [userData, setUserData] = useState({
    profileUrl: "",
    username: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setError("No user is logged in");
        setLoading(false);
        return;
      }

      try {
        const userRef = doc(db, "users", currentUser.uid);

        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          const data = docSnap.data();

          setUserData(data);

          dispatch(setUser(data));
        } else {
          const defaultData = {
            username: "",
            email: currentUser.email || "",
            phone: "",
            profileUrl: "",
          };

          setUserData(defaultData);

          dispatch(setUser(defaultData));
        }
      } catch (err) {
        console.log(err);

        setError("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return {
    userData,
    setUserData,
    loading,
    error,
  };
};

export default useFetchProfile;
