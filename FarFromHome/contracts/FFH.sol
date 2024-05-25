// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract FFH {
    address payable public government;

    struct Refugee {
        address accountAddress;
        string name;
        string phoneNumber;
        string nationality;
        string currentAddress;
        uint256 unhrcID;
    }

    Refugee[] public verifiedRefugees;
    Refugee[] public nonVerifiedRefugees;
    mapping(address => uint256) public refugeeBalances;

    event RefugeeRegistered(address indexed refugee);
    event RefugeeVerified(address indexed refugee, uint256 amountReceived);
    event RefugeeRejected(address indexed refugee);

    modifier onlyGovernment() {
        require(msg.sender == government, "Only government can call this function");
        _;
    }

    constructor() {
        government = payable(msg.sender);
    }

    function registerAsRefugee(string memory _name, string memory _phoneNumber, string memory _nationality, string memory _currentAddress, uint256 _unhrcID) external payable {
        nonVerifiedRefugees.push(Refugee(msg.sender, _name, _phoneNumber, _nationality, _currentAddress, _unhrcID));
        refugeeBalances[msg.sender] += msg.value; // Add deposited amount to refugee balance
        emit RefugeeRegistered(msg.sender);
    }

    function verifyRefugee(address _refugeeAddress) external payable onlyGovernment {
        require(isNonVerifiedRefugee(_refugeeAddress), "Refugee not found or already verified");

        uint256 amountToTransfer = 0.05 ether; // Amount to be transferred to the verified refugee
        require(address(this).balance >= amountToTransfer, "Insufficient contract balance");

        Refugee memory refugeeToVerify;
        for (uint256 i = 0; i < nonVerifiedRefugees.length; i++) {
            if (nonVerifiedRefugees[i].accountAddress == _refugeeAddress) {
                refugeeToVerify = nonVerifiedRefugees[i];
                break;
            }
        }

        verifiedRefugees.push(refugeeToVerify);
        removeNonVerifiedRefugee(_refugeeAddress);
        refugeeBalances[_refugeeAddress] += amountToTransfer; // Transfer 0.05 ether to verified refugee
        payable(_refugeeAddress).transfer(amountToTransfer); // Transfer funds to the verified refugee

        emit RefugeeVerified(_refugeeAddress, amountToTransfer);
    }

    function rejectRefugee(address _refugeeAddress) external onlyGovernment {
        require(isNonVerifiedRefugee(_refugeeAddress), "Refugee not found or already verified");

        removeNonVerifiedRefugee(_refugeeAddress);

        emit RefugeeRejected(_refugeeAddress);
    }

    function checkActualBalance() external view returns (uint256) {
        return msg.sender.balance; // Return actual balance of the refugee's address
    }

    function checkBalance() external view returns (uint256) {
        return refugeeBalances[msg.sender]; // Return balance tracked in the contract
    }

    function getAllVerifiedRefugees() external view onlyGovernment returns (Refugee[] memory) {
        return verifiedRefugees;
    }

    function getAllNonVerifiedRefugees() external view onlyGovernment returns (Refugee[] memory) {
        return nonVerifiedRefugees;
    }

    function isVerifiedRefugee(address _refugeeAddress) public view returns (bool) {
        for (uint256 i = 0; i < verifiedRefugees.length; i++) {
            if (verifiedRefugees[i].accountAddress == _refugeeAddress) {
                return true;
            }
        }
        return false;
    }

    function isNonVerifiedRefugee(address _refugeeAddress) public view returns (bool) {
        for (uint256 i = 0; i < nonVerifiedRefugees.length; i++) {
            if (nonVerifiedRefugees[i].accountAddress == _refugeeAddress) {
                return true;
            }
        }
        return false;
    }

    function removeNonVerifiedRefugee(address _refugeeAddress) private {
        for (uint256 i = 0; i < nonVerifiedRefugees.length; i++) {
            if (nonVerifiedRefugees[i].accountAddress == _refugeeAddress) {
                nonVerifiedRefugees[i] = nonVerifiedRefugees[nonVerifiedRefugees.length - 1];
                nonVerifiedRefugees.pop();
                break;
            }
        }
    }

    // Fallback function to receive ether
    receive() external payable {}
}