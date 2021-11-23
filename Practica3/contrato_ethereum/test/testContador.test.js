const Contador = artifacts.require("Contador");

contract("Contador", (accounts) =>{
    let contador;

    before(async ()=> {
        contador = await Contador.deployed();
    });

    describe("Incrementando el valor en una unidad", async ()=>{
        it("Comprobando", async ()=>{
            let valorActual = await contador.valor();
            await contador.incr();
            let nextValor = valorActual+1;
            let newValor = await contador.valor();
            assert.equal(Number(nextValor),newValor, "Fallo en incremento. Ambos valores deben ser iguales");
        });
    });
    describe("Decrementando el valor en una unidad", async ()=>{
        it("Comprobando", async ()=>{
            let valorActual = await contador.valor();
            await contador.decr();
            let nextValor = valorActual-1;
            let newValor = await contador.valor();
            assert.equal(nextValor,newValor, "Fallo en decremento. Ambos valores deben ser iguales");
        });
    });
    describe("Reseteando el valor", async ()=>{
        it("Comprobando", async ()=>{
            await contador.reset();
            let newValor = await contador.valor();
            assert.equal(0,newValor, "Fallo en reset. Ambos valores deben ser 0");
        });
    });

})