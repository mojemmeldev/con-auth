import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { Resend } from 'resend';




const client = new MongoClient(process.env.BETTER_AUTH_DB_URL);
const db = client.db();
const resend = new Resend(process.env.RESEND_API_KEY);



export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
        // requireEmailVerification: true,
    },

    // emailVerification: {
    //     sendVerificationEmail: async ({ user, url }) => {
    //         void resend.emails.send({
    //             from: 'Acme <onboarding@resend.dev>',
    //             to: user.email,
    //             subject: "Verify your email address",
    //             html: `
    //       <h2>Verify your email</h2>
    //       <p>Please click the button below to verify your email address.</p>
    //       <a href="${url}">Verify Email</a>
    //     `,
    //         });
    //     },
    
    // sendOnSignUp: true,
    // autoSignInAfterVerification: true,
    // expiresIn: 7 / 24 * 3600,
    // },

    socialProviders: {
        google: {
            clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT_ID,
            clientSecret: process.env.BETTER_AUTH_GOOGLE_SECRET,
        },
        github: {
            clientId: process.env.BETTER_AUTH_GITHUB_CLIENT_ID,
            clientSecret: process.env.BETTER_AUTH_GITHUB_SECRET,
        },
    },


    database: mongodbAdapter(db, {
        client
    })

});