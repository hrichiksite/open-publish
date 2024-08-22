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

      <hr className={styles.hr} />
      <h4>Editor</h4>
      <p>
        This is your workspace. Write anything that comes to your mind, get a
        link and share it with others. Easy, fast and free.
      </p>
      <div>
      <MdEditor preview={
        !false
      } language={'en-US'} modelValue={text} onChange={setText} />
        <p>Seconds since you opened this page: {count}</p>
      </div>
      <hr className={styles.hr} />
      <div>
        <p>Fidget with this button :)</p>
        <ClickCount />
      </div>
      <hr className={styles.hr} />
      <div>
        <Button
          onClick={(e) => {
            // nothing
          }}
        >
          Get. Set. Go.
        </Button>
      </div>
      <hr className={styles.hr} />
    </main>
  )
}

export default Home