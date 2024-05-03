import axios from "axios";
import create from "zustand";

interface UserDetails {
  name: string;
  username: string;
  createdAt: string;
}

interface useGetUserDetailsType {
  data: UserDetails | null;
  isError: boolean;
  fetchData: (url: string) => Promise<void>;
}

export const useGetUserDetails = create<useGetUserDetailsType>((set) => ({
  data: null,
  isError: false,
  fetchData: async (url: string) => {
    try {
      const res = await axios.get(url)
      if (res.data) {
        set({data: res.data.userDetails})
      }
    } catch (error) {
      console.log(error)
      set({isError: true})
    }
  }
}))
