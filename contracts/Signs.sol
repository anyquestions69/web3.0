// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;


contract Signs {
    address[] public users;
    uint256 public totalNews;

    struct News {
        uint256 id;
        address[]  signers;
    }
    
    News[] public allNews;

    event Signing(address signer, uint id);

    function addPerson()public{
        for(uint i=0;i<users.length;i++){
            require(msg.sender!=users[i], "Already registered");
        }
        users.push(msg.sender);
    }
    function addNew()public{
        address[] memory addr;
        allNews.push(News(totalNews,addr));
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
        for(uint256 i;i<allNews[_id].signers.length;i++){
            require(allNews[_id].signers[i]!=msg.sender, "You have already signed");
            
        }
        allNews[_id].signers.push(msg.sender);
        emit Signing(msg.sender, _id);
    }
    
    function viewSigners(uint256 _id)public view returns(address[] memory){
    
        return allNews[_id].signers;
    }
   

}
