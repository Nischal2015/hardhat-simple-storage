// import
import { ethers } from "hardhat";

// async main
async function main() {
    const simpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    );
    console.log("Deploying contract at...");

    const simpleStorage = await simpleStorageFactory.deploy();
    await simpleStorage.deployed();

    console.log(`Deployed contract to: ${simpleStorage.address}`);
}

// main function caller
async function runMain() {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

// run the main function caller
runMain();
