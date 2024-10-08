import NextAuth from "next-auth"

declare module "next-auth" {
    interface User {
        id: string
        username: string
        email: string
        role    : string
    }

    interface Session {
        user: User & {
            id: string
            username: string
            email: string
            role: string
        }
        token: {
            id: string
            username: string
            email: string
            role: string
        }
    }
}