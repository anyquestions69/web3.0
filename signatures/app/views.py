from web3 import Web3
import json

from django.shortcuts import render, redirect, HttpResponse
from django.http import HttpResponseRedirect
from django.contrib import messages
from django.core.paginator import Paginator
from django.contrib.auth.decorators import login_required

from django.http import HttpResponse


        

def index(request):
    return render(request, "Главная.html")

def addpost(request):
    return render(request, "addNew.html")

def register(request):
    return render(request, "reg.html")

def article(request):
    return render(request, "article.html")

