const Crud = artifacts.require('./Crud.sol')

module.exports = async function (deployer) {
    await deployer.deploy(Crud)
}