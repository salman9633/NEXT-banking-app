'use server'

import { ID, Query } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { encryptId, extractCustomerIdFromUrl, parseStringify } from "../utils";
import { CountryCode, ProcessorTokenCreateRequest, ProcessorTokenCreateRequestProcessorEnum, Products } from "plaid";
import { plaidClient } from "../plaid";
import { revalidatePath } from "next/cache";
import { addFundingSource, createDwollaCustomer } from "./dwolla.actions";

const {

    APPWRITE_DATABASE_ID: DATABASE_ID,
    APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
    APPWRITE_BANK_COLLECTION_ID: BANK_COLLECTION_ID,
    APPWRITE_TRANSACTION_COLLECTION_ID: TRANSACTION_COLLECTION_ID,
} = process.env

export const getUserInfo = async ({ userId }: getUserInfoProps) => {
    try {
        const { database } = await createAdminClient();

        const user = await database.listDocuments(
            DATABASE_ID!,
            USER_COLLECTION_ID!,
            [Query.equal('userId', [userId])] //fetching from db in appwrite
        )

        return parseStringify(user.documents[0])
    } catch (error: any) {
        throw new Error(`get banks Error ${error.message}`)

    }
}

export const signIn = async ({ email, password }: signInProps) => {
    try {
        const { account } = await createAdminClient();
        const session = await account.createEmailPasswordSession(email, password);

        cookies().set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });
        const user = await getUserInfo({ userId: session.userId });

        return parseStringify(user);
    } catch (error) {
        console.error(error, 'sign in error');
    }
}

export const signUp = async ({ password, dateOfBirth, ...userData }: SignUpParams) => {
    const { email, firstName, lastName } = userData
    let newUserAc
    try {
        const { account, database } = await createAdminClient();

        newUserAc = await account.create(ID.unique(), email, password, `${firstName} ${lastName}`);
        if (!newUserAc) throw new Error('Error creating user');


        const dwollaCustomerUrl = await createDwollaCustomer({
            dateOfBirth, ...userData, type: 'personal'
        });
        if (!dwollaCustomerUrl) throw new Error('Error creating dwolla Account');

        const dwollaCustomerId = extractCustomerIdFromUrl(dwollaCustomerUrl);

        const newUser = await database.createDocument(
            DATABASE_ID!,
            USER_COLLECTION_ID!,
            ID.unique(),
            {
                dob: dateOfBirth,
                ...userData,
                userId: newUserAc.$id,
                dwollaCustomerUrl,
                dwollaCustomerId
            }
        )


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
        const res = await account.get();
        const user = await getUserInfo({ userId: res.$id });

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

export const creatLinkToken = async (user: User) => {
    try {
        const tokenParams = {
            user: {
                client_user_id: user.$id || ''
            },
            client_name: `${user.firstName} ${user.lastName}`,
            products: ['auth'] as Products[],
            language: 'en',
            country_codes: ['US'] as CountryCode[]
        }

        const res = await plaidClient.linkTokenCreate(tokenParams);
        return parseStringify({ linkToken: res.data.link_token })
    } catch (error) {
        console.log({ error }, 'create link token error');

    }
}

export const createBankAccount = async ({
    userId,
    bankId,
    accountId,
    accessToken,
    fundingSourceUrl,
    shareableId,
}: createBankAccountProps) => {

    try {
        const { database } = await createAdminClient();
        const bankAccount = await database.createDocument(
            DATABASE_ID!,
            BANK_COLLECTION_ID!,
            ID.unique(),
            {
                userId,
                bankId,
                accountId,
                accessToken,
                fundingSourceUrl,
                shareableId,
            }


        )

        return parseStringify(bankAccount)
    } catch (error) {
        console.log({ error }, 'create bank account error');
        throw new Error(`Failed to create bank account ${error}`);
    }
}

export const exchangePublicToken = async (
    { publicToken, user }: exchangePublicTokenProps
) => {
    try {
        const res = await plaidClient.itemPublicTokenExchange({
            public_token: publicToken
        });
        const accessToken = res.data.access_token;
        const itemId = res.data.item_id;

        const accountResponse = await plaidClient.accountsGet({
            access_token: accessToken,
        });

        const accountData = accountResponse.data.accounts[0];

        const request: ProcessorTokenCreateRequest = {
            access_token: accessToken,
            account_id: accountData.account_id,
            processor: 'dwolla' as ProcessorTokenCreateRequestProcessorEnum,
        }

        const processorTokenResponse = await plaidClient.processorTokenCreate(request);
        const processorToken = processorTokenResponse.data.processor_token;

        const fundingSourceUrl = await addFundingSource({
            dwollaCustomerId: user.dwollaCustomerId,
            processorToken,
            bankName: accountData.name
        });

        if (!fundingSourceUrl) throw new Error('Failed to add funding source');

        await createBankAccount({
            userId: user.$id,
            bankId: itemId,
            accountId: accountData.account_id,
            accessToken,
            fundingSourceUrl,
            shareableId: encryptId(accountData.account_id)

        })

        revalidatePath('/');

        return parseStringify({
            publicTokenExchange: "complete",
        })

    } catch (error) {
        console.log({ error }, 'exchange public token error');

    }
}

export const getBank = async ({ documentId }: getBankProps) => {
    try {
        const { database } = await createAdminClient();

        const bank = await database.listDocuments(
            DATABASE_ID!,
            BANK_COLLECTION_ID!,
            [Query.equal('$id', [documentId])] //fetching from db in appwrite
        )
        return parseStringify(bank.documents[0])
    } catch (error: any) {
        throw new Error(`get banks Error ${error.message}`)

    }
}
export const getBanks = async ({ userId }: getBanksProps) => {
    try {
        const { database } = await createAdminClient();

        const banks = await database.listDocuments(
            DATABASE_ID!,
            BANK_COLLECTION_ID!,
            [Query.equal('userId', [userId])] //fetching from db in appwrite
        )

        return parseStringify(banks.documents)
    } catch (error: any) {
        throw new Error(`get banks Error ${error.message}`)

    }
}
export const getBankByAccountId = async ({ accountId }: getBankByAccountIdProps) => {
    try {
        const { database } = await createAdminClient();

        const bank = await database.listDocuments(
            DATABASE_ID!,
            BANK_COLLECTION_ID!,
            [Query.equal('accountId', [accountId])] //fetching from db in appwrite
        )

        if (bank.total !== 1) return null;

        return parseStringify(bank.documents[0])
    } catch (error: any) {
        throw new Error(`get banks Error ${error.message}`)

    }
}
