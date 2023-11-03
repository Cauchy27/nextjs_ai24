"use client"

import { useState, useEffect, useRef, useCallback} from "react";



type ImageCardProps = {
  data:any,
  start_x:number,
  start_y:number,
}
const ImageCard = (ImageCardProps:ImageCardProps) =>{

  const [p1x1,setP1x1]=useState<number>(0);
  const [p1x2,setP1x2]=useState<number>(0);
  const [p2x1,setP2x1]=useState<number>(0);
  const [p2x2,setP2x2]=useState<number>(0);
  const [p3x1,setP3x1]=useState<number>(0);
  const [p3x2,setP3x2]=useState<number>(0);
  const [p1y1,setP1y1]=useState<number>(0);
  const [p1y2,setP1y2]=useState<number>(0);
  const [p2y1,setP2y1]=useState<number>(0);
  const [p2y2,setP2y2]=useState<number>(0);
  const [p3y1,setP3y1]=useState<number>(0);
  const [p3y2,setP3y2]=useState<number>(0);

  const firstRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    //対象の要素を取得
    const el = firstRef.current;

    //対象の要素がなければ何もしない
    if (!el) return;

    //クリックした時に実行する関数
    const hundleClickOutside = (e: MouseEvent) => {
      if (!el?.contains(e.target as Node)) {
        //ここに外側をクリックしたときの処理
      } else {
        //ここに内側をクリックしたときの処理
        console.log("first");
        soundPlay(ImageCardProps.data[0].sound);
      }
    };

    //クリックイベントを設定
    document.addEventListener("click", hundleClickOutside);

    //クリーンアップ関数
    return () => {
      //コンポーネントがアンマウント、再レンダリングされたときにクリックイベントを削除
      document.removeEventListener("click", hundleClickOutside);
    };
  }, [firstRef]);

  const secondRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    //対象の要素を取得
    const el = secondRef.current;

    //対象の要素がなければ何もしない
    if (!el) return;

    //クリックした時に実行する関数
    const hundleClickOutside = (e: MouseEvent) => {
      if (!el?.contains(e.target as Node)) {
        //ここに外側をクリックしたときの処理
      } else {
        //ここに内側をクリックしたときの処理
        console.log("second");
        soundPlay(ImageCardProps.data[1].sound);
      }
    };

    //クリックイベントを設定
    document.addEventListener("click", hundleClickOutside);

    //クリーンアップ関数
    return () => {
      //コンポーネントがアンマウント、再レンダリングされたときにクリックイベントを削除
      document.removeEventListener("click", hundleClickOutside);
    };
  }, [secondRef]);

  const thirdRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    //対象の要素を取得
    const el = thirdRef.current;

    //対象の要素がなければ何もしない
    if (!el) return;

    //クリックした時に実行する関数
    const hundleClickOutside = (e: MouseEvent) => {
      if (!el?.contains(e.target as Node)) {
        //ここに外側をクリックしたときの処理
      } else {
        //ここに内側をクリックしたときの処理
        console.log("third");
        soundPlay(ImageCardProps.data[2].sound);
      }
    };

    //クリックイベントを設定
    document.addEventListener("click", hundleClickOutside);

    //クリーンアップ関数
    return () => {
      //コンポーネントがアンマウント、再レンダリングされたときにクリックイベントを削除
      document.removeEventListener("click", hundleClickOutside);
    };
  }, [thirdRef]);

  let target1:any = document.getElementById( "1" ) ;
  let target2:any = document.getElementById( "2" ) ;
  let target3:any = document.getElementById( "3" ) ;

  // let clientRect1:any = target1.getBoundingClientRect() ;
  // let clientRect2:any = target2.getBoundingClientRect() ;
  // let clientRect3:any = target3.getBoundingClientRect() ;

  // const test = testData.map((key:Number,prop:any)=>{
  //   console.log(key,prop);
  //   if(key==0){
  //     setP1x1(prop.x1);
  //     setP1x2(prop.x2); 
  //     setP1y1(prop.y1);
  //     setP1y2(prop.y2); 
  //   }
  //   if(key==1){
  //     setP2x1(prop.x1);
  //     setP2x2(prop.x2); 
  //     setP2y1(prop.y1);
  //     setP2y2(prop.y2); 
  //   }
  //   if(key==2){
  //     setP3x1(prop.x1);
  //     setP3x2(prop.x2); 
  //     setP3y1(prop.y1);
  //     setP3y2(prop.y2); 
  //   }
  // });
  useEffect(() => {
	  ImageCardProps.data.map((key:Number,prop:any)=>{
        console.log(key,prop);
        if(key==0){
          setP1x1(prop.x1);
          setP1x2(prop.x2); 
          setP1y1(prop.y1);
          setP1y2(prop.y2); 
        }
        if(key==1){
          setP2x1(prop.x1);
          setP2x2(prop.x2); 
          setP2y1(prop.y1);
          setP2y2(prop.y2); 
        }
        if(key==2){
          setP3x1(prop.x1);
          setP3x2(prop.x2); 
          setP3y1(prop.y1);
          setP3y2(prop.y2); 
        }
      });
  },[ImageCardProps.data]);

  // 音声再生
  window.AudioContext = window.AudioContext || (window as any).webkitAudioContext;
  const ctx = new AudioContext();

  let sampleSource:any;
  // 再生中のときはtrue
  let isPlaying = false;

  // 音源を取得しAudioBuffer形式に変換して返す関数
  async function setupSample1(sound_name:string) {
    const response = await fetch("/sound/"+sound_name+".wav");

    console.log(response);

    const arrayBuffer = await response.arrayBuffer();
    // Web Audio APIで使える形式に変換
    const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
    return audioBuffer;
  }

  // AudioBufferをctxに接続し再生する関数
  function playSample(ctx:any, audioBuffer:any) {
    sampleSource = ctx.createBufferSource();
    // 変換されたバッファーを音源として設定
    sampleSource.buffer = audioBuffer;
    // 出力につなげる
    sampleSource.connect(ctx.destination);
    sampleSource.start();
    isPlaying = true;
  }

  const soundPlay = async(sound_name:string) =>{
    // if (isPlaying) return;
    const sample = await setupSample1(sound_name);
    playSample(ctx, sample);
  }
  
  // oscillatorを破棄し再生を停止する
  // const soundStop = async(sound_name:string) => {
  //   sampleSource?.stop();
  //   isPlaying = false;
  // }

  // キーを割り当て
  const escFunction = useCallback((event:any) => {
    console.log(event.keyCode);
    if (event.keyCode === 65) {
      // キーコードを判定して何かする。
      soundPlay(ImageCardProps.data[0].sound);
    }
    if (event.keyCode === 83) {
      // キーコードを判定して何かする。
      soundPlay(ImageCardProps.data[1].sound);
    }
    if (event.keyCode === 68) {
      // キーコードを判定して何かする。
      soundPlay(ImageCardProps.data[2].sound);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);
  }, []);

  return (
    <div style={{
      position:"absolute",
      top:"190px",
      }} 
    >
      {
        ImageCardProps.data[0].x1 &&
        <div className="wrapper" style={{
          position:"absolute",
          top:(ImageCardProps.data[0].x1) + "px",
          height:(ImageCardProps.data[0].y2-ImageCardProps.data[0].y1) + "px",
          left:ImageCardProps.data[0].x1 + "px",
          width:(ImageCardProps.data[0].x2-ImageCardProps.data[0].x1) + "px",
          backgroundColor: '#FFFFFF',
          borderWidth: 1,
          borderColor: '#FFFFFF',
          borderRadius: 2,
          opacity:0.5,
        }}>
          <div id="1" ref={firstRef} style={{width:"100%",height:"100%"}}>
            <p></p>
          </div>
        </div>
      }
      {
        ImageCardProps.data[1].x1 &&
        <div className="wrapper" style={{
          position:"absolute",
          top:(ImageCardProps.data[1].x1) + "px",
          height:(ImageCardProps.data[1].y2-ImageCardProps.data[1].y1) + "px",
          left:ImageCardProps.data[1].x1 + "px",
          width:(ImageCardProps.data[1].x2-ImageCardProps.data[1].x1) + "px",
          backgroundColor: '#7cfc00',
          borderWidth: 1,
          borderColor: '#7cfc00',
          borderRadius: 2,
          opacity:0.5,
        }}>
          <div id="2" ref={secondRef} style={{width:"100%",height:"100%"}}>
            <p></p>
          </div>
        </div>
      }
      {
        ImageCardProps.data[2].x1 &&
        <div className="wrapper" style={{
          position:"absolute",
          top:ImageCardProps.data[2].x1 + "px",
          height:(ImageCardProps.data[2].y2-ImageCardProps.data[2].y1) + "px",
          left:ImageCardProps.data[2].x1 + "px",
          width:(ImageCardProps.data[2].x2-ImageCardProps.data[2].x1) + "px",
          backgroundColor: '#ffa500',
          borderWidth: 1,
          borderColor: '#ffa500',
          borderRadius: 2,
          opacity:0.5,
        }}>
          <div id="3" ref={thirdRef} style={{width:"100%",height:"100%"}}>
            <p></p>
          </div>
        </div>
      }
    </div>
  );
}
export default ImageCard;