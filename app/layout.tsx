import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Image from "next/image";
import CssBaseline from '@mui/material/CssBaseline';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NEXT APP',
  description: 'テスト用のアプリです',
}

export default function Layout(props: {
    children: React.ReactNode
    left:React.ReactNode
    right:React.ReactNode
  }
) {
  return (
    <html lang="ja">
      <body style={{backgroundSize:"cover"}}>
        {/* <CssBaseline /> */}
        <Box sx={{ 
            height: '10vh',
            width:'100%',
            left:"0%",
            top:"0%",
          }} 
        >
          {props.children}
        </Box>
        <Box sx={{ 
            height: '90vh',
            width:'100%',
            left:"0%",
            mt:"1%",
            // bgcolor: '#f0e68c', 
          }} 
        >
          <Grid container spacing={2} sx={{minHeight:"98%",maxHeight:"98%",ml:"1%",mr:"1%", maxWidth:"98%"}}>
            <Grid xs={2}>
              {props.left}
            </Grid>
            <Grid xs={10}>
              {props.right}
            </Grid>
          </Grid>
        </Box>
      </body>
    </html>

  )
}
