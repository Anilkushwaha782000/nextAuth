import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '@/app/models/user';
import connectToDatabase from '@/app/utils/databaseconnection';
import bcrypt from 'bcryptjs';
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
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        
        await connectToDatabase();
        
       
        const user = await User.findOne({ email: credentials.email });
        if (!user) {
          throw new Error('No user found with this email');
        }
        const isValidPassword = await bcrypt.compare(credentials.password, user.password); 
        if (!isValidPassword) {
          throw new Error('Invalid credentials');
        }

        
        return { id: user._id, name: user.name, email: user.email };
      },
    }),
    
  ],
   callbacks:{
    async jwt({ token, user }) {
      if (user) {
        // console.log("inside token>>",user)
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      // console.log("token>>",token)
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
      }
      return session;
    },
    async signIn({user,account,profile,email,credentials}){
      try {
        await connectToDatabase();
        const user = await User.findOne({ email: profile.email });
        const hashedPassword = await bcrypt.hash(account.provider, 10);
        if(!user){
          try {
            const newUser = new User({
              username:profile.name,
              email:profile.email,
              password: hashedPassword,
            });
        
            await newUser.save();
            
          } catch (error) {
            console.log("Some error occurred while connecting to database",error)
          }
        }
      } catch (error) {
        console.log("Some error occurred while connecting to database",error)
      }
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