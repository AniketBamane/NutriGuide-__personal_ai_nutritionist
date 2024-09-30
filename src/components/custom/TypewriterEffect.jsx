import React from 'react'
import {Cursor, useTypewriter } from 'react-simple-typewriter'

const TypewriterEffect = () => {
  const [text] = useTypewriter({
    words:[
      "Welcome! Ready to achieve your health goals?",
"I’m here to guide you toward better nutrition!",
"Ask me anything about your diet or meals!",
"Let’s create a personalized plan just for you!",
    ],
    loop:true,
    deleteSpeed:50,
    typeSpeed:50,
    delaySpeed:1000,
  })
  return (
 <div className='mb-2 w-full'>
    <span className='font-bold text-green-600'>
    {text}
   </span>
   <span className='text-black'>
     <Cursor cursorStyle="|" />
   </span>
 </div>
  )
}

export default TypewriterEffect