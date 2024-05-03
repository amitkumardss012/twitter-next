import z from "zod"

export const registerSchema = z.object({
    name: z.string().min(3).max(50),
    email: z.string().email(),
    username: z.string().min(3).max(50),
    password: z.string().min(6),
})

