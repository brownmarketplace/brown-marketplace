import React from 'react'
import './title.css'

function Title(props) {
  return (
    <div className="boilerplate-title">
      {props.title}
    </div>
  )
}

export default Title