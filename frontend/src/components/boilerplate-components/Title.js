import React from 'react'
import './title.css'

function Title(props) {
  return (
    <div className="boilerplate-title">
      <div>{props.title}</div>
    </div>
  )
}

export default Title