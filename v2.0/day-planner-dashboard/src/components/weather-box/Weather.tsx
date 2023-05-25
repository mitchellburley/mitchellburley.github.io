import React, { Component, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Text, Flex } from '@chakra-ui/react'
import axios from 'axios'
import { SunIcon } from '@chakra-ui/icons'

class Weather extends Component {
  state= {
    loading: false,
    current: Object,
    forecast: []
  }

  componentDidMount(): void {
    this.getWeather();
  }

  async getWeather() {
    this.setState({loading: true})
    let weather = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=Newcastle, Australia&days=14&aqi=no&alerts=no`);
    this.setState({current: weather.data.current, forecast: weather.data.forecast.forecastday, loading: false})
  }
  render() {
    if (this.state.loading) {
      <Box>

      </Box>
    } else {
      return (
        <Box borderWidth='0px' borderRadius='lg' bg={'rgba(45, 53, 80, 0.8)'} w={{base: '15em', md:'19em',lg:'34em' ,xl: '44em'}} h={{base:'15em', '2xl':'20em'}} marginLeft={'20pxs'} boxShadow={'rgba(0, 0, 0, 0.74) 0px 3px 8px'} color={'white'}>
          <Box w={'100%'} h={'60%'} bg={'white'}>
            <h1>Weather</h1>
          </Box>
          <Box w={'100%'} h={'40%'}>
            <Flex direction={'row'} wrap={'nowrap'} justifyContent={'space-evenly'} >
              {this.state.forecast.map((w: any) => 
                <Box borderWidth='0px' borderRadius='sm' w={'2.5em'} h={'4.5em'} bg={'whiteAlpha.500'} mt={3}>
                  <Box w={'100%'} h={'70%'}>
                    <Text textAlign={'center'} pt={2}>
                      <SunIcon ></SunIcon>
                    </Text>
                  </Box>
                  <Box w={'100%'} h={'30%'}>
                    <Text fontSize={'xs'} textAlign={'center'}>
                      {w.day.maxtemp_c}
                    </Text>
                  </Box>
                </Box>
              )}
            </Flex>
          </Box>
        </Box>
      )
    }
  }
  }

export default Weather
