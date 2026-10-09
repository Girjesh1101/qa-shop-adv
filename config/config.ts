import dotenv from "dotenv";

const environment = process.env.ENV || 'qa';

dotenv.config({
    path: `.env.${environment}`
})

const baseURL = process.env.BASE_URL;

if(!baseURL){
    throw new Error(`BASE URL is missinng ${baseURL} -> ${environment}`);
}

export const envConfig = {
    environment,
    baseURL 
}