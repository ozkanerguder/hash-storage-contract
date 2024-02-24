async function main() {
  const TextHashStorage = await hre.ethers.getContractFactory("TextHashStorage");
  const textHashStorage = await TextHashStorage.deploy();

  await textHashStorage.waitForDeployment();

  console.log("TextHashStorage deployed to:", await textHashStorage.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
