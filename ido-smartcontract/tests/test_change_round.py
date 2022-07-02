#!/usr/bin/python3

import pytest
import datetime

def test_change_round(ido_contract, accounts):
    start = datetime.datetime.now()
    start_date = int(datetime.datetime.timestamp(start))
    end = datetime.datetime.now() + datetime.timedelta(days = 1)
    end_date = int(datetime.datetime.timestamp(end))
    lock = datetime.datetime.now() + datetime.timedelta(days = 10)
    lock_date = int(datetime.datetime.timestamp(end))
    total_amount = 1000 * 10 ** 18
    min_one_buy = 1 * 10 ** 18
    max_one_buy = 10 * 10 ** 18
    usdt_price = 150
    ido_contract.addRound(start_date,
                         end_date,
                         total_amount, 
                         max_one_buy,
                         min_one_buy, 
                         lock_date,
                         usdt_price,
                         "PUPBLIC",
                         {'from': accounts[0]})

    assert ido_contract.RoundID() == 1
    #price in promille
    ido_contract.changeRound(1,start_date,
                         end_date,
                         total_amount, 
                         max_one_buy,
                         min_one_buy, 
                         lock_date,
                         120,
                         "PUPBLIC",
                         {'from': accounts[0]})
    print('Round', ido_contract.Rounds(1))
    assert ido_contract.Rounds(1)[10] == 120 
    


