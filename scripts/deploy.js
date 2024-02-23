const hre = require("hardhat");

async function main() {
  const capValue = 100000000;
  const rewardValue = 100;

  const MyToken = await hre.ethers.deployContract("MyToken", [
    capValue,
    rewardValue,
  ]);

  await MyToken.waitForDeployment();

  console.log(`MyToken deployed to ${MyToken.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
