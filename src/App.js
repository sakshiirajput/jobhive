import React, { useEffect } from 'react'
import Application from './Application/Application'
import { Button, useColorMode } from '@chakra-ui/react'
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { loadProfile } from './redux/actions/User/User';
import { useDispatch } from 'react-redux';


const App = () => {
  const dispatch = useDispatch();
  const { colorMode, toggleColorMode } = useColorMode();
  useEffect(() => {
    dispatch(loadProfile())
  })



  return (
    <div>
      {/* <Button
        
        rounded={'full'}
   
        pos={"absolute"}
        top={3}
        right={3}
        variant={'solid'}
        p  = {3}
        onClick={toggleColorMode}
      >
        {colorMode == "dark" ? <SunIcon /> : <MoonIcon />}
      </Button> */}
      <Application />
    </div>
  );
}

export default App