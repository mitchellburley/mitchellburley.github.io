import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Box, Text, Flex, Spinner, AbsoluteCenter, Center } from '@chakra-ui/react'
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
    let weather = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_KEY}&q=Newcastle, Australia&days=10&aqi=no&alerts=no`);
    console.log(weather);
    this.setState({current: weather.data.current, forecast: weather.data.forecast.forecastday, loading: false})
  }
  render() {
    if (this.state.loading) {
      return (
      <Box borderWidth='0px' borderRadius='lg' bg={'rgba(45, 53, 80, 0.8)'} w={{base: '15em', md:'19em',lg:'34em' ,xl: '44em'}} h={{base:'15em', '2xl':'20em'}} marginLeft={'20pxs'} boxShadow={'rgba(0, 0, 0, 0.74) 0px 3px 8px'} color={'white'}>
        <Center h={'100%'}>
          <Spinner size={'xl'}></Spinner>
        </Center>
      </Box>
      )
    } else {
      return (
        <Box borderWidth='0px' borderRadius='lg' bg={'rgba(45, 53, 80, 0.8)'} w={{base: '15em', md:'19em',lg:'34em' ,xl: '44em'}} h={{base:'15em', '2xl':'20em'}} marginLeft={'20pxs'} boxShadow={'rgba(0, 0, 0, 0.74) 0px 3px 8px'} color={'white'}>
          <Box w={'100%'} h={'60%'}>
            
          </Box>
          <Box w={'100%'} h={'40%'}>
            <Flex direction={'row'} wrap={'nowrap'} justifyContent={'space-evenly'} h={'100%'}>
              {this.state.forecast.map((w: any) => 
                <Box borderWidth='0px' borderRadius='sm' w={{base: '2.5em', '2xl': '3.5em'}} h={{base: '4.5em', '2xl': '6em'}} bg={'whiteAlpha.500'} alignSelf={'center'}>
                  <Box w={'100%'} h={'30%'} pt={2}>
                  <Text fontSize={'xs'} textAlign={'center'}>
                      {w.date.slice(5, 10).split('-').reverse().join('-')}
                    </Text>
                  </Box>
                  <Box w={'100%'} h={'40%'} pt={1}>
                    <Text textAlign={'center'}>
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
