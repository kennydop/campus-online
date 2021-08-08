import NextAuth from "next-auth"
import { session } from "next-auth/client";
import Providers from "next-auth/providers";
import { auth, db } from "../../../firebase/firebase";
import Avatar from '../../../images/avatar.jpg';
const options = {
    providers: [
        Providers.Google({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        }),

        Providers.Facebook({
            clientId: process.env.FACEBOOK_ID,
            clientSecret: process.env.FACEBOOK_SECRET
        }),

        Providers.Twitter({
            clientId: process.env.TWITTER_ID,
            clientSecret: process.env.TWITTER_SECRET
        }),

        Providers.Credentials({
            name: 'Credentials',
            credentials: {
              email: { label: "Email", type: "text"},
              password: {  label: "Password", type: "password" },
                isNewUser: {label: "New User", type: 'boolean'}
            },
            async authorize(credentials, req) {
              // Authentication Logic: local function, external API call, etc
              // Add logic here to look up the user from the credentials supplied
              const userInfo = await auth.currentUser
              if(credentials.isNewUser){
                  const user = {email: credentials.email, image: Avatar}
                  return user
              }else{
                const user = {name: userInfo.displayName, email: credentials.email, image: userInfo.photoURL}
                return user
              }
                  //throw new Error('Check your credentials')}               
            }
      })    
    ],  
    // session: { 
    //   jwt: true,
    // },
    // jwt: {
    //     // A secret to use for key generation - you should set this explicitly
    //     // Defaults to NextAuth.js secret if not explicitly specified.
    //     secret: process.env.JWT_SIGNING_PRIVATE_KEY,    
    //   }  
     
};


export default (req,res) => NextAuth(req,res,options); 
