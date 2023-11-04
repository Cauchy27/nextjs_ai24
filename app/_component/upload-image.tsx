"use client"

import { useState, useEffect, useRef,useCallback} from "react";
import { GetStaticProps, NextPage } from "next";
// import Image from "next/image";

import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SendIcon from '@mui/icons-material/Send';
import { styled } from '@mui/material/styles';

import ReviewCard from "./card";

import { createClient } from "@supabase/supabase-js";
import { type } from "os";

import ImageCard from "./image-card";
import useGetElementProperty from "./get-image-position";

type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]
type Database = {
  public: {
    Tables: {
      movies: {
        Row: {               // the data expected from .select()
          id: number
          name: string
          data: Json | null
        }
        Insert: {            // the data to be passed to .insert()
          id?: never         // generated columns must not be supplied
          name: string       // `not null` columns with no default must be supplied
          data?: Json | null // nullable columns can be omitted
        }
        Update: {            // the data to be passed to .update()
          id?: never
          name?: string      // `not null` columns are optional on .update()
          data?: Json | null
        }
      }
    }
  }
}

const supabase = createClient<Database>(
  "https://txzmfottvrwpxwfttemf.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4em1mb3R0dnJ3cHh3ZnR0ZW1mIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkwMDUxODAsImV4cCI6MjAxNDU4MTE4MH0.GcQBkFXhhMRkyRtMg9XpYYomA3nUaSyriYyLliKwqW0"
);

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const UploadImage = (): JSX.Element => {
  const [image, setImage] = useState<File | null>(null);
  const [createObjectURL, setCreateObjectURL] = useState<any>(null);
  const [filePoint, setFilePoint] = useState<Number>(0);

  const [Loading,setLoading]=useState<boolean>(false);
  const [FileId, setFileId] = useState<string>("");
  const [data, setData] = useState<any|null>([]);
  const [OriginalImage_W,setOriginalImage_W] = useState<Number>(100);
  const [OriginalImage_H,setOriginalImage_H] = useState<Number>(100);

  const test:boolean = true;

  const testData:any = '[{"x1": 570.6658935546875, "y1": 43.275543212890625, "x2": 658.0770263671875, "y2": 309.444091796875, "wave": "flute2"}, {"x1": 5.249404430389404, "y1": 1.4457319974899292, "x2": 1200.0, "y2": 893.9005737304688, "wave": "guitar6"}, {"x1": 104.89974212646484, "y1": 330.41998291015625, "x2": 572.8209228515625, "y2": 774.8350219726562, "wave": "piano2"}]';

  // const targetRef = useRef(null);
  // const { getElementProperty } =
  //   useGetElementProperty<HTMLDivElement>(targetRef);

  const uploadToClient = async(event:React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImage(file);
      setCreateObjectURL(URL.createObjectURL(file));
      setTimeout(()=>{
        const img:any = new Image();

        img.onload = () => {
          const size = {
            originalwidth: img.naturalWidth,
            width: img.width,
            originalheight: img.naturalHeight,
            height: img.height,
          };
          // URL.revokeObjectURL(img.src);
          console.log(size);
          setOriginalImage_W(img.naturalWidth);
          setOriginalImage_H(img.naturalHeight);
        }
        img.src = URL.createObjectURL(file);
      },1000)
      console.log(createObjectURL);

    }

    // setTimeout(() => {
    //   console.log("Delayed for 1 second.");
    //   handleFileUpload();
    // }, 1000);
  }

  const getImageUrl = async() => {
    let uploadUrl:any = createObjectURL;
    uploadUrl = createObjectURL.split("/");
    console.log(uploadUrl);
    return await handleFileUpload();
  }
  const handleFileUpload = async() => {
		const file = image;

    const imageIds:any = createObjectURL.split("/");
    const imageId:string = imageIds[3];
	
		if (!file) return;

        const storage = await supabase.storage.from("image_dual");
        const { data, error } = await storage.upload(imageId, file);
    
        if (error) {
          // TODO アップロードエラーの処理
          console.log(error);
        } else {
          // TODO アップロード成功の処理
    			console.log(data);
    
          // TODO 画像へのurlを使いたい場合
          const url:any = await supabase.storage.from("image_dual").getPublicUrl(imageId);
          
          console.log("Delayed for 1 second.");
          setFileId(imageId);
          console.log(url.data.publicUrl);
          console.log(url);
          return imageId;
        }
        return "fail";
	};

  const getPlayers = async(testFlag:boolean) => {
    const Id:any = await getImageUrl()
    setLoading(true);
    const data:any={
      id:Id,
      param:"send"
    }
    console.log(data);
    console.log("start");

    if(testFlag){
      console.log(JSON.parse(testData));
      setData(JSON.parse(testData));
      return "test";
    }

    // 仕方がないので、IPベタ書き
    await fetch('http://192.168.40.2:5555/',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then((res_data)=>{
      setData(res_data);
      console.log(res_data)
      return res_data;
    });
    console.log("end");
  }
  // キーを割り当て
  const keyFunction = useCallback((event:any) => {
    console.log(event.keyCode);
  }, []);
  useEffect(() => {
    document.addEventListener("keydown", keyFunction, false);
  }, []);

  return (
    <>
      <div className="mb-4" id="test"></div>
      {
        image && 
        <div id="target">
          <img 
            id="target_image" 
            className="flex justify-center items-center" 
            src={createObjectURL} 
            alt="test" 
            // ref={targetRef} 
            style={{
              minWidth:OriginalImage_W +"px",
              minHeight:OriginalImage_H + "px"
            }}
          />
          <ImageCard 
            data={
              data
              // testData
            } 
            start_x={1} 
            start_y={2}
          />
        </div>
      }
      <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} sx={{ml:"30%",mr:"30%",mt:"3%",width:"40%",height:"15%"}}>
          Upload Image
          <VisuallyHiddenInput type="file" id="file-input" accept="image/*" name="myImage" onChange={uploadToClient} />
        </Button>
      {/* <input id="file-input" className="hidden" type="file" accept="image/*" name="myImage" onChange={uploadToClient} /> */}
      {
        image && 
        <Button component="label" variant="contained" startIcon={<SendIcon />} color="success" sx={{ml:"30%",mr:"30%",mt:"3%",width:"40%",height:"20%"}} onClick={()=>{getPlayers(test);}}>Go to Generate</Button>
      }
      
    </>
  );
}
export default UploadImage;