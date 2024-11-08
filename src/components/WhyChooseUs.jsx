// eslint-disable-next-line no-unused-vars
import React from 'react';
import Video from '../assets/video.png';
import One from '../assets/one_icon.png';
import Two from '../assets/two_icon.png';
import Three from '../assets/three_icon.png';

const WhyChooseUs = () => {
    return (
        <section className="py-20 bg-white w-full">
            <div className="container text-center flex flex-col items-center">
                <h3 className="text-2xl md:text-4xl font-bold text-center mb-8 text-darkCoal">Why you should choose us?</h3>
                <p className="text-center text-lg font-normal text-darkCoal mb-10">Your health is our responsibility.</p>

                <div className="flex justify-between flex-col md:flex-row gap-10 items-center mt-10 w-4/5">

                    <img src={Video} alt="Why Choose Us" className="w-full md:w-1/2 rounded-md self-stretch" />

                    <div className='flex flex-col gap-10'>
                        <div className='flex space-x-6'>
                            <img src={One} alt='' className='w-10 h-10' />
                            <div className='text-start'>
                                <h4 className='font-bold font-sans text-lg text-darkCoal'>Comprehensive Monitoring</h4>
                                <p className='font-normal font-sans text-base text-darkCoal mt-1 leading-8'>Leverage advanced tools to track and analyze health data seamlessly.</p>
                            </div>
                        </div>

                        <div className='flex space-x-6'>
                            <img src={Two} alt='' className='w-10 h-10' />
                            <div className='text-start'>
                                <h4 className='font-bold font-sans text-lg text-darkCoal'>Expert Analysis</h4>
                                <p className='font-normal font-sans text-base text-darkCoal mt-1 leading-8'>Gain insights from top health experts to make informed decisions.</p>
                            </div>
                        </div>

                        <div className='flex space-x-6'>
                            <img src={Three} alt='' className='w-10 h-10' />
                            <div className='text-start'>
                                <h4 className='font-bold font-sans text-lg text-darkCoal'>AI-driven Model</h4>
                                <p className='font-normal font-sans text-base text-darkCoal mt-1 leading-8'>Utilize AI-driven technology to quickly identify and respond to health threats in real-time.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default WhyChooseUs