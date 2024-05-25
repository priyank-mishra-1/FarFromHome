import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import "./refugees.css";

function NonVerifiedRefugees({ contract }) {
  const [nonVerifiedRefugees, setNonVerifiedRefugees] = useState([]);

  useEffect(() => {
    const getNonVerifiedRefugees = async () => {
      try {
        const refugees = await contract.getAllNonVerifiedRefugees();
        setNonVerifiedRefugees(refugees);
      } catch (error) {
        console.error("Error fetching non-verified refugees:", error);
      }
    };

    getNonVerifiedRefugees();
  }, [contract]);

  return (
    <div className="refugees-container">
      <h2>Non-Verified Refugees</h2>
      {nonVerifiedRefugees.length > 0 && (
        <table className="refugees-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>UNHRC ID</th>
              <th>Account Address</th>
            </tr>
          </thead>
          <tbody>
            {nonVerifiedRefugees.map((refugee, index) => (
              <tr key={index}>
                <td>{refugee.name}</td>
                <td>{refugee.currentAddress}</td>
                <td>{refugee.unhrcID.toString()}</td>
                <td>{refugee.accountAddress}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {nonVerifiedRefugees.length === 0 && (
        <p className="no-data">No non-verified refugees found.</p>
      )}
    </div>
  );
}

export default NonVerifiedRefugees;
