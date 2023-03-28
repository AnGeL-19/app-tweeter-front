import React, { useEffect, useRef } from 'react'
import QRCode from 'qrcode';


export const CalisQRPage = () => {

    const canvasQr = useRef();

    QRCode.toDataURL('I am a pony!', function (err, url) {
      console.log(url)
    })


    const handleClick = () => {
        QRCode.toCanvas(canvasQr.current, 'http://localhost:3000/calisQR/asdasd112312qaaaa122asd', (error) => {
            if (error) console.error(error)
            console.log('success!');
            console.log(canvasQr.current);
        }); 
    }

  return (

    <>
        <div>CalisQRPage</div>
        <canvas ref={canvasQr}></canvas>

        <button onClick={handleClick}>Hola</button>
    </>
    
  )
}
