import dotenv from "dotenv";

const environment = process.env.ENV || 'qa';

dotenv.config({
    path: `.env.${environment}`
})

const baseURL = process.env.BASE_URL;
const apiBaseURL = process.env.API_BASE_URL;
const sandboxApiKey = process.env.SANDBOX_API_KEY;
const apVersion = process.env.API_VERSION;

if(!baseURL){
    throw new Error(`BASE URL is missinng ${baseURL} -> ${environment}`);
}

if(!apiBaseURL){
    throw new Error(`API BASE URL is missinng ${baseURL} -> ${environment}`);
}

export const envConfig = {
    environment,
    baseURL,
    apiBaseURL ,
    apVersion,
    sandboxApiKey
}