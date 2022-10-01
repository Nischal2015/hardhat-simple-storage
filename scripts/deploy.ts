// import
import { ethers, run, network } from "hardhat";

// async main
async function main() {
    const simpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    );
    console.log("Deploying contract at...");

    const simpleStorage = await simpleStorageFactory.deploy();
    await simpleStorage.deployed();

    console.log(`Deployed contract to: ${simpleStorage.address}`);
    if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
        await simpleStorage.deployTransaction.wait(6);
        await verify(simpleStorage.address, []);
    }
}

// verify
async function verify(contractAddress: string, args: unknown) {
    console.log("Verifying contract...");
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        });
    } catch (error) {
        if (
            error instanceof Error &&
            error.message.includes("Reason: Already Verified")
        ) {
            console.log("Already verified");
        } else {
            console.log(error);
        }
    }
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
