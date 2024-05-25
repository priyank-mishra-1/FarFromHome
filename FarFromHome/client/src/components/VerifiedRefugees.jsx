import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import "./refugees.css";

function VerifiedRefugees({ contract }) {
  const [verifiedRefugees, setVerifiedRefugees] = useState([]);

  useEffect(() => {
    const getVerifiedRefugees = async () => {
      try {
        const refugees = await contract.getAllVerifiedRefugees();
        const formattedRefugees = refugees.map((refugee) => ({
          name: refugee.name,
          currentAddress: refugee.currentAddress,
          unhrcID: refugee.unhrcID.toString(), // Convert BigNumber to string
          accountAddress: refugee.accountAddress, // Assuming it's a string
        }));
        setVerifiedRefugees(formattedRefugees);
      } catch (error) {
        console.error("Error fetching verified refugees:", error);
      }
    };

    getVerifiedRefugees();
  }, [contract]);

  return (
    <div className="refugees-container">
      <h2>Verified Refugees</h2>
      {verifiedRefugees.length > 0 ? (
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
            {verifiedRefugees.map((refugee, index) => (
              <tr key={index}>
                <td>{refugee.name}</td>
                <td>{refugee.currentAddress}</td>
                <td>{refugee.unhrcID}</td>
                <td>{refugee.accountAddress}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-data">No verified refugees found.</p>
      )}
    </div>
  );
}

export default VerifiedRefugees;
