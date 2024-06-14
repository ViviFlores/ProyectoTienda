import { create } from "zustand";
import { User } from "../../../domain/entities/user";
import { AuthStatus } from "../../../infrastructure/interfaces/auth.status";
import { authCheckStatus, authLogin } from "../../../actions/auth/auth";
import { StorageAdapter } from "../../../config/adapters/storage-adapter";

export interface AuthState {
    status: AuthStatus;
    user?: User;
    token?: string;
    //login para mandar a disparar la sesion
    //devolvemos un lbooleano indicando si se hice el login o no
    login: (email: string, password: string) => Promise<boolean>;
    //Vamos a crear esta propiedad
    checkStatus: () => Promise<void>;
}

//Debemos definir nuestro store
export const useAuthStore = create<AuthState>()((set, get) => ({
    status: 'checking',
    user: undefined,
    token: undefined,
    login: async (email: string, password: string) => {
        const resp = await authLogin(email, password);
        if (!resp) {
            set({ status: 'unauthenticated', token: undefined, user: undefined })
            return false;
        }

        //TODO: Save token and user in storage
        await StorageAdapter.setItem('token', resp.token);

        //Para probar si de verdad funciona, por el momento vamos a hacer un get storage - token
        const storeToken = await StorageAdapter.getItem('token');
        console.log(storeToken);

        set({ status: 'authenticated', token: resp.token, user: resp.user })
        return true;
    },
    checkStatus: async () => {
        //llamamos a la funcion de nuestras acciones
        const resp = await authCheckStatus();
        //Validamos de la misma forma que arriba --- podemos copiar
        if (!resp) {
            set({ status: 'unauthenticated', token: undefined, user: undefined })
            return;
        }
        //Si hay respuesta
        await StorageAdapter.setItem('token', resp.token);
        set({ status: 'authenticated', token: resp.token, user: resp.user })
        
    }

}))