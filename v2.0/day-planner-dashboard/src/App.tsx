import Background from './components/background/Background';

import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"
import Login from "./components/login/Login";

export const App = () => {
  const isLoggedIn = false;

  return (
  <ChakraProvider theme={theme}>
    {!isLoggedIn ? (<Login />) : (<Background />)}
  </ChakraProvider>
  )
}