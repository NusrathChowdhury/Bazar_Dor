import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const mongodbUrl = process.env.MONGODB_URL;

if (!mongodbUrl) {
    throw new Error("MONGODB_URL is missing from .env.local");
}

const client = new MongoClient(mongodbUrl);
const db = client.db("Bazar_Dor");

export const auth = betterAuth({
    database: mongodbAdapter(db),

    secret: process.env.BETTER_AUTH_SECRET,
    baseURL: process.env.BETTER_AUTH_URL,

    emailAndPassword: {
        enabled: true,
        autoSignIn: true,
    },

    account: {
        accountLinking: {
            enabled: true,
            disableImplicitLinking: false,
            requireLocalEmailVerified: false,
            trustedProviders: ["google", "github"],
        },
    },

    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },

        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        },
    },
});
