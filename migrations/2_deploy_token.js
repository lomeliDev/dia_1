const Token = artifacts.require('./Token.sol')
const Token2 = artifacts.require('./Token2.sol')
const NFT = artifacts.require('./NFT.sol')


module.exports = async function (deployer) {
    await deployer.deploy(Token, "myDapp", "DAPP")
    await deployer.deploy(Token2)
    await deployer.deploy(NFT, "NFT", "NFT")
}