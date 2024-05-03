import React from 'react'

export const Follower: React.FC<follow> = ({ Follower_count, Following_count }) => {
  return (
    <>
      <div className="flex gap-5 ml-2 py-2">
        <p className="hover:underline cursor-pointer">{Follower_count} Following</p>
        <p className="hover:underline cursor-pointer">{Following_count} Followers</p>
      </div>
    </>
  );
};
interface follow {
  Follower_count: number;
  Following_count: number
}