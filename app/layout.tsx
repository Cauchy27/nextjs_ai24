import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Image from "next/image";
import CssBaseline from '@mui/material/CssBaseline';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Instrumental Sight',
  description: '24時間AIハッカソン チームdual発表作品',
}

export default function Layout(props: {
    children: React.ReactNode
    left:React.ReactNode
    right:React.ReactNode
  }
) {
  return (
    <html lang="ja" style={{backgroundSize:"cover"}}>
      <body style={{backgroundSize:"cover"}}>
        {/* <CssBaseline /> */}
        <Box sx={{ 
            height: '100px',
            width:'100%',
            left:"0%",
            top:"0%",
          }} 
        >
          {props.children}
        </Box>
        <Box sx={{ 
            height: '50vh',
            width:'100%',
            left:"0%",
            mt:"1%",
            // bgcolor: '#f0e68c', 
          }} 
        >
              {props.right}
        </Box>
      </body>
    </html>

  )
}
