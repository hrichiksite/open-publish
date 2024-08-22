import { useCallback, useEffect, useState } from 'react'
import Button from '../components/Button'
import ClickCount from '../components/ClickCount'
import styles from '../styles/home.module.css'
import React from 'react';
import { MdEditor } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';


function throwError() {
  console.log(
    // The function body() is not defined
    document.body()
  )
}

function Home() {

  const [text, setText] = useState('# Hello Editor\nThis is your workspace.');
  return (
    <main className={styles.main}>
      <h1>EasyPea</h1>

      <hr className={styles.hr} />
      <h4>Editor</h4>
      <p>
        This is your workspace. 
      </p>
      <div>
      <MdEditor preview={
        !false
      } language={'en-US'} modelValue={text} onChange={setText} />
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