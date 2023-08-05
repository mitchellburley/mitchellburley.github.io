import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Box, Text, Flex, Spinner, AbsoluteCenter, Center, Image } from '@chakra-ui/react'
import axios from 'axios'
import { SunIcon } from '@chakra-ui/icons'

class Weather extends Component {
  state= {
    loading: false,
    current: {
      condition: {
        text: '',
        icon: ''
      },
      temp_c: 0,
      humidity: 0,
      feelslike_c: 0,
      pressure_mb: 0,
      wind_kph: 0
    },
    forecast: [],
    weatherErrorText: ''
  }

  componentDidMount(): void {
    this.getWeather();
  }

  async getWeather() {
    this.setState({loading: true})
    await navigator.geolocation.getCurrentPosition(this.getPosition, this.errorPosition);
  }

  async getPosition(position: any) {
    let weather = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_KEY}&q=${position.coords.latitude},${position.coords.longitude}&days=10&aqi=no&alerts=no`);
    var forecast = this.getNext10HourWeather(weather.data.forecast, parseInt(weather.data.location.localtime.split(' ')[1].split(':')[0]));
    console.log(forecast);
    this.setState(
      {
      current: weather.data.current, 
      forecast: forecast,
      loading: false,
      weatherErrorText: ''
      }
    )
  }

  errorPosition() {
    // this.setState({weatherErrorText: "Geolocation has been denied or is not supported by this browser"});
  }

  getNext10HourWeather(forecast: any, currentHour: number) {
    console.log(forecast);
    console.log(currentHour);
    if (currentHour + 10 > 24) {
      let todayWeather = forecast.forecastday[0].hour.slice(currentHour, 24);
      let nextDayWeather = forecast.forecastday[1].hour.slice(0, currentHour + 10 - 24);
      return todayWeather.concat(nextDayWeather);
    }
    else {
      return forecast.forecastday[0].hour.slice(currentHour, currentHour + 10);
    }
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
            <Flex direction={'row'} wrap={'nowrap'} h={'100%'}>
              <Box w={'50%'} pl={4} pt={10}>
                <Box w={'100%'} h={'50%'}>
                  <Center h={'100%'}>
                    <Box>
                      <SunIcon w={14} h={14} pr={3}></SunIcon>
                    </Box>
                    <Box>
                      <Text fontSize={'3xl'}>{this.state.current.temp_c}&deg;</Text>
                      <Text fontSize={'sm'}>{this.state.current.condition.text}</Text>
                    </Box>
                  </Center>
                </Box>
                <Box w={'100%'} h={'30%'}>
                  <Center h={'100%'}>
                    <Text fontSize={'3xl'} textAlign={'center'}>Newcastle, AU</Text>
                  </Center>
                </Box>
              </Box>
              <Box w={'50%'} h={'100%'} pr={4} pt={10} pb={3} pl={8}>
                  <Flex direction={'row'} wrap={'wrap'} h={'100%'} justifyContent={'space-evenly'}>
                    <Box w={'50%'} h={'50%'}>
                      <Flex direction={'row'} wrap={'wrap'} h={'100%'}>
                        <SunIcon pr={2} w={6} h={6}></SunIcon>
                        <Text fontSize={'sm'}>
                          Humidity <br></br> <Text fontSize={'lg'}>{this.state.current.humidity}%</Text>
                        </Text>
                      </Flex>
                    </Box>
                    <Box w={'50%'} h={'50%'}>
                    <Flex direction={'row'} wrap={'wrap'} h={'100%'}>
                        <SunIcon pr={2} w={6} h={6}></SunIcon>
                        <Text>
                          Feels like <br></br><Text fontSize={'lg'}>{this.state.current.feelslike_c}&deg;</Text>
                        </Text>
                      </Flex>
                    </Box>
                    <Box w={'50%'} h={'50%'}>
                      <Flex direction={'row'} wrap={'wrap'} h={'100%'}>
                        <SunIcon pr={2} w={6} h={6}></SunIcon>
                        <Text>
                          Air pressure <br></br> <Text fontSize={'lg'}>{this.state.current.pressure_mb} hPa</Text>
                        </Text>
                      </Flex>
                    </Box>
                    <Box w={'50%'} h={'50%'}>
                      <Flex direction={'row'} wrap={'wrap'} h={'100%'}>
                        <SunIcon pr={2} w={6} h={6}></SunIcon>
                        <Text>
                          Wind speed <br></br><Text fontSize={'lg'}>{this.state.current.wind_kph} km/h</Text>
                        </Text>
                      </Flex>
                    </Box>
                  </Flex>
              </Box>
            </Flex>
          </Box>
          <Box w={'100%'} h={'40%'} >
            <Flex direction={'row'} wrap={'nowrap'} justifyContent={'space-evenly'} h={'100%'}>
              {this.state.forecast.map((w: any) => 
                <Box borderWidth='0px' borderRadius='md' w={{base: '2.5em', md:'3em', '2xl': '3.5em'}} h={{base: '4.5em', '2xl': '6em'}} bg={'whiteAlpha.500'} alignSelf={'center'}>
                  <Box w={'100%'} h={'45%'} pt={1}>
                  <Text fontSize={'xs'} textAlign={'center'}>
                      {w.time.slice(5, 10).split('-').reverse().join('-')}
                    </Text>
                  <Text fontSize={'xs'} textAlign={'center'}>
                      {w.time.split(' ')[1]}
                    </Text>
                  </Box>
                  <Box w={'100%'} h={'30%'}>
                    <Text textAlign={'center'}>
                      <SunIcon ></SunIcon>
                    </Text>
                  </Box>
                  <Box w={'100%'} h={'20%'}>
                    <Text fontSize={'xs'} textAlign={'center'}>
                      {w.temp_c}
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
