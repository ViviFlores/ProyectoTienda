import { Button, Input, Layout, Text } from '@ui-kitten/components'
import React, { useState } from 'react'
import { Alert, useWindowDimensions } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { MyIcon } from '../../components/ui/MyIcon'
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParams } from '../../navigation/StackNavigator'
import { API_URL, API_URL_ANDROID, STAGE } from '@env'
import { useAuthStore } from '../../store/auth/useAuthStore'
import axios from 'axios'

//Props de navegación
interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'> { }

//interface para el formulario
interface FormLogin {
  email: string;
  password: string;
}

export const LoginScreen = ({ navigation }: Props) => {

  //hook para tomar automaticamente la dimension de la pantalla
  const { height } = useWindowDimensions();
  //console.log({ apiUrl: API_URL, stage: STAGE });

  //hook useState: creamos un formulario para la maniplacion del formulario
  const [formLogin, setFormLogin] = useState<FormLogin>({
    email: '',
    password: ''
  })

  //hook useState: verificar is se hizo un posting
  const [isPosting, setIsPosting] = useState<boolean>(false);

  //tomar login de nuestro store
  const { login } = useAuthStore();

  //Función cambiar datos del formulario
  const handlerSetValues = (key: string, value: string) => {
    setFormLogin({ ...formLogin, [key]: value })
  }

  //Función para la acción de iniciar sesión
  const handlerOnLogin = async () => {

    if (!formLogin.email || !formLogin.password) {
      return;
    }

    //Cambiamos el estado del posting - boton
    setIsPosting(true);

    const wasSuccessful = await login(formLogin.email, formLogin.password);

    //Cambiamos el estado del posting - boton
    setIsPosting(false);
    if (wasSuccessful) return;

    Alert.alert("Error", "Usuario o contraseña incorrecta!")
  }


  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView style={{ marginHorizontal: 40 }}>
        <Layout style={{ paddingTop: height * 0.35 }}>
          <Text category='h1'>Ingresar</Text>
          <Text category='p2'>Por favor, ingrese para continuar</Text>
        </Layout>
        <Layout style={{ marginTop: 20 }}>
          <Input
            placeholder='Correo electrónico'
            accessoryLeft={<MyIcon name='email-outline' />}
            keyboardType='email-address'
            autoCapitalize='none'
            value={formLogin.email}
            onChangeText={(value) => handlerSetValues('email', value)}
            style={{ marginBottom: 10 }} />
          <Input
            placeholder='Contraseña'
            accessoryLeft={<MyIcon name='lock-outline' />}
            autoCapitalize='none'
            value={formLogin.password}
            onChangeText={(value) => handlerSetValues('password', value)}
            secureTextEntry
            style={{ marginBottom: 10 }} />
        </Layout>

        {/*Agregamos un espacio*/}
        <Layout style={{ height: 10 }} />
        <Layout>
          <Button
            disabled={isPosting}
            accessoryRight={<MyIcon name='arrow-forward-outline' isWhite={true} />}
            onPress={handlerOnLogin}>Ingresar</Button>
        </Layout>

        {/*Agregamos un espacio*/}
        <Layout style={{ height: 20 }} />
        <Layout style={{
          alignItems: 'flex-end',
          flexDirection: 'row',
          justifyContent: 'center'
        }}>
          <Text>¿No tienes cuenta?</Text>
          <Text
            status='primary'
            category='s1'
            onPress={() => navigation.navigate('RegisterScreen')}> Crea una </Text>
        </Layout>

      </ScrollView>
    </Layout>
  )
}
