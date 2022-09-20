# React Native Tempalte

[![N|Aicore](https://aicore.com.ar/wp-content/uploads/2021/05/cropped-Logo-Aicore.png)]()

Este template facilita la configuracion inicial de una aplicacion nativa tanto para iOS como para Android.

- Multiples entornos (Development, Staging and Production)
- Navegacion Nativa
- Integracion con Auth0
- Integracion con Firebase
- Integracion con Google Maps

## Librerias

Estas son las librerias incluidas en el proyecto:

- [react-native-vector-icons] - https://github.com/oblador/react-native-vector-icons 
- [@react-navigation] - https://reactnavigation.org
- [expo] - https://docs.expo.dev/bare/installing-expo-modules/
- [react-native-maps] - https://github.com/react-native-maps/react-native-maps
- [react-i18next] - Traduccion multiples idiomas
- [axios] - Peticiones http
- [@react-native-firebase/app] - https://rnfirebase.io

## Requerimientos
 - [Node.js](https://nodejs.org/)
 - [React Native](https://reactnative.dev/docs/environment-setup)

## Instalacion
Desde una terminal, ejecutar el siguiente comando.

```sh
npx react-native init nombreApp --template urlGithubProyecto
```

> Note: Este comando automaticamente ejecutara la inicializacion del proyecto de React Native, con la inclusion de las librerias necesarias para su correcto funcionamiento, con las instalacion de los Pods para iOS.

## Configuracion
Para poder levantar el proyecto correctamente, se deben configurar Firebase y Auth0.

## Firebase

1) El primer paso es crear en la consola de Firebase un nuevo proyecto.

2) El siguiente paso es agregar el archivo GoogleService-Info.plist en el proyecto iOS. Este archivo contiene toda la información necesaria por el SDK de iOS para conectarse al proyecto Firebase.

    Para generar y descargar el archivo GoogleService-Info.plist necesitaremos registrar la app en Firebase, para esto vamos al panel de control del proyecto que habíamos creado anteriormente; en la parte superior izquierda encontraremos la sección Project Overview:

    [![N|Firebase](https://miro.medium.com/max/494/1*SIk_engqhv-JSRb0HHXdjg.png)]()

    Dentro de esa sección seleccionaremos Add app y posteriormente el ícono de iOS y Android para iniciar la configuración:

    [![N|Firebase](https://miro.medium.com/proxy/1*z5fnD3jmjHPHZQKkgybVsQ.png)]()
    [![N|Firebase](https://miro.medium.com/proxy/1*7JdekDNfS7G9zngsT8sHhQ.png)]()

    En el asistente debemos colocar el iOS Bundle ID que podemos obtener desde Xcode, y en para Android desde /android/app/src/build.gradle

    > Note: Es importante saber, que esta estructura de template cuenta con tres entornos. Development, Staging y Production. En caso de necesitar utilizar todas, se debe realizar los pasos anteriores de Firebase por cada uno de estos entornos, tanto para iOS comoo para Android.

3) Para finalizar con esta configuracion se deben descargar los archivos GoogleServices-info.plist (iOS) y google-services.json (Android)

4) Ultimo Paso, reemplazar los archivos existentes por los nuevos, en las siguientes rutas:

    | Entorno | Archivo | Rutas |
    | ------ | ------ | ------ |
    | iOS - Development | GoogleServices-info.plist | **/ios/Firebase/Dev/** |
    | iOS - Staging | GoogleServices-info.plist | **/ios/Firebase/Stg/** |
    | iOS - Production | GoogleServices-info.plist | **/ios/Firebase/Prod/** |
    | Android - Development | google-services.json | **/android/app/src/development/** |
    | Android - Staging | google-services.json | **/android/app/src/staging/** |
    | Android - Production | google-services.json | **/android/app/src/production/** |

## Auth0
Se deben completar las siguientes variables de entorno:

```sh
AUTH0_DOMAIN=
AUTH0_CLIENT_ID= 
AUTH0_NAMESPACE=
AUTH0_AUDIENCE=
```
 
## Google Maps
Se debe configurar la api_key en console.cloud.google.com:

```sh
GOOGLE_API_KEY=
```
 
## Ejecucion
iOS Development.
```sh
yarn ios:development
```
iOS Staging.
```sh
yarn ios:staging
```
iOS Production.
```sh
yarn ios:production
```
Android Development.
```sh
yarn android:dev
```
Android Staging.
```sh
yarn android:staging
```
Android Production.
```sh
yarn android:prod
```

## License

AICORE