import { Button, Input, Layout, Text } from '@ui-kitten/components'
import React from 'react'
import { useWindowDimensions } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { MyIcon } from '../../components/ui/MyIcon'
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParams } from '../../navigation/StackNavigator'

//Props de navegación
interface  Props extends StackScreenProps<RootStackParams, 'RegisterScreen'>{}

export const RegisterScreen = ({navigation}:Props) => {

  //hook para tomar automaticamente la dimension de la pantalla
  const { height } = useWindowDimensions();

  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView style={{ marginHorizontal: 40 }}>

        <Layout style={{ paddingTop: height * 0.30 }}>
          <Text category='h1'>Crear cuenta</Text>
          <Text category='p2'>Por favor, crea una cuenta para continuar</Text>
        </Layout>

        <Layout style={{ marginTop: 20 }}>
        <Input
            placeholder='Nombre Completo'
            accessoryLeft={<MyIcon name='person-outline' />}
            style={{ marginBottom: 10 }} />
          <Input
            placeholder='Correo electrónico'
            accessoryLeft={<MyIcon name='email-outline' />}
            keyboardType='email-address'
            autoCapitalize='none'
            style={{ marginBottom: 10 }} />
          <Input
            placeholder='Contraseña'
            accessoryLeft={<MyIcon name='lock-outline' />}
            autoCapitalize='none'
            secureTextEntry
            style={{ marginBottom: 10 }} />
        </Layout>

        {/*Agregamos un espacio*/}
        <Layout style={{ height: 10 }} />
        <Layout>
          <Button
            accessoryRight={<MyIcon name='arrow-forward-outline' isWhite={true} />}
            onPress={() => { }}>Crear</Button>
        </Layout>

        {/*Agregamos un espacio*/}
        <Layout style={{ height: 20 }} />
        <Layout style={{
          alignItems: 'flex-end',
          flexDirection: 'row',
          justifyContent: 'center'
        }}>
          <Text>Ya tienes cuenta?</Text>
          <Text
            status='primary'
            category='s1'
            onPress={() => navigation.navigate('LoginScreen')}> Ingresa </Text>
        </Layout>

      </ScrollView>
    </Layout>
  )
}
