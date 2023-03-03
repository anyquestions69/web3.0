from web3 import Web3
import json

from django.shortcuts import render, redirect, HttpResponse
from django.http import HttpResponseRedirect
from django.contrib import messages
from django.core.paginator import Paginator
from django.contrib.auth.decorators import login_required

from django.http import HttpResponse


        

def index(request):
    with open('/Users/public_hysteria/w33/web3.0/build/contracts/Signs.json', 'r') as f:
        abi=json.load(f)
    url = 'HTTP://127.0.0.1:7545'
    web3 = Web3(Web3.HTTPProvider(url))
    web3.eth.default_account = web3.eth.accounts[0]
    contract = web3.eth.contract(abi=abi['abi'],address='0x2C0DAf1B4956cc3FB4A2936631aE6c04Afab4D48')
    a = web3.eth.accounts
    b = web3.eth.get_balance(a[0])
    sss = contract.functions.addPerson().call({'from':a[0]})
    #res = contract.functions.users(0).call()
    return render(request, "index.html", {"web3": contract.all_functions(), "connected": sss, "balance": b})
