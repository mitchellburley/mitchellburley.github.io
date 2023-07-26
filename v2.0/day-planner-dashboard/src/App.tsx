import Background from './components/background/Background';
import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"
import Login from "./components/login/Login";
import React from 'react';

export const App = () => {
  const [name, setName] = React.useState('');
  const [isLoggedIn, setLoggedIn] = React.useState(false);

  return (
  <ChakraProvider theme={theme}>
    {!isLoggedIn ? (<Login setLoggedIn={setLoggedIn} setName={setName}/>) : (<Background name={name}/>)}
  </ChakraProvider>
  )
}