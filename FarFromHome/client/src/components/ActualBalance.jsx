import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

function ActualBalance({ contract }) {
  const [actualBalance, setActualBalance] = useState(0);

  useEffect(() => {
    const fetchActualBalance = async () => {
      try {
        const balanceWei = await contract.checkActualBalance();
        const balanceEth = ethers.utils.formatEther(balanceWei);
        setActualBalance(balanceEth);
      } catch (error) {
        console.error("Error fetching actual balance:", error);
      }
    };

    fetchActualBalance();
  }, [contract]);

  return (
    <div>
      <h2>Actual Balance</h2>
      <p>Balance: {actualBalance} ETH</p>
    </div>
  );
}

export default ActualBalance;
