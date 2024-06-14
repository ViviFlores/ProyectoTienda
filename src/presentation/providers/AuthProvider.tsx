import { CommonActions, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack';
import React, { PropsWithChildren, useEffect } from 'react'
import { RootStackParams } from '../navigation/StackNavigator';
import { useAuthStore } from '../store/auth/useAuthStore';

export const AuthProvider = ({ children }: PropsWithChildren) => {

    const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
    const { checkStatus, status } = useAuthStore();

    //hook useEffect
    useEffect(() => {
        checkStatus();
        console.log('holaaa');
        
    }, [])


    useEffect(() => {
        console.log(status);
        
        //Verificamos que el status no este en checking
        if (status !== 'checking') {
            console.log('check');
            
            if (status === 'authenticated') {
                console.log('auth');
                
                //Navegamos al homeScreen
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'HomeScreen' }]
                })
            } else {
                console.log('no auth');
                
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'LoginScreen' }]
                })
            }
        }
    }, [status])


    return (
        <>{children}</>
    )
}
