/*
Tarea 1

El Smart Contract a usar en este ejercicio debe ser una modificación del contrato 
Contador.sol visto en clase.

Debe modificarse añadiendo dos métodos nuevos:

    decr, que disminuye el valor actual del contador en una unidad.
    reset, que pone a 0 el valor actual del contador.
*/

// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Contador {
    
    uint8 public valor = 0;
    
    event Tic(string msg, uint8 out);
        
    function incr() public {
        valor++;
        emit Tic("Actualizado", valor);
    }
    
    function decr() public {
        if (valor > 0){
            valor--;
        }
        emit Tic("Actualizado", valor);
    }

    function reset() public{
        valor=0;
        emit Tic("Actualizado", valor);

    }

    receive() external payable { 
        revert(); 
    }
}
