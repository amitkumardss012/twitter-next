import { create } from "zustand";

interface replyToUserState {
    isActive: boolean
    setIsActive: () => void
}

export const useReplyToUser = create<replyToUserState>((set) => ({
    isActive: false,
    setIsActive: () => {
        set(() => ({
            isActive: true,
        }))
    }
}))


