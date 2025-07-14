import React from 'react'
import micIcon from '../assets/icons/mic-icon.svg';
import videoIcon from  '../assets/icons/video-icon.svg';
import screenShareIcon from '../assets/icons/screen-share-icon.svg';
import recordingIcon from '../assets/icons/recording-start-icon.svg';

export default function VideoCall(props) {
  return (
    <div className='flex flex-col gap-[30px] bg-[#F4F4F4]/50 w-full sm:px-[120px] px-[30px] mt-[32px]'>
        <iframe className="rounded-xl sm:min-h-[480px] sm:max-h-[560px] h-[700px]" src="https://www.youtube.com/embed/STnLNbRHYhw?si=igJEN20cjlZOzIW3&amp;start=369" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        <div className='flex justify-between items-center bg-white sm:py-[34px] sm:px-[30px] rounded-xl sm:border-2 border-[#E3E6E8]'>
            <div/>
            <div className='flex gap-[20px] justify-center items-center'>
                <img className='cursor-pointer sm:w-15 w-8' src={micIcon} alt="mic" />
                <img className='cursor-pointer sm:w-15 w-8' src={videoIcon} alt="video" />
                <img className='cursor-pointer sm:w-15 w-8' src={screenShareIcon} alt="share_screen" />
                <img className='cursor-pointer sm:w-15 w-8' src={recordingIcon} alt="recording" />
            </div>
            <button className='bg-[#F1614B] text-white text-[18px] font-[600] leading-[22px] sm:py-[19px] py-[10px] sm:px-[37px] px-[17px] rounded-[28px]' onClick={props.onCallEnd}>End Call</button>
        </div>
    </div>
  )
}
