import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

function ContractBalance({ contract }) {
  const [contractBalance, setContractBalance] = useState(0);

  useEffect(() => {
    const fetchContractBalance = async () => {
      try {
        const balanceWei = await contract.checkBalance();
        const balanceEth = ethers.utils.formatEther(balanceWei);
        setContractBalance(balanceEth);
      } catch (error) {
        console.error("Error fetching contract balance:", error);
      }
    };

    fetchContractBalance();
  }, [contract]);

  return (
    <div>
      <h2>Contract Balance</h2>
      <p>Balance: {contractBalance} ETH</p>
    </div>
  );
}

export default ContractBalance;
