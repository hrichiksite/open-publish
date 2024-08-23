import { useCallback, useEffect, useState } from 'react'
import Button from '../components/Button'
import ClickCount from '../components/ClickCount'
import styles from '../styles/home.module.css'
import React from 'react';
import { useRouter } from 'next/router';
import { Input } from "@/components/ui/input"

function throwError() {
  console.log(
    // The function body() is not defined
    document.body()
  )
}

function Signup() {
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
      <h1>Signup as an author on EasyPea</h1>
      <p>
        Write anything that comes to your mind, get a link and share it with
        others. Easy, fast and free.
      </p>
      <hr className={styles.hr} />
      <h4>You're the Editor</h4>
      <p>
        Write at your own pace, publish at your own time.
      </p>
        <div>

        <Input type="email" placeholder="Email" />
        <Input type="text" placeholder="Bio" />
        <Input type="text" placeholder="Links" />


        </div>
     

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

export default Signup