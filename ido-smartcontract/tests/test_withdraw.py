#!/usr/bin/python3

import pytest
from brownie import Wei

def test_withdrawWalrum(ido_contract, walrum_token, accounts):
    walrum_owner_before = walrum_token.balanceOf(accounts[0])
    walrum_token.transfer(ido_contract.address, Wei("100 ether"))
    assert walrum_token.balanceOf(ido_contract.address) == Wei("100 ether")
    assert walrum_token.balanceOf(accounts[0]) == walrum_owner_before - Wei("100 ether") 
    ido_contract.withdrawWalrum(Wei("100 ether"))
    assert walrum_token.balanceOf(ido_contract.address) == 0
    assert walrum_token.balanceOf(accounts[0]) == walrum_owner_before
