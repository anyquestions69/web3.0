from web3 import Web3
import json

from django.shortcuts import render, redirect, HttpResponse
from django.http import HttpResponseRedirect
from django.contrib import messages
from django.core.paginator import Paginator
from django.contrib.auth.decorators import login_required

from django.http import HttpResponse


def index(request):
    url = 'HTTP://127.0.0.1:7545'
    web3 = Web3(Web3.HTTPProvider(url))
    a = web3.eth.accounts
    b = web3.eth.get_balance('0x50A39c14b5411f8795BB1d2EABaF3A3F8f397fAc')
    return render(request, "index.html", {"web3": web3, "connected": a, "balance": b})
