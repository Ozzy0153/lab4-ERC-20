const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyToken", function () {
    let Token, token, owner, addr1, addr2;

    beforeEach(async function () {
        Token = await ethers.getContractFactory("MyToken");
        [owner, addr1, addr2] = await ethers.getSigners();
        token = await Token.deploy(ethers.utils.parseEther("1000000"));
    });

    describe("Deployment", function () {
        it("Should assign the total supply of tokens to the owner", async function () {
            const ownerBalance = await token.balanceOf(owner.address);
            expect(await token.totalSupply()).to.equal(ownerBalance);
        });
    });

    describe("Transactions", function () {
        it("Should transfer tokens between accounts", async function () {
            // Transfer 50 tokens from owner to addr1
            await token.transfer(addr1.address, ethers.utils.parseEther("50"));
            const addr1Balance = await token.balanceOf(addr1.address);
            expect(addr1Balance).to.equal(ethers.utils.parseEther("50"));
        });

        it("Should fail if sender doesn’t have enough tokens", async function () {
            const initialOwnerBalance = await token.balanceOf(owner.address);

            // Try to send 1 token from addr1 (0 tokens) to owner (1000000 tokens).
            // `transfer` should fail because addr1 doesn't have enough tokens.
            await expect(
                token.connect(addr1).transfer(owner.address, ethers.utils.parseEther("1"))
            ).to.be.revertedWith("Transfer amount exceeds balance");

            // Owner balance shouldn't have changed.
            expect(await token.balanceOf(owner.address)).to.equal(initialOwnerBalance);
        });
    });

    describe("Minting", function () {
        it("Should mint new tokens to specified account", async function () {
            const mintAmount = ethers.utils.parseEther("100");
            await token.mint(addr1.address, mintAmount);

            const addr1Balance = await token.balanceOf(addr1.address);
            expect(addr1Balance).to.equal(mintAmount);
        });

        it("Should fail minting from non-owner account", async function () {
            const mintAmount = ethers.utils.parseEther("100");
            await expect(
                token.connect(addr1).mint(addr1.address, mintAmount)
            ).to.be.revertedWith("Only the owner can perform this action");
        });
    });

    describe("Permissions and Ownership", function () {
        it("Only owner can mint new tokens", async function () {
            const mintAmount = ethers.utils.parseEther("100");
            await expect(
                token.connect(addr1).mint(addr1.address, mintAmount)
            ).to.be.revertedWith("Only the owner can perform this action");
        });

        it("Should allow owner to set block reward", async function () {
            const newBlockReward = ethers.utils.parseEther("5");
            await token.setBlockReward(newBlockReward);
            expect(await token.blockReward()).to.equal(newBlockReward);
        });

        it("Should prevent non-owners from setting block reward", async function () {
            const newBlockReward = ethers.utils.parseEther("5");
            await expect(
                token.connect(addr1).setBlockReward(newBlockReward)
            ).to.be.revertedWith("Only the owner can perform this action");
        });
    });

    describe("Destruction", function () {
        it("Should allow owner to destroy the contract", async function () {
            // It's challenging to assert selfdestruct directly,
            // typically would check for contract's absence or zeroed balance.
            // Here, we ensure at least that the function is callable without reverting.
            await expect(token.destroy()).to.emit(token, "Transfer").withArgs(owner.address, ethers.constants.AddressZero, await token.totalSupply());
        });

        it("Should prevent non-owners from destroying the contract", async function () {
            await expect(token.connect(addr1).destroy()).to.be.revertedWith("Only the owner can perform this action");
        });
    });

});
