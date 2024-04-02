import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '../../../lib/prisma';

export default NextAuth({
    providers: [
        Providers.Credentials({
            // The name to display on the sign-in form (e.g., 'Sign in with your custom account')
            name: 'Credentials',
            credentials: {
                // Email and password fields
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });

                if (user && user.password === credentials.password) {
                    // If the credentials are valid, return the user object
                    return Promise.resolve(user);
                } else {
                    // If the credentials are invalid, return null
                    return Promise.resolve(null);
                }
            }
        })
    ],
    adapter: PrismaAdapter(prisma),
    // Add additional NextAuth configurations here
});


