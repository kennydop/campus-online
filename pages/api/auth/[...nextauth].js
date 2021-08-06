import NextAuth from "next-auth"
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
            name: 'credentials',
            credentials: {
              username: { label: "Username", type: "text", placeholder: "jsmith" },
              password: {  label: "Password", type: "password" }
            },
            async authorize(credentials) {
              // Authentication Logic: local function, external API call, etc
                const user = { name: '', email: '', image: '' }
                return user;
            }
          })    
    ],  
    session: { 
      jwt: true,
    },
    jwt: {
        // A secret to use for key generation - you should set this explicitly
        // Defaults to NextAuth.js secret if not explicitly specified.
        signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,    
      }  
     
};

export default (req,res) => NextAuth(req,res,options); 
