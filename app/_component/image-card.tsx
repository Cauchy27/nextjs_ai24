"use client"

import { useState, useEffect, useRef, useCallback} from "react";
import SoundCard from "./music-card";


type ImageCardProps = {
  data:any,
  start_x:number,
  start_y:number,
}
const ImageCard = (ImageCardProps:ImageCardProps) =>{

  const firstRef = useRef<HTMLDivElement>(null);
  const [TopPosition,setTopPosition] = useState<Number>(115);

  const keycodes:any =[65,83,68,70,71,72,74,75,76];
  const colorcodes:any =["#FFFFFF","#7cfc00","#ffa500","#008000","#ff69b4","#00008b","#8b0000","#800080","#00ffff"];

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

  return (
    <div style={{
      position:"absolute",
      top:TopPosition+"px"
      }} 
    >
      {
        ImageCardProps.data.length > 0 &&
        ImageCardProps.data.map((card_data:any,key:number)=>(
          <SoundCard
            data={card_data}
            key={key}
            keycode={keycodes[key]}
            colorcode={colorcodes[key]}
          />
        ))
      }
    </div>
  );
}
export default ImageCard;