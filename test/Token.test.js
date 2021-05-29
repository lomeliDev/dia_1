const assert = require('assert');
const Token = artifacts.require('./Token.sol')
const BigNumber = require('bignumber.js')

contract('Token', ([owner]) => {

    it('deploy Smart contracts', async() => {
        const token = await Token.deployed()
        assert(token.address != '')
    })

    it('get balance owner token', async () => {
        const token = await Token.deployed()
        const balance = await token.balanceOf.call(owner)
        assert(new BigNumber(1000000).times(new BigNumber(10).pow(18)).toString(), new BigNumber(balance).toString())
    })

    it('Create new tokens', async () => {
        const token = await Token.deployed()
        const balanceLast = await token.balanceOf.call(owner)
        await token.mint(owner, new BigNumber(100).times(new BigNumber(10).pow(18)))
        const balanceNew = await token.balanceOf.call(owner)
        assert(new BigNumber(balanceLast).toNumber() < new BigNumber(balanceNew).toNumber())
    })

    it('transfer tokens', async () => {
        const accounts = await web3.eth.getAccounts()
        const token = await Token.deployed()
        const balanceLast = await token.balanceOf.call(accounts[1])
        await token.mint(owner, 100)
        await token.transfer(accounts[1], 100)
        const balanceNew = await token.balanceOf.call(accounts[1])
        assert(new BigNumber(balanceLast).toNumber() < new BigNumber(balanceNew).toNumber())
    })    

    it('transferFrom tokens', async () => {
        const accounts = await web3.eth.getAccounts()
        const token = await Token.deployed()
        await token.mint(owner, 100)
        const balanceLast = await token.balanceOf.call(accounts[1])
        await token.approve(accounts[1], 100)
        await token.transferFrom(owner, accounts[1], 100, { from: accounts[1] })
        const balanceNew = await token.balanceOf.call(accounts[1])
        assert(new BigNumber(balanceLast).toNumber() < new BigNumber(balanceNew).toNumber())
    })    

    it('has an Ownership', async () => {
        const token = await Token.deployed()
        assert(await token.owner(), owner)
    })    

    it('change Ownership', async () => {
        const accounts = await web3.eth.getAccounts()
        const token = await Token.deployed()
        await token.transferOwnership(accounts[1])
        const ownerNew = await token.owner()
        assert(ownerNew == accounts[1])
    })    

    it('renounce Ownership', async () => {
        const accounts = await web3.eth.getAccounts()
        const token = await Token.deployed()
        const owner_last = await token.owner()
        await token.renounceOwnership({ from: accounts[1] })
        const owner_new = await token.owner()
        assert(owner_last != owner_new)
    })    

})