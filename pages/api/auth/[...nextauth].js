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
            name: 'Credentials',
            credentials: {
              email: { label: "Email", type: "text"},
              password: {  label: "Password", type: "password" },
              username: {label: "Username", type: "text"},
              photoURL: {label: "Profile Image", type: 'text'},
              isNewUser: {label: "New User", type: 'boolean'},
            },
            async authorize(credentials, req) {
              const user = {email: credentials.email, name: credentials.username, image: credentials.photoURL}
              return user
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
