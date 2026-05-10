import React, { useRef, useState } from "react";
import classes from "./PasswordForm.module.css";
import { apiKey, auth } from "../../firebase/firebaseConfig";

function PasswordForm() {
  const passwordRef = useRef();
  const [message, setMessage] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    console.log(user);
    if (!user) {
      setMessage(" No user logged in");
      return;
    }

    try {
      // get the user's ID token
      const idToken = await user.getIdToken();
      const newPassword = passwordRef.current.value;

      // call Firebase REST API
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idToken,
            password: newPassword,
            returnSecureToken: false,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error.message || "Failed to update password");
      }

      setMessage("Password updated successfully");
      passwordRef.current.value = "";
    } catch (error) {
      console.error(error);
      setMessage("Failed: " + error.message);
    }
  };

  return (
    <section className={classes.auth}>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="password">New Password</label>
          <input type="password" id="password" ref={passwordRef} required />
        </div>

        <div className={classes.actions}>
          <button type="submit">Change Password</button>
        </div>

        {message && <p className={classes.message}>{message}</p>}
      </form>
    </section>
  );
}

export default PasswordForm;
