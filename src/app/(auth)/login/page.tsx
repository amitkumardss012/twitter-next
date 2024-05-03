"use client";
import React, { useState } from "react";
import twitter from "../../../../public/images/logo.png";
import Google from "../../../../public/images/google.png";
import Image from "next/image";
import { AuthStateType } from "@/type";
import axios from "axios";
import { useRouter } from "next/navigation";
import "../auth.css";
import Link from "next/link";

const Login = () => {
  const [authState, setAuthState] = useState<AuthStateType>({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const loginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log("first");
    try {
      const res = await axios.post("/api/auth/login", authState);
      console.log(res);
      router.push("/home");
    } catch (error: any) {
      console.log(error);
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="loginContainer">
        <div className="loginBox">
          <Image src={twitter} alt="" className="logo" />
          <h2>Sign in to X</h2>
          <button className="loginToGoogle">
            <Image src={Google} alt="" className="w-5 mr-5" /> Sign in with
            Google
          </button>
          <p className="invisibleText">
            ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ
          </p>
          <span className="or">or</span>
          <form action="" onSubmit={loginSubmit}>
            <input
              type="text"
              placeholder="Username"
              onChange={(e) =>
                setAuthState({ ...authState, username: e.target.value })
              }
              autoComplete="email"
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) =>
                setAuthState({ ...authState, password: e.target.value })
              }
              autoComplete="current-password"
            />
            <p className="text-red-500 font-extrabold text-[10px]">{error}</p>
            <button className="loginBtn">{loading ? "Loading..." : "Login"}</button>
          </form>
          <button className="forgotPassword">Forgot Password</button>
          <p className="doNotHaveAccount">
            Don&apos;t have an accout?{" "}
            <Link href="/signup">
              <span className="text-blue-600 hover:underline">Sign Up</span>{" "}
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
