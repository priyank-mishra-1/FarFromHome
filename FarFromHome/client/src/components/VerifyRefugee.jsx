import React, { useState } from "react";
import { ethers } from "ethers";

function VerifyRefugee({ contract }) {
  const [refugeeAddress, setRefugeeAddress] = useState("");

  const handleVerify = async () => {
    try {
      await contract.verifyRefugee(refugeeAddress, {
        value: ethers.utils.parseEther("0.05"), // Sending 0.05 ether for verification
      });
      alert("Refugee Verified Successfully!");
    } catch (error) {
      alert("Verification Failed: " + error.message);
    }
  };

  return (
    <div>
      <h2>Verify Refugee</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleVerify();
        }}
      >
        <label>
          Refugee Address:
          <input
            type="text"
            value={refugeeAddress}
            onChange={(e) => setRefugeeAddress(e.target.value)}
          />
        </label>
        <br />
        <br />
        <button type="submit">Verify</button>
      </form>
    </div>
  );
}

export default VerifyRefugee;
