const SushiBar = artifacts.require('./SushiBar.sol')

module.exports = async function (deployer) {
    await deployer.deploy(SushiBar, "xBUSD", "xBUSD", "tokenxxxx", 9600, 9950, "devxxxx", "reservasxxx")
}



/*
truffle migrate -f 2 --to 2 --network ropsten
truffle migrate -f 3 --to 3 --network ropsten

truffle run verify Token --network ropsten --license SPDX-License-Identifier
truffle run verify SushiBar --network ropsten --license SPDX-License-Identifier

*/