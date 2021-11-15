let Web3 = require("web3");  // Cargar paquete web3

// Usar Provider: GANACHE 
let web3 = new Web3("ws://localhost:7545");

(async () => {
    try {

        const addresses = await web3.eth.getAccounts();
        const primaryAddress = addresses[0];

        const abi = require("./abi.json");

        const addr = "0x42c404A9969e59714200f0D3e1117049066cf435";

        let myContract = new web3.eth.Contract(abi, addr);

        const valor1 = await myContract.methods.valor().call();

        console.log("Valor Inicial =", valor1);

        await myContract.methods.incr().send({from: primaryAddress, 
                                              gas: 200000});

        const valor2 = await myContract.methods.valor().call();
        console.log("Valor final =", valor2);

        process.exit(0);
    } catch(error) {
        console.log("Error =", error);
        process.exit(1);
    }
})();
