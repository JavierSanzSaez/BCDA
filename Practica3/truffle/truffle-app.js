#! /usr/local/bin/node

const Web3 = require("web3");
const TruffleContract = require("@truffle/contract");

let web3 = new Web3('http://localhost:7545');

let web3Provider = web3.currentProvider;

const json = require("../contrato_ethereum/build/contracts/Contador.json");

const Contador = TruffleContract(json);

Contador.setProvider(web3Provider);

(
    async () =>{
        try{
            const id = await web3.eth.net.getId();
            if(id !== 5777){
                throw new Error('No estoy conectado a Ganache');
            }
            console.log(`Conectado al nodo Ethereum ${id}.`);
        
            const accounts = await web3.eth.getAccounts();
            if (accounts.length === 0){
                throw new Error("No hay cuentas");
            }
            const account = accounts[0]; // Cogemos la primera cuenta
            console.log("Conectado con cuenta de usuario: ", account);

            const contador = await Contador.deployed();
            console.log("Dirección del contrato: ", contador.address);

            console.log("Inicializando contador")
            const valor_inicial = await contador.valor.call();
            console.log("Valor del contador: ", valor_inicial);
            console.log("Incrementando el contador")
            await contador.incr({from:account});
            console.log("Valor del contador: ", valor_inicial);
            console.log("Decrementando el contador")
            await contador.decr({from:account});
            console.log("Valor del contador: ", valor_inicial);
            console.log("Reseteando el contador")
            await contador.reset({from:account});
            console.log("Valor del contador: ", valor_inicial);
        }
        catch(error){
            console.log("ERROR: " + error.message || error);
            process.exit(1)
        }
        finally{
            console.log("FIN");
            process.exit(0)
        }

    }
)();