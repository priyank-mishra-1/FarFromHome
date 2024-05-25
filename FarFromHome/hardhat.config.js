require("@nomicfoundation/hardhat-toolbox");

require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */

const SEPOLIA_URL = process.env.SEPOLIA_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
  paths: {
    artifacts: "./client/src/contracts",
  },
  solidity: "0.8.19",
  networks: {
    hardhat: {},
    sepolia: {
      url: SEPOLIA_URL, // Alchemy Sepolia endpoint
      accounts: [PRIVATE_KEY],
    },
  },
};

//  0x158664dc372726fb3d20e5cf617357395C80b4ba
