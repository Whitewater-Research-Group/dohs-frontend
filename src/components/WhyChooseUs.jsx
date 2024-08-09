// eslint-disable-next-line no-unused-vars
import React from 'react';
import Video from '../assets/video.png';
import One from '../assets/one_icon.png';
import Two from '../assets/two_icon.png';
import Three from '../assets/three_icon.png';

const WhyChooseUs = () => {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto text-center">
                <h3 className="text-4xl font-bold text-center mb-8 text-darkCoal">Why you should choose us?</h3>
                <p className="text-center text-lg font-normal text-darkCoal mb-20">Your health is our responsibility.</p>

                <div className="flex space-x-20 mt-10">

                    <img src={Video} alt="Why Choose Us" className="w-1/2 rounded-md" />

                    <div className='mt-14'>
                        <div className='flex space-x-6'>
                            <img src={One} alt='' className='w-10 h-10' />
                            <div className='text-start'>
                                <h4 className='font-bold font-sans text-lg text-darkCoal'>Comprehensive Monitoring</h4>
                                <p className='font-normal font-sans text-base text-darkCoal mt-3 leading-8'>Leverage advanced tools to track and analyze<br /> health data seamlessly.</p>
                            </div>
                        </div>

                        <div className='mt-14 flex space-x-6'>
                            <img src={Two} alt='' className='w-10 h-10' />
                            <div className='text-start'>
                                <h4 className='font-bold font-sans text-lg text-darkCoal'>Expert Analysis</h4>
                                <p className='font-normal font-sans text-base text-darkCoal mt-3 leading-8'>Gain insights from top health experts to make<br /> informed decisions.</p>
                            </div>
                        </div>

                        <div className='mt-14 flex space-x-6'>
                            <img src={Three} alt='' className='w-10 h-10' />
                            <div className='text-start'>
                                <h4 className='font-bold font-sans text-lg text-darkCoal'>AI-driven Model</h4>
                                <p className='font-normal font-sans text-base text-darkCoal mt-3 leading-8'>Utilize AI-driven technology to quickly identify and<br /> respond to health threats in real-time.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default WhyChooseUs