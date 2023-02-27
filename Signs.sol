// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;


contract Signs {
    mapping(uint256=>address) public users;
    uint256 public totalPeople;
    uint256 public totalNews;
    struct Info{
        string name;
        uint256 count;
        address[] signers;
    }
    mapping(uint256=>Info)public allNews;
    event Signing(address signer, uint id);
    function addPerson()public{
        users[totalPeople]=msg.sender;
        totalPeople++;
    }
    function addNew(string memory _name)public{
        allNews[totalNews].name=_name;
        allNews[totalNews].count=0;
        totalNews++;
    }
    function sign(uint256 _id) public returns(string memory){
        for(uint256 i;i<allNews[_id].signers.length;i++){
            if(allNews[_id].signers[i]==msg.sender){
                return("You have already signed");
            }
        }
        allNews[_id].signers.push(msg.sender);
        allNews[_id].count++;
        emit Signing(msg.sender, _id);
        return("Ok");
    }
    function viewSigners(uint256 _id)public view returns(address[] memory){
    
        return allNews[_id].signers;
    }
   

}