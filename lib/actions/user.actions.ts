'use server'

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

export const signIn = async ({ email, password }: signInProps) => {
    try {
        const { account } = await createAdminClient();
        const user = await account.createEmailPasswordSession(email, password);
        console.log({ user }, 'signed in user...');

        return parseStringify(user);
    } catch (error) {
        console.error(error, 'sign in error');
    }
}

export const signUp = async (userData: SignUpParams) => {
    const { email, password, firstName, lastName } = userData
    try {
        const { account } = await createAdminClient();

        const newUser = await account.create(ID.unique(), email, password, `${firstName} ${lastName}`);
        const session = await account.createEmailPasswordSession(email, password);

        cookies().set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });

        return parseStringify(newUser);
    } catch (error) {
        console.error(error, 'sign up error')
    }
}


export async function getLoggedInUser() {
    try {
        const { account } = await createSessionClient();
        const user = await account.get();
        console.log({ user }, 'user...');

        return parseStringify(user);
    } catch (error) {
        return null;
    }
}

export async function logoutUser() {
    try {
        const { account } = await createSessionClient();
        cookies().delete("appwrite-session");
        await account.deleteSession("current");
        return true;
    } catch (error) {
        return false;
    }
}
