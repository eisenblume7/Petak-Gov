import React from 'react';
import Image from "next/image";
import Link from "next/link";

const Hero = ({heading, message}) => {
  return (
    <div className='flex items-center justify-center h-screen mb-12 bg-fixed bg-center bg-cover custom-img'>
      {/* Overlay */}
      <div className='absolute top-0 left-0 right-0 bottom-0 bg-black/80 z-[2]' />
        <div className={"relative flex justify-start z-[3]"}>
            <Image
                src={"/logo.svg"}
                alt={"logo"}
                width={"300"}
                height={"300"}
            />
            <div className='p-5 text-cream-30 z-[3] mt-[0rem]'>

                <h2 className='text-8xl font-bold'>{heading}</h2>
                <p className='py-5 text-3xl'>{message}</p>
                <Link href='/projectDisplay'>
                    <button className='px-12 py-4 border text-2xl'>Start</button>
                </Link>
            </div>
        </div>
    </div>
  );
};

export default Hero;
