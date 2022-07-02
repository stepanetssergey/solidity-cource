#!/usr/bin/python3

from brownie import IDOContract, accounts, Wei
import brownie.network as network


# 1. usdt address, 2. walrum address 3. first fee reciever 20%  4. second fee reciever 80%
#    20%
#    0xb938873004dfaf57632114a81d421947af5513a9
#    80%
#    0xA18282092adA1E78C7A158decDae218AbD4b54a3

#name: SEED (7%) tokens: 7000000 price: 0.1$ start: 16.05.22 - end: 30.05.22 перший
#name: PRIVATE SEED (7%) tokens: 7000000 price: 0.125$ start: 15.11.2022 - 29.11.2022 другий 
#name: PUBLIC PRESALE (7%) tokens: 7000000 price: 0.15$ start: 3.03.2023 - 17.03.2023 третій
# first lock: 1668470400
# second start: 1668470400 end: 1669766399 
# second lock: 1646265600
# third start: 1646265600 end: 1647561599
######## rinkeby ###########
# one 20 0xaFb3c7d4Fe6A2210FC27C17cf86335DaFA133681 account 4
# two 80 0x0669C1Cba9fd88cafef1540721244fd6EF0E01E4 account 5
RINKEBY_USDT = "0xFe14B71FEdf512BE9218B493E6DCD09466d176f3" 
RINKEBY_WALRUM = "0x6cEfEab92fE11b32F6cabB6542EE1d425d7cEc74"
RINKEBY_20_WITHDRAW = "0xaFb3c7d4Fe6A2210FC27C17cf86335DaFA133681" 
RINKEBY_80_WITHDRAW ="0x0669C1Cba9fd88cafef1540721244fd6EF0E01E4" 

MAINNET_USDT = "0xdAC17F958D2ee523a2206206994597C13D831ec7"
MAINNET_WALRUM = "0x56d8AA7128652EAf13E5B1c36cdEe4920fc35506"
MAINNET_20_WITHDRAW = "0xb938873004dfaf57632114a81d421947af5513a9"
MAINNET_80_WITHDRAW = "0xA18282092adA1E78C7A158decDae218AbD4b54a3"

def main():
    if network.show_active() == 'development':
        acct = accounts[0]
    elif network.show_active() == 'rinkeby':
       acct = accounts.load('deploy')
       ido_contract = IDOContract.deploy(RINKEBY_USDT,
                          RINKEBY_WALRUM,
                          RINKEBY_20_WITHDRAW,
                          RINKEBY_80_WITHDRAW,
                          {'from': acct})
       ido_contract.addRound(1652709383,
                             1653954983,
                             Wei("7000000 ether"), 
                             0,
                             100000000, 
                             1668470400,
                             100,
                             "SEED (7%)",
                             {'from': acct})

       ido_contract.addRound(1668470400,
                             1653954983,
                             Wei("7000000 ether"), 
                             0,
                             100000000,
                             1646265600,
                             125,
                             "PRIVATE SEED (7%)",
                             {'from': acct})
       ido_contract.addRound(1677801600,
                             1679097599,
                             Wei("7000000 ether"), 
                             0,
                             100000000,
                             0,
                             150,
                             "PUBLIC PRESALE (7%)",
                             {'from': acct})
       return

    elif network.show_active() == 'mainnet':
       acct = accounts.load('deploy')
       ido_contract = IDOContract.deploy(MAINNET_USDT,
                          MAINNET_WALRUM,
                          MAINNET_20_WITHDRAW,
                          MAINNET_80_WITHDRAW,
                          {'from': acct})
       ido_contract.addRound(1652709383,
                             1653954983,
                             Wei("7000000 ether"), 
                             0,
                             100000000,
                             1668470400,
                             100,
                             "SEED (7%)",
                             {'from': acct})

       ido_contract.addRound(1668470400,
                             1669766399,
                             Wei("7000000 ether"), 
                             0,
                             100000000,
                             1646265600,
                             125,
                             "PRIVATE SEED (7%)",
                             {'from': acct})
       ido_contract.addRound(1677801600,
                             1679097599,
                             Wei("7000000 ether"), 
                             0,
                             100000000,
                             0,
                             150,
                             "PUBLIC PRESALE (7%)",
                             {'from': acct})
       return

       
    else:
       print(acct)
       return IDOContract.deploy("0xfB388C652329e7b339DF441BA79e727637f82D3c", "0xa8196f57250E9Bd7472de01f326d1d4c06F38f4b",  {'from': acct})
