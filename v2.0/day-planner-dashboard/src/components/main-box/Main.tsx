import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Welcome from '../welcome-box/Welcome'
import Weather from '../weather-box/Weather'
import Tasks from '../task-box/Tasks'
import { AbsoluteCenter } from '@chakra-ui/react'

type MainProps = { 
  name: string
}

const Main = (props: MainProps) => {
  const {name} = props;

  function storeName() {
    localStorage.setItem("Name", name);
  }
  storeName();

  return (
    <AbsoluteCenter style={{zIndex: 1}}>
      <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', gap: '1rem'}}>
        <Welcome name={name}/>
        <Weather />
      </div>
      <div style={{marginTop: '20px'}}>
        <Tasks />
      </div>
    </AbsoluteCenter>
  )
}

export default Main
