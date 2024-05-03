import axios from "axios";
import create from "zustand";

interface Comments{
  id: number;
  user_id: number;
  post_id: number;
  contet: string;
  comment_Count: number;
  createdAt: string;
  user: {
    id: number;
    name: string;
    username: string
  }
}

interface userPostsType {
  posts: {
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
    comments: Comments;
  }[];
  isLoading: boolean;
  isError: boolean;
  fetchPosts: (url: string) => Promise<void>;
}

export const useGetUserePosts = create<userPostsType>((set) => ({
  posts: [],
  isLoading: false,
  isError: false,
  fetchPosts: async (url: string) => {
    try {
      set({ isLoading: true, isError: false });
      const res = await axios.get(url);
      if (res.data) {
        set({ posts: res.data.userPosts, isLoading: false });
      }
    } catch (error) {
      console.log("Error fetching data: ", error);
      set({ isError: true });
    }
  },
}));



export const useGetPosts = create<userPostsType>((set) => ({
  posts: [],
  isLoading: false,
  isError: false,
  fetchPosts: async (url: string) => {
    try {
      set({ isLoading: true, isError: false });
      const res = await axios.get(url);
      if (res.data) {
        set({ posts: res.data.post, isLoading: false });
      }
    } catch (error) {
      console.log("Error fetching data: ", error);
      set({ isError: true });
    }
  },
}));


export const useGetSpecificPosts = create<userPostsType>((set) => ({
  posts: [],
  isLoading: false,
  isError: false,
  fetchPosts: async (url: string) => {
    try {
      set({ isLoading: true, isError: false });
      const res = await axios.get(url);
      if (res.data) {
        console.log(res.data)
        set({ posts: res.data.postByID, isLoading: false });
      }
    } catch (error) {
      console.log("Error fetching data: ", error);
      set({ isError: true });
    }
  },
}));



