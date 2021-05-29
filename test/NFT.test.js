const assert = require('assert');
const NFT = artifacts.require('./NFT.sol')
const BigNumber = require('bignumber.js')
require('chai').use(require('chai-as-promised')).should()

contract('NFT', ([owner]) => {
    let nft, user1, user2, pathNFT , EVM_REVERT

    beforeEach(async () => {
        nft = await NFT.new("Hola", "HOLA")

        accounts = await web3.eth.getAccounts()
        user1 = accounts[0]
        user2 = accounts[1]

        pathNFT = "https://i.pinimg.com/originals/2b/9f/e4/2b9fe4545e17680effaa7ee3974cf994.gif"

        EVM_REVERT = 'VM Exception while processing transaction: revert ERC721: owner query for nonexistent token'

    })

    describe('deployment', () => {

        it('Should deploy smart contract', async () => {
            assert(nft.address !== '')
        })

    })


    describe('createNFTS', () => {
        let result

        beforeEach(async () => {
            result = await nft.createNFT(user1, pathNFT, { from: user1 })
        })

        it('check nft for user 1', async () => {
            (await nft.ownerOf(0)).should.equal(owner)
        })

        it('check path nft 1', async () => {
            const path = await nft.tokenURI(0)
            path.should.equal(pathNFT)
        })

        it('approval nft 0 to user2', async () => {
            await nft.approve(user2, 0, { from: user1 })
            const check = await nft.getApproved(0)
            check.should.equal(user2)
        })

        it('transfer nft 0 to user2', async () => {
            await nft.safeTransferFrom(user1, user2, 0 , {from: user1})
            const _owner = await nft.ownerOf(0)
            _owner.should.equal(user2)
        })

        it('burn nft 0', async () => {
            await nft.burn(0 , {from : user2})
            await nft.ownerOf(0).should.be.rejectedWith(EVM_REVERT)
        })

    })

})