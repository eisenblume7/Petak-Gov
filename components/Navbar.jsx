
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { buttonVariants } from './button';
import { HandMetal } from 'lucide-react';
import {Button} from "reactstrap";
import {signOut, useSession} from "next-auth/react";
import DashboardButton from "./DashboardButton";

const Navbar =  () => {
  const { data: session} = useSession()
  const [nav, setNav] = useState(false);
  const [color, setColor] = useState('transparent');
  const [textColor, setTextColor] = useState('white');

  const handleSignOut = async () => {
    await signOut({ redirect: false, callbackUrl: '/' });
  };
  const handleNav = () => {
    setNav(!nav);
  };

  useEffect(() => {
    const changeColor = () => {
      if (window.scrollY >= 90) {
        setColor('#5CDB95');
        setTextColor('#021639');
      } else {
        setColor('transparent');
        setTextColor('#EDF5E1');
      }
    };
    window.addEventListener('scroll', changeColor);
  }, []);

  return (
      <div
          style={{backgroundColor: `${color}`}}
          className='fixed left-0 top-0 w-full z-10 ease-in duration-300'
      >
        <div className='max-w-[1240px] m-auto flex justify-between items-center p-4 text-white'>
          <Link href='/'>
            <h1 style={{color: `${textColor}`}} className='font-bold text-4xl'>
              PETAKgov
            </h1>
          </Link>
          <ul style={{color: `${textColor}`}} className='hidden sm:flex'>
            <li className='p-4'>
              <Link href='/'>Home</Link>
            </li>
            <li className='p-4'>
              <Link href='/projectDisplay'>Project</Link>
            </li>
            <li className='p-4'>
              <Link href='/#about'>About</Link>
            </li>
            <li className='p-4'>
              <DashboardButton/>
            </li>
          </ul>

          <div style={{color: `${textColor}`}} className='hidden sm:flex'>
            {session?.user ? (
                <li>
                  <button onClick={handleSignOut}>Sign Out</button>
                </li>
            ) : (
                <li>
                  <Link href="/api/auth/signin">
                    Sign In
                  </Link>
                </li>
            )}
          </div>

          {/* Mobile Button */}
          <div onClick={handleNav} className='block sm:hidden z-10'>
            {nav ? (
                <AiOutlineClose size={20} style={{color: `${textColor}`}}/>
            ) : (
                <AiOutlineMenu size={20} style={{color: `${textColor}`}}/>
            )}
          </div>
          {/* Mobile Menu */}
          <div
              className={
                nav
                    ? 'sm:hidden absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center w-full h-screen bg-black text-center ease-in duration-300'
                    : 'sm:hidden absolute top-0 left-[-100%] right-0 bottom-0 flex justify-center items-center w-full h-screen bg-black text-center ease-in duration-300'
              }
          >
            <ul>
              <li onClick={handleNav} className='p-4 text-4xl hover:text-gray-500'>
                <Link href='/'>Home</Link>
              </li>
              <li onClick={handleNav} className='p-4 text-4xl hover:text-gray-500'>
                <Link href='/#gallery'>Maps</Link>
              </li>
              <li onClick={handleNav} className='p-4 text-4xl hover:text-gray-500'>
                <Link href='/work'>About</Link>
              </li>
              <li onClick={handleNav} className='p-4 text-4xl hover:text-gray-500'>
                <Link href='/contact'>My Profile</Link>
              </li>
              <li onClick={handleNav} className='p-4 text-4xl hover:text-gray-500'>
                <Link className={buttonVariants()} href='/api/auth/signin'>
                  Sign in
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
  );
};

export default Navbar;
