"use client";
import React, { useState } from "react";
import twitter from "../../../../public/images/logo.png";
import Image from "next/image";
import { AuthStateType, authErrorType } from "@/type";
import axios from "axios";
import { useRouter } from "next/navigation";
import "../auth.css";
import Link from "next/link";

const SignUp = () => {
  const [authState, setAuthState] = useState<AuthStateType>({
    name: "",
    email: "",
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [loginError, setLoginError] = useState<string>("");
  const [data, setData] = useState([]);
  const router = useRouter();

  const SignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/register", authState);
      console.log(res.data);
      if (res.data.success) {
        router.push("/");
      }
    } catch (error: any) {
      console.log(error);
      setError(error.response.data.errors);
      setLoginError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full bg-[#262a2f] h-full flex justify-center items-center">
        <div className="loginBox">
          <Image src={twitter} alt="" className="logo" />
          <h2>Create your account</h2>
          <p className="invisibleText">
            ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ
          </p>
          <span className="or">or</span>
          <form action="" onSubmit={SignUpSubmit}>
            <input
              type="text"
              placeholder="Name"
              onChange={(e) =>
                setAuthState({ ...authState, name: e.target.value })
              }
              autoComplete="name"
            />
            <input
              type="email"
              placeholder="Email, Phone"
              onChange={(e) =>
                setAuthState({ ...authState, email: e.target.value })
              }
              autoComplete="email"
            />
            <input
              type="text"
              placeholder="Username"
              onChange={(e) =>
                setAuthState({ ...authState, username: e.target.value })
              }
              autoComplete="usename"
            />
            <input
              type="text"
              placeholder="Password"
              onChange={(e) =>
                setAuthState({ ...authState, password: e.target.value })
              }
              autoComplete="current-password"
            />
            <p className="text-red-500 font-extrabold text-[10px]">
              {error?.length > 0 && error[0]}
            </p>
            <p className="text-red-500 font-extrabold text-[10px]">
              {loginError?.length > 0 && loginError}
            </p>
            <button className="signUpBtn">{loading ? "Loading..." : "Sign Up"}</button>
          </form>
          <p className="doNotHaveAccount">
            Alread have account{" "}
            <Link href="/login">
              <span className="cursor-pointer text-blue-600 hover:underline">Sign Up</span>{" "}
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
