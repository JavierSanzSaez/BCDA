/*
Tarea 2

Modifique la aplicación web desarrollada para añadir dos botones nuevos para 
disminuir en uno y poner a cero el valor del contrato Contador desplegado.

Cree las funciones App.handleDecr() y App.handleReset() para manejar las pulsaciones 
sobre los nuevos botones. Estas funciones deber crear transacciones para invocar los
métodos decr y reset del contrato Contador desplegado.

Use el servidor serve para servir la app desarrollada.
*/

App = {

    chainId: "0x539", // Ganache: es donde he desplegado el contrato

    web3: null,  // Creare mi propio objeto web3, de la version 1.4.0

    // TODO: Cambiar la addr por la red Ganache donde despliego el contrato

    // Direcion de la red Ganache donde hemos desplegado el contrato Contador.
    addr: "0x30D28c4A310d4bf765A5A10Ca7F5CD80b9d459D7",

    contador: null,  // Instancia desplegada del contrato
        
    init: async () => {
        console.log("Inicializando..");

        // Comprobar que el navegador soporta Ethereum
        if (typeof window.ethereum === "undefined") {
            alert("Instale MetaMask para usar esta aplicación.");
            return;
        } 
        try {
            
            console.log("Configurando el manejo de cambio de red");
            ethereum.on('chainChanged', chainId => {
                // Recargar la pagina
                console.log("Seleccionada otra red.");
                window.location.reload();
            });

            console.log("Configurar manejo de cambio de cuenta selecionada");
            ethereum.on('accountsChanged', accounts => {
                // Recargar el UI con accounts[0]
                console.log("Seleccionada otra cuenta =", accounts[0]);
                document.getElementById('cuenta').innerHTML = accounts[0];
            });

            // Comprobar que MetaMask está conectado a la red que quiero:
            const chainId = await ethereum.request({method: 'eth_chainId'});
            if (chainId !== App.chainId) {
               alert('Configure MetaMask para que se conecte con Ganache.');
               return;
            }

            // Creo mi instancia de web3
            App.web3 = new Web3(ethereum);

            console.log("App.web3 =", App.web3.version);

            console.log("Obtener el ABi del contrato Contador.");
            const response = await fetch('abi.json');
            const abi = await response.json();

            console.log("Obtener instancia desplegada del contador.");
            App.contador = new App.web3.eth.Contract(abi, App.addr);

            console.log("Configurar Vigilancia del evento Tic.");
            App.contador.events.Tic()
            .on("error", error => {
                console.log("Se ha producido un ERROR en evento Tic:", error);
            })
            .on('data', event => {
                console.log("Se ha producido un evento Tic:");
                console.log(" * Msg =", event.returnValues.msg);
                console.log(" * Out =", event.returnValues.out);
                document.getElementById('valor').innerHTML = event.returnValues.out;
            });

            // TODO: Ampliar ROUTER de eventos para meter las funciones reset y decremento
            console.log("Configurando manejadores de eventos.");
            const matchEvent = (ev, sel) => ev.target.matches(sel);
            document.addEventListener('click', ev => {
              if (matchEvent(ev, '#cincr')) App.handleIncr(ev);
              else if (matchEvent(ev, '#login')) App.handleLogin(ev);
              else if (matchEvent(ev, '#cdecr')) App.handleDecr(ev);
              else if (matchEvent(ev, '#creset')) App.handleReset(ev);
            });


            App.refreshContador();

        } catch(error) {
            alert('Se ha producido un error inesperado: ' + error);
        }
    },

    handleLogin: async event => {
        // Hacer login em MetaMask para acceder a las cuentas

        console.log("Se ha hecho Click en el botón de Login.");

        event.preventDefault();

        try {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0];

            console.log("Logueado con la cuenta =", account);
            document.getElementById('cuenta').innerHTML = account;

        } catch(error) {
            console.log(error);
        }
    },

    handleIncr: async event => {
        console.log("Se ha hecho Click en el botón de incrementar.");

        event.preventDefault();

        try {
            const accounts = await App.web3.eth.getAccounts();
            const account = accounts[0];

            if (!account) {
               alert('No se puede acceder a las cuentas de usuario.');
               return;
            }
            console.log("Cuenta =", account);

            // Ejecutar incr como una transacción desde la cuenta account.
            await App.contador.methods.incr().send({from: account,
                                                    gas: 200000});
        } catch(error) {
            console.log(error);
        }
    },

    handleDecr: async event => {
        console.log("Se ha hecho Click en el botón de decrementar.");

        event.preventDefault();

        try {
            const accounts = await App.web3.eth.getAccounts();
            const account = accounts[0];

            if (!account) {
               alert('No se puede acceder a las cuentas de usuario.');
               return;
            }
            console.log("Cuenta =", account);

            // Ejecutar incr como una transacción desde la cuenta account.
            await App.contador.methods.decr().send({from: account,
                                                    gas: 200000});
        } catch(error) {
            console.log(error);
        }
    },

    handleReset: async event => {
        console.log("Se ha hecho Click en el botón de incrementar.");

        event.preventDefault();

        try {
            const accounts = await App.web3.eth.getAccounts();
            const account = accounts[0];

            if (!account) {
               alert('No se puede acceder a las cuentas de usuario.');
               return;
            }
            console.log("Cuenta =", account);

            // Ejecutar incr como una transacción desde la cuenta account.
            await App.contador.methods.incr().reset({from: account,
                                                    gas: 200000});
        } catch(error) {
            console.log(error);
        }
    },

    refreshContador: async () => {
        console.log("Refrescando el valor mostrado del contador.");

        try {
            const valor = await App.contador.methods.valor().call()

            console.log("Valor =", valor);

            document.getElementById('valor').innerHTML = valor;

        } catch(error) {
            console.log(error);
        }
    }

};



// Inicialización: Ejecutar cuando se ha terminado de cargar la pagina.
//document.addEventListener('DOMContentLoaded', App.init);
window.addEventListener('load', App.init);

