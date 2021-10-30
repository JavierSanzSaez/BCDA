
let Web3 = require("web3");  // Cargar paquete web3

// Usar Provider: GANACHE 
let web3 = new Web3("http://localhost:7545");

(async () => {
    try {
        const addresses = await web3.eth.getAccounts();
        const primaryAddress = addresses[0];

        console.log("primaryAddress =", primaryAddress);

        const abi = require("./abi.json");
        const code = require("./code.json");

        let myContract = new web3.eth.Contract(abi);

        let newContractInstance = await myContract.deploy({
                                        data: code, 
                                        arguments: []
                                    })
                                    .send({
                                        from: primaryAddress, 
                                        gas: 500000
                                    });
        console.log("Contrato desplegado en", newContractInstance.options.address);
    } catch(error) {
        console.log("Error =", error);
        process.exit(1);
    }
})();
