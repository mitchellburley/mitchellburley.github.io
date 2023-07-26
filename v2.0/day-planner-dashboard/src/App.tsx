import Background from './components/background/Background';
import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"
import Login from "./components/login/Login";
import React from 'react';

export const App = () => {
  const [name, setName] = React.useState(localStorage.getItem("Name") || "");
  const [isLoggedIn, setLoggedIn] = React.useState(false);

  return (
  <ChakraProvider theme={theme}>
    {!isLoggedIn && localStorage.getItem("Name") === null ? (<Login setLoggedIn={setLoggedIn} setName={setName}/>) : (<Background name={name}/>)}
  </ChakraProvider>
  )
}