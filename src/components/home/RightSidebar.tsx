"use client"
import React, { useEffect, useState } from "react";
import { UserSugg } from "./UserSugg";
import axios from "axios";
import Loading from "../loading";
import { userType } from "@/type";

export const RightSidebar = () => {
  const [users, setUsers] = useState<userType[]>([]);
  const [isLoading, setIsloading] = useState(false);
  const [isError, setIsError] = useState(false);
  const fetchUerSegg = async () => {
    try {
      setIsloading(true)
      const res = await axios.get("/api/user/alluser");
      setUsers(res.data.allUser)
    } catch (error) {
      console.log(error)
      setIsError(true)
    } finally {
      setIsloading(false)
    }
  }
  useEffect(() => {
    fetchUerSegg();
  }, [])
  return (
    <>
      <div className="h-screen border-l-2 lg:w-1/4 lg:pt-5 lg:px-2 hidden lg:block">
        <h1 className="text-2xl font-bold">Who to follow</h1>
        {isLoading && <Loading />}
        {isError && <p>something went't wrong</p>}
        {
          users.map((userSegg) => {
            return (
              <UserSugg user={userSegg} key={userSegg.id} />
            )
          })
        }
      </div>
    </>
  );
};


interface userSegg {
  name: string
  username: string
}