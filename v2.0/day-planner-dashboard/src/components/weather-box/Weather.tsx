import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Box } from '@chakra-ui/react'
import axios from 'axios'

export class Weather extends Component {
  static propTypes = {

  }

  async componentDidMount() {
    this.getWeather();
  }
  
  async getWeather() {
    let weather = axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=Newcastle, Australia&days=7&aqi=no&alerts=no`).then(res => {
      console.log(res);
    });
  }
  

  render() {
    return (
      <Box borderWidth='0px' borderRadius='lg' bg={'rgba(45, 53, 80, 0.8)'} w={'30rem'} h={'15rem'} marginLeft={'20pxs'} boxShadow={'rgba(0, 0, 0, 0.74) 0px 3px 8px'} color={'white'}>
        <Box p='6' >
          <h1>Weather</h1>
        </Box>
      </Box>
    )
  }
}

export default Weather
