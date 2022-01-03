# Practica 4 BCDA
Autores: Javier Sanz Sáez, Javier Antón Yuste

## Iniciar proyecto
Primero levantamos Ganache. Para ello en un terminal ejecutamos lo siguiente:

```
wget https://github.com/trufflesuite/ganache-ui/releases/download/v2.5.4/ganache-2.5.4-linux-x86_64.AppImage
sudo chmod +x  ganache-2.5.4-linux-x86_64.AppImage
./ganache-2.5.4-linux-x86_64.AppImage
```

Hemos usado el AppImage proporcionado por Ganache. Existe la opción de usar el CLI a través del siguiente comando:

```
ganache-cli -p 7545
```

Desplegamos nuestro contrato

```
npx truffle migrate --compile-all --reset
```

En otro terminal levantamos el proyecto de React.

```
cd dapp
npm install
npm start
```