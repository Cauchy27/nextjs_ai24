"use client"

import { useState, useEffect, useRef, useCallback} from "react";
import Button from '@mui/material/Button';

type SoundCardProps = {
  data:any,
  key:Number,
  keycode:Number,
  colorcode:string,
}

const SoundCard = (SoundCardProps:SoundCardProps) =>{
  const soundRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    //対象の要素を取得
    const el = soundRef.current;

    //対象の要素がなければ何もしない
    if (!el) return;

    //クリックした時に実行する関数
    const hundleClickOutside = (e: MouseEvent) => {
      if (!el?.contains(e.target as Node)) {
        //ここに外側をクリックしたときの処理
      } else {
        //ここに内側をクリックしたときの処理
        console.log("first");
        soundPlay(SoundCardProps.data.sound);
      }
    };

    //クリックイベントを設定
    document.addEventListener("click", hundleClickOutside);

    //クリーンアップ関数
    return () => {
      //コンポーネントがアンマウント、再レンダリングされたときにクリックイベントを削除
      document.removeEventListener("click", hundleClickOutside);
    };
  }, [soundRef]);

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
   // キーを割り当て
   const keyFunction = useCallback((event:any) => {
    if (event.keyCode === SoundCardProps.keycode) {
      // キーコードを判定して何かする。
      soundPlay(SoundCardProps.data.sound);
    }
  }, []);
  useEffect(() => {
    document.addEventListener("keydown", keyFunction, false);
  }, []);

  return(
    <>
      {
        (SoundCardProps.data.x1 && SoundCardProps.data.x1!=0) &&
        
        <Button className="wrapper players" style={{
          position:"absolute",
          top:(SoundCardProps.data.y1) + "px",
          // top:"0px",
          height:(SoundCardProps.data.y2-SoundCardProps.data.y1) + "px",
          left:SoundCardProps.data.x1 + "px",
          // left:"0px",
          width:(SoundCardProps.data.x2-SoundCardProps.data.x1) + "px",
          backgroundColor: SoundCardProps.colorcode,
          borderWidth: 1,
          borderColor: SoundCardProps.colorcode,
          borderRadius: 50,
          opacity:0.5
        }}>
          <div id="1" ref={soundRef} style={{width:"100%",height:"100%"}}>
            
          </div>
        </Button>
      }
    </>
  );
}
export default SoundCard;