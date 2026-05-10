import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import styles from "./AuthForm.module.css";
import { setIsLogin, setUser, setUserToken } from "../../store/userSlice";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";

function AuthForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, token, isLogin } = useSelector((s) => s.user);
  const [isLoading, setIsLoading] = useState(false);
  // console.log("isLogin", isLogin);
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [user]);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      let userCredential;

      if (isLogin) {
        userCredential = await signInWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );
      } else {
        userCredential = await createUserWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );
      }

      const user = userCredential.user;

      dispatch(setUserToken(await user.getIdToken()));
      dispatch(
        setUser({
          uid: user.uid,
          email: user.email,
          token: await user.getIdToken(),
        })
      );

      console.log("Firebase User:", user);

      navigate("/");
      reset();
    } catch (err) {
      console.log(err);
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`bg-gradient-to-b from-teal-600  to-amber-100 ${styles.authContainer}`}
    >
      <section className={styles.auth}>
        <h2>{isLogin ? "Login" : "Signup"}</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.control}>
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email",
                },
              })}
            />
            <small className="text-red-600">{errors.email?.message}</small>
          </div>

          <div className={styles.control}>
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Min 6 characters",
                },
              })}
            />
            <small className="text-red-600">{errors.password?.message}</small>
          </div>

          {!isLogin && (
            <div className={styles.control}>
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm password"
                {...register("confirmPassword", {
                  required: "Confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />
              <small className="text-red-600">
                {errors.confirmPassword?.message}
              </small>
            </div>
          )}

          <div className={styles.actions}>
            {!isLoading && (
              <button type="submit">{isLogin ? "Login" : "Signup"}</button>
            )}
            {isLoading && <p>Sending Data...</p>}
            <p className={styles.toggle}>
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <span onClick={() => dispatch(setIsLogin(!isLogin))}>
                {isLogin ? "Signup" : "Login"}
              </span>
            </p>
          </div>
        </form>
      </section>
    </div>
  );
}

export default AuthForm;
