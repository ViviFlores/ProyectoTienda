//Definimos los estados que posiblemente hay en la autenticacion
// autenticado, no autenticado o chequeando el estado de la autenticacion

export type AuthStatus = 'authenticated' | 'unauthenticated' | 'checking';