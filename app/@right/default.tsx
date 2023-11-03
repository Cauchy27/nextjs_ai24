import Image from "next/image";

import * as React from 'react';
import { useState } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import Typography from '@mui/material/Typography';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import UploadImage from "../_component/upload-image";

export default function Right() {
  return (
    <React.Fragment>
    <CssBaseline />
    <Box sx={{ 
        bgcolor: '#f0e68c', 
        height: '100%',
        width:'99%',
        ml:"1%"
      }} 
    >
      <Typography variant="h4" gutterBottom align="center">
        ここに画像をアップロードしてください
      </Typography>
      
      <UploadImage/>
      
    </Box>
  </React.Fragment>
  );
}