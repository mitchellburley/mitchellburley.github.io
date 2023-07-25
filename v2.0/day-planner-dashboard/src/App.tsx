import Background from './components/background/Background';

import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"
import Login from "./components/login/Login";

export const App = () => {
  const isLoggedIn = false;
  const name = '';

  return (
  <ChakraProvider theme={theme}>
    {!isLoggedIn ? (<Login loggedIn={isLoggedIn} name={name}/>) : (<Background name={name}/>)}
  </ChakraProvider>
  )
}