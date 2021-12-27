pragma solidity 0.8.10;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Contador.sol";

contract TestContador {
    Contador contador = Contador(DeployedAddresses.Contador());

    function testIncremento() public{
        uint8 valor = contador.valor();

        contador.incr();

        uint8 nextValor = valor + 1;
        uint8 newValor = contador.valor();
        Assert.equal(nextValor,newValor, "Fallo en incremento. Ambos valores deben ser iguales");
        
    }
    function testDecremento() public{
        uint8 valor = contador.valor();

        contador.decr();

        uint8 nextValor = valor - 1;
        uint8 newValor = contador.valor();
        Assert.equal(nextValor,newValor, "Fallo en decremento. Ambos valores deben ser iguales");
            
    }
    function testReset() public{

        contador.reset();

        uint8 nextValor = 0;
        uint8 newValor = contador.valor();
        Assert.equal(nextValor,newValor, "Fallo en reset. Ambos valores deben ser iguales");
        
    }
}