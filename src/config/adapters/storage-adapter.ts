//cuando trabajemos con adpatadores tiene mas sentido que sean clases

import AsyncStorage from "@react-native-async-storage/async-storage";

export class StorageAdapter {

    //empezamos con la creacion de los metodos para trabajar
    static async getItem(key: string): Promise<string | null> {
        try {

            const value = await AsyncStorage.getItem(key);
            return value;

        } catch (ex) {
            //retornamos null si algo sale mal
            return null;
        }

    }

    static async setItem(key: string, value: string): Promise<void> {
        try {

            await AsyncStorage.setItem(key, value);

        } catch (ex) {
            throw new Error(`Error setting item ${key} - ${value}`);
        }
    }

    static async removeItem(key: string): Promise<void> {
        try {

            await AsyncStorage.removeItem(key);

        } catch (ex) {
            //Mandamos a imprimir el error
            console.log(ex);
            //Mostramos el error al usuario
            throw new Error(`Error remove item ${key}`);
        }
    }
}