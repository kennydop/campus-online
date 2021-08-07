import NextAuth from "next-auth"
import { session } from "next-auth/client";
import Providers from "next-auth/providers";

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
              username: { label: "Email", type: "text"},
              password: {  label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
              // Authentication Logic: local function, external API call, etc
              // Add logic here to look up the user from the credentials supplied 
                const user = { name: '', email: '', image: '' }
                if(user) {return user;}
                else {
                  alert('user returned null')
                  return null; 
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
