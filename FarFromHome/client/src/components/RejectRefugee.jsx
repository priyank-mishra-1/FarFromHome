import React, { useState } from "react";
import { ethers } from "ethers";

function RejectRefugee({ contract }) {
  const [refugeeAddress, setRefugeeAddress] = useState("");

  const handleReject = async () => {
    try {
      await contract.rejectRefugee(refugeeAddress);
      alert("Refugee Rejected Successfully!");
    } catch (error) {
      alert("Rejection Failed: " + error.message);
    }
  };

  return (
    <div>
      <h2>Reject Refugee</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleReject();
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
        <button type="submit">Reject</button>
      </form>
    </div>
  );
}

export default RejectRefugee;
