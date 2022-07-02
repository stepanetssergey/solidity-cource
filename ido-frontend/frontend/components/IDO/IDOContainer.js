import React from 'react'
import LeftComponent from './LeftComponent' 
import RightComponent from './RightComponent'

const IDOContainer = () => {
  return (
			<section className="buy_tokens_container">
				<div className="container">
					<div className="capabilities__inner">
            <h2 className="capabilities__title title anim anim--title">buy wlm token</h2>
            <p className="ido__text anim anim--text ">
               An exclusive opportunity to become one of the first holders of WLM TOKEN
            </p>
					</div>
				</div>
				<div className="container">
        <div className="ido_left_right_container">
          <LeftComponent/>
          <RightComponent/>
        </div>
      </div>
			</section>
  )
}

export default IDOContainer
