// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;


contract Signs {
    address[] public users;
    uint256 public totalNews;
    
    mapping(uint256=>address[])public allNews;

    event Signing(address signer, uint id);

    function addPerson()public{
        users.push(msg.sender);
    }
    function addNew()public{
        allNews[totalNews].push(msg.sender);
        totalNews++;
    }
    function sign(uint256 _id) public {
        bool reg=false;
        for(uint i=0;i<users.length;i++){
            if(users[i]==msg.sender){
                reg=true;
                break;
            }
        }
        require(reg==true, "Not authorized");
        for(uint256 i;i<allNews[_id].length;i++){
            require(allNews[_id][i]!=msg.sender, "You have already signed");
            
        }
        allNews[_id].push(msg.sender);
        emit Signing(msg.sender, _id);
    }
    
    function viewSigners(uint256 _id)public view returns(address[] memory){
    
        return allNews[_id];
    }
   

}
