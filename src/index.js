import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { Provider } from "react-redux";
// import { theme } from "./URLS/config";
import App from "./App";
import './index.css'
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ChakraProvider >
    <Provider store={store}>
      
    <BrowserRouter>
      <ColorModeScript initialColorMode="light" />
      <App />
    </BrowserRouter>
   </Provider>
  </ChakraProvider>
);
