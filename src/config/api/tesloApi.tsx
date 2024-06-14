import { API_URL, API_URL_ANDROID, STAGE } from "@env";
import axios from "axios";
import { StorageAdapter } from "../adapters/storage-adapter";

export const API_URL_BASE =
    (STAGE === 'prod')
        ? API_URL
        : API_URL_ANDROID;

const tesloApi = axios.create({
    baseURL: API_URL_BASE,
    headers: {
        'Content-Type': 'application/json'
    }
})

//TODO: Interceptors

/*tesloApi.interceptors.request.use(
    async (config) => {
        //Aqui lo que vamos a hacer es verificar si tenemos un token en el storage
        const token = await StorageAdapter.getItem('token');

        if (token) {
            //Colocamos la configuracion y devolvemos la configuracion
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    }
)
*/
export {
    tesloApi
}
