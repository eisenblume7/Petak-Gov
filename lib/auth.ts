import {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {prisma} from "@/lib/prisma";
import {compare} from "bcryptjs";


// @ts-ignore
export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn:'/auth/signin',
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if(!credentials?.email || !credentials.password) {
                    return null
                }

                const existingUser = await prisma.pengguna.findUnique({
                    where: {email: credentials?.email}
                })
                if(!existingUser) {
                    return null;
                }

                const passwordMatch = await compare(credentials.password, existingUser.password)

                if(!passwordMatch) {
                    return null
                }

                return {
                    id: existingUser.id + '',
                    username: existingUser.name,
                    email: existingUser.email,
                    role: existingUser.role
                }
            }
        }),

    ],
    callbacks: {
        async jwt({ token, user}) {
            if(user) {
                token.role = user.role;
                return {
                    ...token,
                    username: user.username
                }
            }
            return token;
        },
        async session({ session, user, token }) {
            if (session?.user && typeof token.role === 'string' )  session.user.role= token.role;

            return {
                ...session,
                user: {
                    ...session.user,
                    username: token.username
                }

            }
        },
    },
};