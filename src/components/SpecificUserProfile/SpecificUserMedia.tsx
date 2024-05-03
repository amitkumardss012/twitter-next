"use client";
import { postType } from "@/type";
import { TwitterPost } from "../base/Post";
import Loading from "../loading";
import { useUserPost } from "./UserProfileByUserName";

export const SpecificUserMedia = ({
  params,
}: {
  params: { username: string };
}) => {
  const { postMedia, isError, isLoading } = useUserPost(
    `/api/user/${params.username}`
  );
  if (isLoading) return <Loading />;
  if (isError) return <div>Something went wrong</div>;
  return (
    <>
      <div className="mb-14">
        {Array.isArray(postMedia) && postMedia.length > 0 ? (
          postMedia.map((media: postType) => {
            return <TwitterPost post={media} key={media.id} loginUserID={media.user.id} />;
          })
        ) : (
          <div className="p-8">
            <p className="text-4xl font-semibold">
              {params.username} hasn't posted media
            </p>{" "}
            <span className="text-gray-500">
              {" "}
              Once they do, those posts will appear here.
            </span>
          </div>
        )}
      </div>
    </>
  );
};
