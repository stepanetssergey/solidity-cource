import React from 'react'


const Loading = () => {
  React.useEffect (() => {
     window.jQuery = require('../public/static/js/vendor')
  },[])
  return <></>
}

export default Loading
