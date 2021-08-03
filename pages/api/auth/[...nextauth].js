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
        })

        // Providers.Email({
        //     server: {
        //         host: "",
        //         port: "",
        //         auth: {
        //             user: "",
        //             pass: ""
        //         }
        //     },
        //     from: ""
        // })
    
    ]
};

export default (req,res) => NextAuth(req,res,options); 
