import axios from 'axios';
import { create } from 'zustand';

interface Comments {
  id: number;
  user_id: number;
  post_id: number;
  content: string;
  comment_Count: number;
  createdAt: string;
  user: {
    id: number;
    name: string;
    username: string;
  };
}

interface UserPostType {
  post: {
    id: number;
    user_id: number;
    contet: string;
    image: string;
    comment_Count: number;
    createdAt: string;
    user: {
      id: number;
      name: string;
      username: string;
    };
    comments: Comments[];
  } | null;
  isLoading: boolean;
  isError: boolean;
  fetchPost: (postId: number) => Promise<void>;
}

export const useGetSpecificPost = create<UserPostType>((set) => ({
  post: null,
  isLoading: false,
  isError: false,
  fetchPost: async (postId: number) => {
    try {
      set({ isLoading: true, isError: false });
      const url = `http://localhost:3000/api/post/${postId}`;
      const res = await axios.get(url);
      if (res.data.success) {
        set({ post: res.data.postByID, isLoading: false });
      } else {
        set({ isError: true });
      }
    } catch (error) {
      console.log("Error fetching data: ", error);
      set({ isError: true });
    }
  },
}));
