import React,{ Suspense, useState } from 'react'

import './App.css'
// import Quiz from './Quiz.jsx'

const Quiz = React.lazy(()=>
{
  return new Promise((resolve)=> {
    setTimeout(()=>{
           resolve(import("./Quiz.jsx"))
          },1000);       
    });
});




function App() {


  return (
    <>
      <Suspense fallback={"Loading content ......................"}>
          <Quiz/>
      </Suspense>
      

    </>
  )
}

export default App
