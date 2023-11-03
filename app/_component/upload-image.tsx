"use client"

import { useState, useEffect} from "react";
import { GetStaticProps, NextPage } from "next";

import Button from '@mui/material/Button';

import ReviewCard from "./card";

import { createClient } from "@supabase/supabase-js";
import { type } from "os";

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
)

const UploadImage = (): JSX.Element => {
  const [image, setImage] = useState<File | null>(null);
  const [createObjectURL, setCreateObjectURL] = useState<any>(null);
  const [filePoint, setFilePoint] = useState<Number>(0);

  const [Loading,setLoading]=useState<boolean>(false);
  const [PokeData, setPokeData] = useState<any>(null);
  const [PokeImage, setPokeImage] = useState<string>("");
  const [imageId, setImageId] = useState<string>("test")

  const uploadToClient = async(event:React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      generateFilePoint(file.size);
      
      setImage(file);
      setCreateObjectURL(URL.createObjectURL(file));
      console.log(filePoint);
      console.log(createObjectURL);
    }
  }

  const getImageUrl = () => {
    let uploadUrl:any = createObjectURL;
    uploadUrl = createObjectURL.split("/");
    setImageId(uploadUrl[3]);
    handleFileUpload();
  }
  const handleFileUpload = async() => {
		const file = image;
	
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
          const url = await supabase.storage.from("image_dual").getPublicUrl(imageId);
        }
	};


  const generateFilePoint = (fileSize:any) => {
    setFilePoint(Math.round((fileSize/1000 - Math.floor(fileSize/1000))*1008));
  }

  const getPoke = (id:Number) => {
    setLoading(true);
    const data:any={
      url:createObjectURL,
      param:"test"
    }
    console.log("start");
    fetch('https://192.168.40.2:5555/',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then((res_data)=>{
      // setTasks(res_data);
      console.log(res_data)
      // return res_data;
    });
    console.log("end");

    // fetch('https://pokeapi.co/api/v2/pokemon/'+id)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setPokeData(data);
    //     setLoading(false);
    //     console.log(data);
    //     setImage(null);
    //   })

  }

  return (
    <>
      <Button
          onClick={
            ()=>{
              getImageUrl();
            }
          }
        >
          画像のパス確認
        </Button>
      <div className="mb-4"></div>
      {
        image && 
        <img className="flex justify-center items-center" src={createObjectURL} alt="test" />
      }
      {
        filePoint != 0 && 
        <Button
          onClick={
            ()=>{
              getPoke(filePoint);
            }
          }
        >
          君に決めた！
        </Button>
      }
      {
        PokeData && !image && 
        <ReviewCard
          title={PokeData.name}
          imagePath={PokeData.sprites.other['official-artwork'].front_default}
          description={""}
        />

      }
      <label htmlFor="file-input" className="bg-primary-900 text-white-900 dark:bg-dark-900 flex justify-center items-center px-4 py-2 rounded mb-6 w-full" >
        <svg xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 hover:cursor-pointer hover:bg-gray-700"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </label>
      <input id="file-input" className="hidden" type="file" accept="image/*" name="myImage" onChange={uploadToClient} />
    </>
  );
}
export default UploadImage;