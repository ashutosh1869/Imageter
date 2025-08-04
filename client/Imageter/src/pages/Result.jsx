import React from 'react'
import {assets} from '../assets/assets'
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Result() {
  const [image,setImage] = React.useState(assets.sample_img_1);
  const [isImageLoaded, setIsImageLoaded] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [input,setInput] = React.useState('');
  const {generateImage} = React.useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if(input.trim()) {
      const imageUrl = await generateImage(input);
      if(imageUrl) {
        setIsImageLoaded(true);
        setImage(imageUrl);
      }
    }
    else{
      toast.error("Please enter a valid prompt");
    }
    setLoading(false);
    setInput('');
  }

  return (
    <form className='flex flex-col  items-center justify-center h-screen text-gray-800'>
      <div>
        <div className='relative'>
          <img src={image} alt="Generated Result" className='max-w-sm rounded-xl shadow-lg'/>
          {/* Improved status bar */}
    { !isImageLoaded &&<div className="absolute bottom-0 left-0 w-full h-1 rounded overflow-hidden">
            <div
              className={`bg-blue-500 h-full transition-all duration-7000`}
              style={{
                width: loading ? '100%' : '0%',
                transitionProperty: 'width',
              }}
            />
          </div>}
        </div>
        <p className={`mt-4 text-lg font-medium animate-pulse text-blue-600 ${loading ? 'block' : 'hidden'}`} >Loading...</p>
      </div>
      {!isImageLoaded?
      <div className='mt-8 w-full max-w-md rounded-full  border border-gray-200 shadow-lg  flex items-center'>
        <input
          type="text"
          onChange={(e)=>setInput(e.target.value)}
          className='outline-none bg-transparent px-4 py-2 flex-grow text-gray-700 placeholder-gray-400'
          placeholder='Enter your prompt here...'
        />
        <button className='bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full px-6 py-2 ml-2 font-semibold shadow-md hover:scale-105 transition-transform duration-200' type='submit'
        onClick={(event)=>onSubmitHandler(event)}>
          Generate
        </button>
      </div>
      :
      <div className='mt-10 text-center flex gap-3'>
        <p className='bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full p-2 px-5 text-center font-semibold'
          onClick={()=>setIsImageLoaded(false)}
        >Generate another</p>
        <a href={image} download className='text-white bg-blue-500 p-2 px-5 rounded-full text-xl text-center'>Download</a>
      </div>
    }
    </form>
  )
}

export default Result