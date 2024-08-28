import { useCallback, useEffect, useState } from 'react'
import Button from '../components/Button'
import ClickCount from '../components/ClickCount'
import styles from '../styles/home.module.css'
import React from 'react';
import { MdEditor } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';
import { useRouter } from 'next/router';

function throwError() {
  console.log(
    // The function body() is not defined
    document.body()
  )
}

function Home() {
  const router = useRouter()
  const [count, setCount] = useState(0)
  //user device width
  const increment = useCallback(() => {
    setCount((v) => v + 1)
  }, [setCount])

  useEffect(() => {
    const r = setInterval(() => {
      increment()
    }, 1000)

    return () => {
      clearInterval(r)
    }
  }, [increment])

  const [text, setText] = useState('# Hello Editor\nThis is your workspace.\n\nWrite anything that comes to your mind, get a link and share it with others. Easy, fast and free.');
  return (
    <main className={styles.main}>
      <h1>EasyPea</h1>
      <p>
        Write anything that comes to your mind, get a link and share it with
        others. Easy, fast and free.
      </p>
      <hr className={styles.hr} />
      <h4>Editor</h4>
      <p>
        This is your workspace. Write anything that comes to your mind, get a
        link and share it with others. Easy, fast and free.
        Scroll right to disable the preview, if you're on a small screen.
      </p>
      <div>
      <MdEditor preview={
        !false
      } noUploadImg={false} language={'en-US'} modelValue={text} onChange={setText} />
        <p>Seconds since you opened this page: {count}</p>
      </div>
      <hr className={styles.hr} />
      <div>
        <p>Fidget with this button :)</p>
        <ClickCount />
      </div>
      <hr className={styles.hr} />
      <div>
        <p>
          To the cloud we go!{' '} This would upload the content to the cloud, redirect you to the link and you can share it with others. 
          This is a work in progress, for now, you cannot change it once it's uploaded, so be careful of what you upload, it's public, however it's like a youtube unlisted video, you can share the link with others, but it's not searchable, but anyone with the link can access it. 
          DO NOT UPLOAD SENSITIVE INFORMATION FOR YOUR OWN SAKE. 
        </p>
        <Button
          onClick={async (e) => {
            //get the text and upload send it to the api
            console.log(text)
            //send post request to the api
            //get the id
            //redirect to the page with the id
            const req = await fetch('/api/upload', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                text
              })
            })
            const res = await req.json()
            console.log(res)
            router.push(`/ar/${res.id}`)
          }}
        >
          Get. Set. Go!
        </Button>
      </div>
      <div dangerouslySetInnerHTML={ {__html: `<div style="width:100%;height:0;padding-bottom:66%;position:relative;"><iframe src="https://giphy.com/embed/TRpnnLcPTSYAXPglt2" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/CnagLDN-perfection-gaeilge-foirfeacht-TRpnnLcPTSYAXPglt2">via GIPHY</a></p>`}}></div>
      <hr className={styles.hr} />
    </main>
  )
}

export default Home