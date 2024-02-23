const { expect } = require("chai");
const hth = require("hardhat");
const { ethers } = require("hardhat");
describe("MyToken", function () {
    let Token, token, owner, addr1, addr2;
    const capValue = 100000000;
    const rewardValue = 100;

    beforeEach(async function () {
        Token = await ethers.getContractFactory("MyToken");
        [owner, addr1, addr2] = await ethers.getSigners();
        token = await (ethers.deployContract("MyToken", [
            capValue,
            rewardValue,
        ]));
    });

    describe("Deployment", function () {
        it("Should assign the total supply of tokens to the owner", async function () {
            const ownerBalance = await token.balanceOf(owner.address);
            expect(await token.totalSupply()).to.equal(ownerBalance);
        });
    });

    describe("Transactions", function () {
        it("Should transfer tokens between accounts", async function () {
            await token.transfer(addr1.address, hth.ethers.parseEther("50"));
            const addr1Balance = await token.balanceOf(addr1.address);
            expect(addr1Balance).to.equal(hth.ethers.parseEther("50"));
        });

        it("Should fail if sender doesn’t have enough tokens", async function () {
            const initialOwnerBalance = await token.balanceOf(owner.address);
            await expect(
                token.connect(addr1).transfer(owner.address, hth.ethers.parseEther("1"))
            ).to.be.revertedWith("ERC20: transfer amount exceeds balance");
            expect(await token.balanceOf(owner.address)).to.equal(initialOwnerBalance);
        });
    });

    describe("Permissions and Ownership", function () {
        it("Should prevent non-owners from setting block reward", async function () {
            const newBlockReward = hth.ethers.parseEther("5");
            await expect(
                token.connect(addr1).setBlockReward(newBlockReward)
            ).to.be.revertedWith("Only the owner can call this function");
        });
    });
});
