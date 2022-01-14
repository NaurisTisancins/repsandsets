import React from 'react'
import './../../styles/pageframe.styles.scss';

export function PageFrame(props) {
  return (
    <div className="pageframe">
      {props.children}
    </div>
  )
}


