import React, { useState, useEffect } from 'react'
import {WiCloudyWindy} from 'react-icons/wi'
import {FcSearch} from 'react-icons/fc'
import {AiOutlineFire} from 'react-icons/ai'
import {GiFrozenOrb} from 'react-icons/gi'
import {CiTempHigh} from 'react-icons/ci'
import {TiWeatherCloudy} from 'react-icons/ti'
import axios from 'axios'


function App() {
  const [input, setinput] = useState('')
  const [data, setdata] = useState([])
  const [newdata, setnewdata] = useState({  
    temp:"0",
    max_temp:"0",
    min_temp:"0",
    city:"city",
    weather:"clouds"
  })

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=5f2a59e8ab40c3fa67b00abe1cec4798`;

  const handdleSubmit =async (e)=>{
    e.preventDefault()
    const raw  = await axios.get(url)
    await setdata(raw.data)

    
    // // 
 
    // console.log(newdata)
    setinput('')

}
useEffect(()=>{
  if(data != ''){
  console.log(data)
  const {main , name ,weather}  = data
  console.log(weather)
  setnewdata({
    temp:main.temp,
    max_temp:main.temp_max,
    min_temp:main.temp_min,
    city:name,
    weather:weather[0].description
    
  })
}
},[data])
 
  return (
<section className='h-screen flex justify-center items-center bg-slate-100'>
  <div className=' bg-slate-200 bg-opacity-20 backdrop-blur-3xl shadow-md shadow-gray-400 rounded-md flex flex-wrap w-[300px] md:w-[450px] flex-col md:flex-row items-center'>

      <div className='flex flex-col justify-center items-center flex-1 w-2/5 py-4 gap-2 '>
        <span className='font-bold'>{newdata.city}</span>
        <WiCloudyWindy className='text-9xl bg-blue-200 rounded-full'/>
        <span className='font-bold text-2xl'>{newdata?newdata.temp:'0'} c</span>
      </div>

    <div className='w-full py-9 h-full bg-gradient-to-tr from-blue-400 to-purple-500 flex-1 px-3 rounded-tl-xl md:rounded-bl-xl rounded-tr-xl shadow-md shadow-slate-600 bg-opacity-60 backdrop-blur-3xl flex flex-col items-center justify-around flex-wrap gap-3 rounded-b-xl'>
    <h2 className='font-bold text-center text-white'> Search your city</h2>
      <form  className='flex justify-center gap-1'>
        <input className='bg-transparent !outline-none border-[1px] rounded-xl px-1 border-slate-600 text-white py-2' type="text" name="" id="" onChange={(e)=>setinput(e.target.value)} value={input} placeholder='enter the city name'/>
        <button className='' onClick={handdleSubmit}><FcSearch className='text-2xl'/></button>
      </form>
      <div className='flex flex-wrap justify-between items-end gap-2'>
        <div className='w-16 h-14 bg-white rounded-md backdrop-blur-3xl bg-opacity-40 shadow-gray-400 text-center text-sm flex justify-center items-center flex-col'><AiOutlineFire className='text-2xl text-red-900 font-bold '/>
        {newdata.max_temp}</div>
        <div className='w-16 h-14 bg-white rounded-md bg-opacity-40 shadow-gray-400 text-center flex justify-center items-center flex-col'><GiFrozenOrb className='text-2xl text-blue-900 font-bold'/>
        {newdata.min_temp}</div>
        <div className='w-16 h-14 bg-white rounded-md  bg-opacity-40 shadow-gray-400 text-center flex justify-center items-center flex-col'><CiTempHigh className='font-bold text-xl text-white' />{newdata.temp}</div>
        <div className='w-14 h-14  mt-2 flex-auto bg-white rounded-md bg-opacity-40 shadow-gray-400 text-center flex justify-center items-center gap-2 text-sm flex-col md:flex-row'><TiWeatherCloudy className='text-xl text-white font-bold'/>{newdata.weather}</div>
      
      </div>
    </div>
  </div>
</section>
  )
}
export default App
