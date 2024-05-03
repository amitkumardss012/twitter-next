import { postType } from "@/type";
import axios from "axios";
import { useEffect, useState } from "react";

export const useAPI = (url: string) => {
  const [loginUserID, setLoginUserId] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [feedPost, setFeedPost] = useState<postType[]>([])
  const [userPost, setUserPost] = useState<postType[]>([])
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        const response = await axios.get(url);
        setLoginUserId(response.data.loginUserID);
        setFeedPost(response.data.post)
        setUserPost(response.data.userPosts)
      } catch (err) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { loginUserID, isLoading, isError,feedPost, userPost };
};
