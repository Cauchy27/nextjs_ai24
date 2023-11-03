"use client"

import { useState, useEffect} from "react";
import { GetStaticProps, NextPage } from "next";

import Button from '@mui/material/Button';

import ReviewCard from "./card";

const UploadImage = (): JSX.Element => {
  const [image, setImage] = useState<File | null>(null);
  const [createObjectURL, setCreateObjectURL] = useState<any>(null);
  const [filePoint, setFilePoint] = useState<Number>(0);

  const [Loading,setLoading]=useState<boolean>(false);
  const [PokeData, setPokeData] = useState<any>(null);
  const [PokeImage, setPokeImage] = useState<string>("");

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
    console.log(uploadUrl);
  }

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
    fetch('http://192.168.40.2:5555/',{
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