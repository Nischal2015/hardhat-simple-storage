import { assert, expect } from "chai";
import { ethers } from "hardhat";
import { SimpleStorage, SimpleStorage__factory } from "../typechain-types";

describe("SimpleStorage", function () {
    let simpleStorage: SimpleStorage,
        simpleStorageFactory: SimpleStorage__factory;
    beforeEach(async function () {
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
        simpleStorage = await simpleStorageFactory.deploy();
        await simpleStorage.deployed();
    });

    it("Should start with a favorite number of 0", async function () {
        const currentNumber = await simpleStorage.retrieve();
        expect(currentNumber.toString()).to.equal("0");
        // assert.equal(currentNumber.toString(), "0");
    });

    it("Should update the favorite number to 1234", async function () {
        const transactionResponse = await simpleStorage.store(1234);
        await transactionResponse.wait(1);
        const updatedFavoriteNumber = await simpleStorage.retrieve();
        expect(updatedFavoriteNumber.toString()).to.equal("1234");
        // assert.equal(updatedFavoriteNumber.toString(), "1234");
    });

    it("Should add person with their favorite number", async function () {
        await simpleStorage.addPerson("Nischal", 32);
        const nameToFavoriteNumber = await simpleStorage.nameToFavouriteNumber(
            "Nischal"
        );
        expect(nameToFavoriteNumber.toString()).to.equal("32");
    });
});
