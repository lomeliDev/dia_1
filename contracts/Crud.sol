// SPDX-License-Identifier: MIT
pragma solidity 0.6.12;

/*

ganache-cli \
    --keepAliveTimeout 25000 \
    -h 0.0.0.0 \
    -p 8545 \
    -i 56 \
    --chainId 56 \
    -l 100000000 \
    -a 10 \
    -e 100000000 \
    -m "lawsuit cushion artwork warfare segment exact thought age alert shoe coast antenna"

truffle compile
truffle migrate --network development
truffle migrate
truffle migrate --network development -f 1 --to 1

0xdF9C91d11c04AeFDCF557DD2ccE9339eE7F86F7e

truffle console --network development

const crud_1 = await Crud.deployed()
const crud_2 = await Crud.at("0xdF9C91d11c04AeFDCF557DD2ccE9339eE7F86F7e")


await crud_1.owner.call()
await crud_1.carros.call(0)
(await crud_1.carros.call(0)).value.toString()

await crud_1.carros2.call(0)
(await crud_1.carros2.call(0)).value.toString()


await crud_1.NewCarros(100)
await crud_1.NewCarros2(200)

await crud_1.EditCarros(0, 101)
await crud_1.EditCarros2(0, 201)


await crud_1.ViewCarros.call(0)
await crud_1.ViewCarros2.call(0)


await crud_1.DeleteCarros(0)
await crud_1.DeleteCarros2(0)


*/


contract Crud {

    struct carrosStruct {
        bool isExist;
        uint256 value;
    }

    mapping(uint256 => carrosStruct) public carros;
    uint256 public lastCarros;
    carrosStruct[] public carros2;

    address public owner;

    constructor() public {
        owner = msg.sender;
    }

    modifier onlyOnwer() {
        require(owner == msg.sender, "!owner");
        _;
    }

    function NewCarros(uint256 _value) external {
        require(owner == msg.sender, "!owner");
        carrosStruct memory cars;
        cars = carrosStruct({
            isExist: true,
            value: _value
        });
        carros[lastCarros] = cars;
        lastCarros++;
    }

    function NewCarros2(uint256 _value) external onlyOnwer {
        carros2.push(
            carrosStruct({
                isExist: true,
                value: _value
            })
        );
    }

    function EditCarros(uint256 _id, uint256 _value) external onlyOnwer {
        carros[_id].value = _value;
    }

    function EditCarros2(uint256 _id, uint256 _value) external onlyOnwer {
        carrosStruct storage _carros = carros2[_id];
        _carros.value = _value;
    }

    function ViewCarros(uint256 _id) external view returns(uint256) {
        require(carros[_id].isExist, "!noExist");
        return carros[_id].value;
    }

    function ViewCarros2(uint256 _id) external view returns(uint256 _value) {
        require(carros2[_id].isExist, "!noExist");
        (_value) = carros2[_id].value;
    }

    function DeleteCarros(uint256 _id) external onlyOnwer {
        require(carros[_id].isExist, "!noExist");
        carros[_id].isExist = false;
        carros[_id].value = 0;
    }

    function DeleteCarros2(uint256 _id) external onlyOnwer {
        require(carros2[_id].isExist, "!noExist");
        carros2[_id].isExist = false;
        carros2[_id].value = 0;
    }
    
}