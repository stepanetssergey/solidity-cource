import React from 'react'
import Image from 'next/image'
import useIDOContract from '../../hooks/useIDOContract'
import dayjs from 'dayjs'


const LeftComponent = () => {
  const idoData = useIDOContract()
  console.log(idoData)
  const getCurrentRoundWalrum = (list, currentRound) => {
    return list[currentRound-1].totalForSale/10**18;
  }
  const getPrice = (list, currentRound) => {
    return list[currentRound-1].usdt_price/1000
  }
  const getTotalRound = (list, currentRound) => {
    var tokens = list[currentRound-1].totalForSale/10**18;
    var price = list[currentRound-1].usdt_price/1000
    return tokens * price 
  }
  const getRoundName = (list, currentRound) => {
    return list[currentRound - 1].round_name/1000
  }
  return (
    <div className="ido_left_container">
      <div className="ido_left_content_container">
      <div className="ido_rounds_container">
        {idoData == undefined
          ?
          <div>Loading....</div>
        :
            idoData.roundData.map((value, key) => {
            return (
              <div key={`key-round-${key}`} className="ido_round" style={idoData.currentRound - 1 == key?{}:{background: 'rgba(255, 255, 255, 0.06)'}}>
                <div className="ido_round_text" style={idoData.currentRound - 1 == key?{}:{color:'rgba(255, 255, 255, 0.38)'}}>{value.round_name}</div>
                <div className="ido_round_text_date" style={idoData.currentRound - 1 == key?{}:{color:'rgba(255, 255, 255, 0.38)'}}>{dayjs(value.start * 1000).format('DD/MM/YYYY')}</div>
              </div>
            )
        })}
        
      </div>
        <div className="ido_walrum_rate_container">
          <div className="ido_walrum_icon_text">
            <Image src="/static/img/walrum-token.png" width="40" height="40" alt=""/>
            <div className= "ido_walrum_token_text">Walrum token</div>
          </div>
          <div className="ido_walrum_rate_text">1 walrum = {idoData == undefined?'Loading...':getPrice(idoData.roundData, idoData.currentRound).toFixed(2)+ '$'} usdt</div>
        </div>
        <div className="ido_walrum_calculation_container">
          <div className="ido_key_container">
            <div className="ido_calc_round">
            <Image src="/static/img/key.svg" width="25" height="25" alt=""/>
            </div>
            <div className="ido_calculation_text">Tokens <span className="calculation_text">
            {idoData == undefined? 'Loading...' : getCurrentRoundWalrum(idoData.roundData, idoData.currentRound)}
            </span></div>
          </div>
          <div className="ido_key_container">
            <div className="ido_calc_round"><span className="ido_calc_round_text">$</span></div>
            <div className="ido_calculation_text">Price <span className="calculation_text">{idoData == undefined?'Loading...':getPrice(idoData.roundData, idoData.currentRound).toFixed(2)+ '$'}</span></div>
          </div>
          <div className="ido_key_container">
            <div className="ido_calc_round"><span className="ido_calc_round_text">=</span></div>
            <div className="ido_calculation_text">{idoData == undefined?'Loading...':getTotalRound(idoData.roundData, idoData.currentRound).toFixed(0)+ '$'}</div>
          </div>
        </div>
        <div className="ido_left_text_container">
          <div className="ido_left_text">
            Продажа WLM токенов будет происходить в 3 этапа, 2 из которых будут доступны долько для инвесторов и партнеров платформы. Всего до момента старта платформы будет продано 10% токенов.   
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeftComponent
