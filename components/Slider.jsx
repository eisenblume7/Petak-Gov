import Image from 'next/image';
import React, {useEffect, useState} from 'react';
import { SliderData } from './SliderData';
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';
import axios from "axios";

const Slider = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };
  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        async function fetchProjects() {
            const response = await axios.get('/api/project');
            setProjects(response.data);
        }
        fetchProjects();
    }, []);

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
      <div id='about' className='max-w-[1240px] mx-auto col'>
          <h1 className='bold-52 text-blue-90 text-center p-4'>About Us</h1>

          <div className='relative flex justify-start p-4'>
              <Image
                  src={"/1.svg"}
                  alt={"logo"}
                  width={"300"}
                  height={"300"}
              />
              <p className='centered text-2xl font-semibold text-blue-90 text-justify p-4 mt-5'> PETAKgov adalah
                  sebuah
                  aplikasi
                  inovatif yang
                  bertujuan untuk meningkatkan transparansi dan
                  partisipasi masyarakat dalam pemantauan proyek-proyek pemerintah di sekitar daerah mereka.
                  Dikembangkan sebagai solusi atas masalah ketidaktahuan masyarakat terhadap proyek-proyek
                  yang sedang berlangsung di daerah mereka, PETAK gov memberikan akses mudah dan terperinci tentang
                  proyek-proyek tersebut.</p>
          </div>
          <div>
              <h1 className='bold-52 text-blue-90 text-center p-4'>Newest Project</h1>
          </div>
          <div className='relative flex justify-center p-4'>

          {projects.map((project, index) => {
                  return (
                      <div
                          key={index}
                          className={
                              index === current
                                  ? 'opacity-[1] ease-in duration-1000'
                                  : 'opacity-0'
                          }
                      >
                          <FaArrowCircleLeft
                              onClick={prevSlide}
                              className='absolute top-[50%] left-[30px] text-white/70 cursor-pointer select-none z-[2]'
                              size={50}
                          />
                          {index === current && (
                              <Image
                                  src={project.imageUrl}
                                  alt='/'
                                  width='1440'
                                  height='600'
                                  objectFit='cover'
                              />
                          )}
                          <FaArrowCircleRight
                              onClick={nextSlide}
                              className='absolute top-[50%] right-[30px] text-white/70 cursor-pointer select-none z-[2]'
                              size={50}
                          />
                      </div>
                  );
              })}
          </div>
      </div>
  );
};

export default Slider;
