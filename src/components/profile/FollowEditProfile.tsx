import { userType } from "@/type";
import axios from "axios";
import React, { useEffect, useState } from "react";

export const FollowEditProfile = ({
  user,
  loginUserID,
}: {
  user: userType;
  loginUserID: number;
}) => {
  const isAuth = user.id === loginUserID
  return (
    <>
      {isAuth ? <EditProfileButton buttonName="Edit profile" /> : <Follow user={user} loginUserID={loginUserID} />}
    </>
  );
};




export const EditProfileButton = ({ buttonName }: { buttonName: string }) => {
  return (
    <>
      <div className="border-b-[1x] border-neutral-500 pb-4">
        <div className="flex justify-end p-2">
          <button
            className="w-28 h-8 rounded-full font-bold"
            style={{ border: "1px solid grey" }}
          >
            {buttonName}
          </button>
        </div>
      </div>
    </>
  )
}



export const Follow = ({ user, loginUserID, }: { user: userType, loginUserID: number; }) => {
  const [follow, setFollow] = useState(() => {
    // Initialize follow state from localStorage if available
    const storedFollow = localStorage.getItem(`follow_${user.id}`);
    return storedFollow ? JSON.parse(storedFollow) : false;
  });

  useEffect(() => {
    // Save follow state to localStorage whenever it changes
    localStorage.setItem(`follow_${user.id}`, JSON.stringify(follow));
  }, [follow, user.id]);

  const buttonText = follow ? "Following" : "Follow";

  const handleFollow = async () => {
    try {
      const res = await axios.post("/api/user/follow", {
        targerUser_id: user.id,
        followerID: loginUserID
      });
      if (res.data.message === "Followed Successfully!") {
        setFollow(true);
      } else {
        setFollow(false);
      }
      console.log(res.data);
    } catch (error) {
      // Handle error
    }
  };

  return (
    <>
      <div className="border-b-[1x] border-neutral-500 pb-4">
        <div className="flex justify-end p-2">
          <button
            className={`w-28 h-8 rounded-full font-bold ${follow ? "" : "bg-black text-white"}`}
            style={{ border: "1px solid grey" }}
            onClick={handleFollow}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </>
  )
}

