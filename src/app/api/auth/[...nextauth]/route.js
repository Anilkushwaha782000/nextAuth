import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '@/app/models/user';
import connectToDatabase from '@/app/utils/databaseconnection';
import bcrypt from 'bcryptjs';
connectToDatabase()
const  handler=NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'Email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await connectToDatabase();
        const user = await User.findOne({ email: credentials.email });
        if (!user) {
          throw new Error('No user found with this email');
        }
        const adminEmail = 'admin@gmail.com';
        if (credentials.email === adminEmail && user.role !== 'admin') {
          user.role = 'admin';
          await user.save(); 
        }
        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordValid) {
          throw new Error('Invalid password');
        }
        return {
          id: user._id,
          email: user.email,
          name: user.username,
          role:user.role,
        };
      }
    })
  ],
   callbacks:{
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.username||user.name;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          name: token.name,
          email: token.email,
          role: token.role||"user", 
        };
      }
      return session;
    },
    async signIn({user,account,profile,email,credentials}){
      return true;
    }
   },
   session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
})

export {handler as GET, handler as POST}