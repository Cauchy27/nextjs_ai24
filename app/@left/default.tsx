import Image from "next/image";

import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import Typography from '@mui/material/Typography';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// import Accordion from '@mui/material/Accordion';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

// import SideNav from "../_component/side-nav";

export interface AccordionMenu {
  acNum: number;
  acTitle: string;
  acDetail:string;
  disable:boolean;
}
const style = {
  width: '100%',
  maxWidth: 360,
  bgcolor: 'background.paper',
};

export default function Left() {
  // const AccordionArray :AccordionMenu[] = [
  //   {
  //     acNum:1,
  //     acTitle: "テストメニュー1",
  //     acDetail:"これはテスト用のアコーディオンメニューの中身です。",
  //     disable:false,
  //   },
  //   {
  //     acNum:1,
  //     acTitle: "テストメニュー2",
  //     acDetail:"これはテスト用のアコーディオンメニュー1の中身です。",
  //     disable:false,
  //   },
  //   {
  //     acNum:1,
  //     acTitle: "テストメニュー3",
  //     acDetail:"これはテスト用のアコーディオンメニュー2の中身です。",
  //     disable:false,
  //   },
  //   {
  //     acNum:1,
  //     acTitle: "テストメニュー4",
  //     acDetail:"これはテスト用のアコーディオンメニュー3の中身です。",
  //     disable:true,
  //   },
  //   {
  //     acNum:1,
  //     acTitle: "テストメニュー5",
  //     acDetail:"これはテスト用のアコーディオンメニュー4の中身です。",
  //     disable:false,
  //   },
  // ];
  return (
    <React.Fragment>
      <List sx={style} component="nav" aria-label="mailbox folders">
      <ListItem button>
        <ListItemText primary="メニュー１" />
      </ListItem>
      <Divider />
      <ListItem button divider>
        <ListItemText primary="メニュー２" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="メニュー３" />
      </ListItem>
      <Divider light />
      <ListItem button>
        <ListItemText primary="メニュー４" />
      </ListItem>
    </List>
      
      {
        // AccordionArray.map((accordion)=>{
        //   return (
        //     <Accordion key={accordion.acNum} disabled={accordion.disable}>
        //       <AccordionSummary
        //         expandIcon={<ExpandMoreIcon />}
        //         aria-controls="panel1a-content"
        //         id="panel1a-header"
        //       >
        //         <Typography align='center'>{accordion.acTitle}</Typography>
        //       </AccordionSummary>
        //       <AccordionDetails>
        //         <Typography>
        //           {accordion.acDetail}
        //         </Typography>
        //       </AccordionDetails>
        //     </Accordion>
        //   );
        // })
      }
    </React.Fragment>
  );
}