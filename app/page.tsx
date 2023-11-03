import Image from 'next/image'

import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import Typography from '@mui/material/Typography';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import AppBar from "./_component/appbar";
const Home = () => {
  return (
    <React.Fragment>
      <AppBar 
        title="AIハッカソン_チームdual"
        bgcolor='#cfe8fc'
        height='10vh'
        width='100vw'
      />
    </React.Fragment>
  )
}

export default Home;
