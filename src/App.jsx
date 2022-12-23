import React, { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [raw, setraw] = useState('')
  const [city, setcity] = useState('pune')
  const [data, setdata] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5f2a59e8ab40c3fa67b00abe1cec4798`;
  useEffect(() => {
    try {
      axios.get(url).then((response => {
        setdata(response.data)
      }))
    } catch (e) {
      console.log(e)
    }
  }, [city])
  console.log(data)
  return (
    <section className='h-screen w-full flex justify-center items-center bg-gradient-to-bl from-orange-100 to-slate-600'>
      <div className='flex flex-col justify-around items-center gap-4 border-[1px] rounded-3xl border-black w-72 h-96 shadow-sm'>
        <div className='flex flex-col justify-center items-center'>
          <span className='flex gap-3'>
            city name:-   {data.name} </span>
            <span className='text-4xl my-1 font-bold'>
          {data ? (data.main.temp - 273.15).toFixed(2) : 'enter city name'}c
            </span>
        </div>
        <form action="#" className=''>
          <input type="text" name="" id="" onClick={(e) => {
            e.preventDefault()
          }} onChange={(e) => {
            setraw(e.target.value)
          }} className='border-[1px] py-1 border-black rounded-md mx-2 w-36 bg-transparent' placeholder='enter city name'/>
          <button onClick={() => {
            setcity(raw)
          }} className='border-[1px] border-black rounded-md mx-2 p-1'>submit</button>
        </form>
      </div>
    </section>
  )
}
export default App
