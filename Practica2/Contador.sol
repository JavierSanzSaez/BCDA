/*
Tarea 1

El Smart Contract a usar en este ejercicio debe ser una modificación del contrato Contador.sol visto en clase.

Debe modificarse añadiendo dos métodos nuevos:

    decr, que disminuye el valor actual del contador en una unidad.
    reset, que pone a 0 el valor actual del contador.

Tarea 2

Modifique la aplicación web desarrollada para añadir dos botones nuevos para disminuir en uno y poner a cero el valor del contrato Contador desplegado.

El botón HTML usado para decremento debe tener "Decrementar" como título, y "cdecr" como valor del atributo id.

El botón HTML usado para reiniciar debe tener "Reset" como título, y "creset" como valor del atributo id.

Cree las funciones App.handleDecr() y App.handleReset() para manejar las pulsaciones sobre los nuevos botones. Estas funciones deber crear transacciones para invocar los métodos decr y reset del contrato Contador desplegado.

Use el servidor serve para servir la app desarrollada.
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
