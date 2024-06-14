import { tesloApi } from "../../config/api/tesloApi";
import { User } from "../../domain/entities/user";
import type { AuthResponse } from "../../infrastructure/interfaces/auth.responses";

//Funcion
const returnUserToken = (data: AuthResponse) => {

    //mapeo de la respuesta
    const user: User = {
        id: data.id,
        email: data.email,
        fullName: data.fullName,
        isActive: data.isActive,
        roles: data.roles
    }

    return {
        user: user,
        token: data.token
    }
}


//acciones http
export const authLogin = async (email: string, password: string) => {
    //aconsejable chicos...debemos garantizar que el email
    //esta en minuscula
    email = email.toLowerCase();

    try {
        const { data } = await tesloApi.post<AuthResponse>('/auth/login', {
            email,
            password
        });
        console.log(data);
        
        return returnUserToken(data);

    } catch (ex) {
        console.log(ex);
        //realizamos un return null si algo sale mal
        return null;

    }
}

//Agregamos un método para verificar la autenticacion del usuario
export const authCheckStatus = async () => {

    try {
        const { data } = await tesloApi.get<AuthResponse>('/auth/auth/check-status')
        console.log(data);
        
        return returnUserToken(data);

    } catch (ex) {
        console.log(ex);
        return null;

    }

}