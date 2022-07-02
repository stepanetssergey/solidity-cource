#!/usr/bin/python3

import pytest
import datetime

def test_add_round(ido_contract, accounts):
    start = datetime.datetime.now()
    start_date = int(datetime.datetime.timestamp(start))
    end = datetime.datetime.now() + datetime.timedelta(days = 1)
    end_date = int(datetime.datetime.timestamp(end))
    lock = datetime.datetime.now() + datetime.timedelta(days = 10)
    lock_date = int(datetime.datetime.timestamp(end))
    total_amount = 1000 * 10 ** 18
    min_one_buy = 1 * 10 ** 18
    max_one_buy = 10 * 10 ** 18
    usdt_price = 120
    #price in promille
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
    


