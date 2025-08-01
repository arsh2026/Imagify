import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import {motion} from "motion/react"
import { AppContext } from '../context/AppContext';

const Result = () => {

  const [image, setImage] = React.useState(assets.sample_img_1);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');

  const {generateImage} = useContext(AppContext)

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    if(input){
      const image=await generateImage(input)
      if(image){
        setIsImageLoaded(true)
        setImage(image)
      }
    }
    setLoading(false)
  }

  return (
    <motion.form 
    initial={{ opacity: 0.2, y: 100 }}
    transition={{ duration: 1 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    onSubmit={onSubmitHandler} 
    className='py-10 flex flex-col items-center justify-center min-h-[90vh'>
      <div>
        <div className='relative'>
            <img src={image} className='max-w-sm rounded' alt="" />
            <span className={`absolute bottom-0 left-0 h-1 bg-blue-500 ${loading ? 'w-full transaction-all duration-[10s]':'w-0'}`}></span>
        </div>

        <p className={!loading ? 'hidden' : ''}>Loading...</p>
      </div>
      {!isImageLoaded &&
      <div className='flex w-full max-w-xl bg-neutral-500 text-white text-sm p-0.5 mt-10 rounded-full'>
        <input 
         onChange={(e) => setInput(e.target.value)}
         type="text" 
         placeholder='Describe what you want to generate'
         className='flex-1 bg-transparent outline-none ml-8 max-sm:w-20 placeholder-color'
        />
        <button type='submit' className='bg-zinc-900 px-10 sm:px-16 py-3 rounded-full'>Generate</button>
      </div>
    }

    {isImageLoaded &&
      <div className='flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full'>
        <p onClick={()=>{setIsImageLoaded(false)
          setInput('');
        setImage(assets.sample_img_1);
        }
        } 
        className='bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer'>
          Generate Another
        </p>
        <a className='bg-zinc-900 px-10 py-3 rounded-full cursor-pointer' href={image} download>Download</a>
      </div>
    
    }
    </motion.form>
  )
}

export default Result
