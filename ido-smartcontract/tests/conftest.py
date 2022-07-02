#!/usr/bin/python3

import pytest


@pytest.fixture(scope="function", autouse=True)
def isolate(fn_isolation):
    # perform a chain rewind after completing each test, to ensure proper isolation
    # https://eth-brownie.readthedocs.io/en/v1.10.3/tests-pytest-intro.html#isolation-fixtures
    pass

# deploy test usdt token
@pytest.fixture(scope="module")
def usdt_token(USDT, accounts):
    return USDT.deploy("TestUSDT", "USDT", 18, 100 * 1000000 * 10 ** 6, {'from': accounts[0]})

#@pytest.fixture(scope="module")
#def usdt_token(TetherToken, accounts):
#    return TetherToken.deploy("TestUSDT", "USDT", 6, 100 * 1000000 * 10 ** 6, {'from': accounts[0]})

# deploy test walrum token
#  
@pytest.fixture(scope="module")
def walrum_token(WalrumToken, accounts):
    return WalrumToken.deploy("Walrum", "WLRM", 18, 100 * 1000000 * 10 ** 18, {'from': accounts[0]})

# deploy IDO contract
@pytest.fixture(scope="module")
def ido_contract(IDOContract, usdt_token, walrum_token,  accounts):
    return IDOContract.deploy(usdt_token.address,
                              walrum_token.address,
                              accounts[3],
                              accounts[4],
                              {'from': accounts[0]})

