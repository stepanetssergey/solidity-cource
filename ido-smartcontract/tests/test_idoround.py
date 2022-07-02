
#!/usr/bin/python3

import pytest
import datetime
from brownie import Wei

USDT_PRICE = 150
AMOUNT_USDT_EXCHANGE = 100 * 10 ** 6;

AMOUNT_WALRUM = AMOUNT_USDT_EXCHANGE * 10 ** 18 // USDT_PRICE//10**3
AMOUNT_WALRUM_ETH = AMOUNT_WALRUM/10 ** 18
AMOUNT_WALRUM_REF = AMOUNT_WALRUM*10**18*7 // 10**20 

def test_add_round(ido_contract, walrum_token, usdt_token, accounts):
    #create first round 
    #start = datetime.datetime.now()
    start  = datetime.datetime.now() - datetime.timedelta(days = 1)
    start_date = int(datetime.datetime.timestamp(start))
    end = datetime.datetime.now() + datetime.timedelta(days = 1)
    end_date = int(datetime.datetime.timestamp(end))
    lock = datetime.datetime.now() + datetime.timedelta(days = 10)
    lock_date = int(datetime.datetime.timestamp(end))
    total_amount = 1000 * 10 ** 18
    min_one_buy = 0 
    max_one_buy = 0 
    ido_contract.addRound(start_date,
                         end_date,
                         AMOUNT_USDT_EXCHANGE, 
                         max_one_buy,
                         min_one_buy, 
                         lock_date,
                         USDT_PRICE,
                         "PRIVATE",
                         {'from': accounts[0]})
    assert ido_contract.RoundID() == 1
    #add admin freeze to token
    walrum_token.setFreezeAdmin(ido_contract.address, True, {'from': accounts[0]}) 
    # send tokens from accounts_0 to accounts_1
    usdt_token.transfer(accounts[1], AMOUNT_USDT_EXCHANGE)
    # check accounts_1 balance
    account_1_balance = usdt_token.balanceOf(accounts[1])
    assert account_1_balance == AMOUNT_USDT_EXCHANGE 
    # transfer tokens to ido contract
    walrum_token.transfer(ido_contract.address, AMOUNT_WALRUM + AMOUNT_WALRUM_REF)
    assert walrum_token.balanceOf(ido_contract.address) == AMOUNT_WALRUM+AMOUNT_WALRUM_REF 
    # set withdraw address
    # exchange tokens;
    usdt_token.approve(ido_contract.address, AMOUNT_USDT_EXCHANGE, {'from': accounts[1]})
    ido_contract.usdtWalrumExchange(AMOUNT_USDT_EXCHANGE, accounts[2], {'from': accounts[1]})
    print('USDT:', AMOUNT_USDT_EXCHANGE)
    print('GET ROUND', ido_contract.getCurrentRound())
    print('WALRUM:', Wei(AMOUNT_WALRUM))
    print('ROUND', ido_contract.Rounds(1))
    print('AMOUNT', AMOUNT_WALRUM + AMOUNT_WALRUM_REF)
    print('REF:', Wei(AMOUNT_WALRUM_REF))
    # check withdraw balance
    assert walrum_token.balanceOf(accounts[1])/10 ** 18 ==  AMOUNT_WALRUM_ETH


def test_exchange(ido_contract, walrum_token, usdt_token, accounts):
   #create first round 
    #start = datetime.datetime.now()
    start  = datetime.datetime.now() - datetime.timedelta(days = 1)
    start_date = int(datetime.datetime.timestamp(start))
    end = datetime.datetime.now() + datetime.timedelta(days = 1)
    end_date = int(datetime.datetime.timestamp(end))
    lock = datetime.datetime.now() + datetime.timedelta(days = 10)
    lock_date = int(datetime.datetime.timestamp(end))
    min_one_buy = 100 * 10 ** 6 
    max_one_buy = 0 
    ido_contract.addRound(start_date,
                         end_date,
                         AMOUNT_USDT_EXCHANGE, 
                         max_one_buy,
                         min_one_buy, 
                         lock_date,
                         USDT_PRICE,
                         "PRIVATE (7%)",
                         {'from': accounts[0]})
    # transfer walrum to accounts 1
    walrum_token.setFreezeAdmin(ido_contract.address, True, {'from': accounts[0]}) 
    usdt_token.transfer(accounts[1], AMOUNT_USDT_EXCHANGE, {'from': accounts[0]})
    walrum_token.transfer(ido_contract.address, AMOUNT_WALRUM + AMOUNT_WALRUM_REF, {'from': accounts[0]})
    balance_account1_usdt_before = usdt_token.balanceOf(accounts[1])
    assert balance_account1_usdt_before == AMOUNT_USDT_EXCHANGE
    usdt_token.approve(ido_contract.address, AMOUNT_USDT_EXCHANGE, {'from': accounts[1]})
    ido_contract.usdtWalrumExchange(AMOUNT_USDT_EXCHANGE, accounts[2], {'from': accounts[1]})
    assert usdt_token.balanceOf(accounts[3]) == AMOUNT_USDT_EXCHANGE * 0.2
    assert usdt_token.balanceOf(accounts[4]) == AMOUNT_USDT_EXCHANGE * 0.8
    assert walrum_token.balanceOf(accounts[1]) == AMOUNT_WALRUM
    assert walrum_token.balanceOf(accounts[2]) == AMOUNT_WALRUM_REF


def test_exchange(ido_contract, walrum_token, usdt_token, accounts):
   #create first round 
    #start = datetime.datetime.now()
    start  = datetime.datetime.now() - datetime.timedelta(days = 1)
    start_date = int(datetime.datetime.timestamp(start))
    end = datetime.datetime.now() + datetime.timedelta(days = 1)
    end_date = int(datetime.datetime.timestamp(end))
    lock = datetime.datetime.now() + datetime.timedelta(days = 10)
    lock_date = int(datetime.datetime.timestamp(end))
    min_one_buy = 0 
    max_one_buy = 0 
    ido_contract.addRound(start_date,
                         end_date,
                         AMOUNT_USDT_EXCHANGE, 
                         max_one_buy,
                         min_one_buy, 
                         0,
                         USDT_PRICE,
                         "PRIVATE (7%)",
                         {'from': accounts[0]})
    # transfer walrum to accounts 1
    walrum_token.setFreezeAdmin(ido_contract.address, True, {'from': accounts[0]}) 
    usdt_token.transfer(accounts[1], AMOUNT_USDT_EXCHANGE, {'from': accounts[0]})
    walrum_token.transfer(ido_contract.address, AMOUNT_WALRUM + AMOUNT_WALRUM_REF, {'from': accounts[0]})
    balance_account1_usdt_before = usdt_token.balanceOf(accounts[1])
    assert balance_account1_usdt_before == AMOUNT_USDT_EXCHANGE
    usdt_token.approve(ido_contract.address, AMOUNT_USDT_EXCHANGE, {'from': accounts[1]})
    ido_contract.usdtWalrumExchange(AMOUNT_USDT_EXCHANGE, accounts[2], {'from': accounts[1]})
    assert usdt_token.balanceOf(accounts[3]) == AMOUNT_USDT_EXCHANGE * 0.2
    assert usdt_token.balanceOf(accounts[4]) == AMOUNT_USDT_EXCHANGE * 0.8
    assert walrum_token.balanceOf(accounts[1]) == AMOUNT_WALRUM
    assert walrum_token.balanceOf(accounts[2]) == AMOUNT_WALRUM_REF



