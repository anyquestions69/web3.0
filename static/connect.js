class Manage{
    abi = `[
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "signer",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            }
          ],
          "name": "Signing",
          "type": "event"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "allNews",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "constant": true
        },
        {
          "inputs": [],
          "name": "totalNews",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "constant": true
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "users",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "constant": true
        },
        {
          "inputs": [],
          "name": "addPerson",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "addNew",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_id",
              "type": "uint256"
            }
          ],
          "name": "sign",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_id",
              "type": "uint256"
            }
          ],
          "name": "viewSigners",
          "outputs": [
            {
              "internalType": "address[]",
              "name": "",
              "type": "address[]"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "constant": true
        }
      ]`
    address = '0x334D3b79c5bE012987c6E3303d1B969C7B9fC551'
    connected = false
    constructor(){
        if (window.ethereum != null) {
            this.web3 = new Web3(Web3.givenProvider)
            this.contract = new this.web3.eth.Contract(JSON.parse(this.abi), this.address);
            console.log(this.contract.methods)
            this.connected=true
        }else{
          console.log({status:420, log:"No provider"})
        }
    }

    async  allSigners(index){
        let res = await this.contract.methods.viewSigners(index).call()
        return res
    }

    async addNew(title, text){
        let user = await this.web3.eth.getAccounts()
        let res = await this.contract.methods.addNew().send({from:user[0]})
        let id = await this.contract.methods.totalNews().call({from:user[0]})
        let response = await fetch('/api/addPost/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify({id:id-1, title:title, text:text})
        })
        let result = await response.json();
        return result
    }

    async viewPosts(){
        let count = await this.contract.methods.totalNews().call()
        let res = []
        for (let i = 0; i <count; i++) {
                res.push(await this.contract.methods.allNews(i).call())
            
        }
        return res
    }
    async sign(id){
        let user = await this.web3.eth.getAccounts()
        let res = await this.contract.methods.sign(id).send({from:user[0]})
        return res
    }
    async addUser(name, rang){
        let user = await this.web3.eth.getAccounts()
        let res = await this.contract.methods.addPerson().send({from:user[0]})
        let response = await fetch('/api/reg/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify({name:name, rang:rang, wallet:user[0]})
        })
        let result = await response.json();
        return result
    }

}

const manage = new Manage()

//manage.viewPosts().then(res=>{console.log(res)})
//manage.addNew('aaa', 'qqqqqq')