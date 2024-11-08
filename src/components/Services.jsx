// eslint-disable-next-line no-unused-vars
import React from 'react'
import report from '../assets/report_img.png';
import surveillance from '../assets/surveillance_img.png';
import assistance from '../assets/assistance_img.png';
import analytics from '../assets/analytics_img.png';
import right_arrow from '../assets/b_right_arrow.png';

const Services = () => {
    return (
        <section className="py-20 px-10 md:px-0 bg-gray-50 font-primary w-full mx-auto left-4 ">
            <div className="container mx-auto flex flex-col w-full md:w-4/5">
                <h3 className="text-4xl font-bold text-center mb-8 text-darkCoal">Services we offer you</h3>
                <p className='text-center text-lg font-normal text-darkCoal mb-20'>With a comprehensive suite of tools, you can effortlessly monitor and manage <br /> public health data. Enhance your surveillance capabilities today.</p>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 self-center">
                    <div className="bg-white  shadow rounded-t-lg">
                        <img src={report} alt='Report generation' className='' />
                        <div className='flex p-4 justify-between items-center'>
                            <h4 className="text-base text-darkCoal font-normal">Report Generation</h4>
                            <img src={right_arrow} alt='' className='w-5 h-5' />
                        </div>
                    </div>

                    <div className="bg-white shadow rounded-t-lg">
                        <img src={surveillance} alt='' className='' />
                        <div className='flex p-4 justify-between items-center'>
                            <h4 className="text-base text-darkCoal font-normal">Surveillance Map</h4>
                            <img src={right_arrow} alt='' className='w-5 h-5' />
                        </div>
                    </div>

                    <div className="bg-white shadow rounded-t-lg">
                        <img src={assistance} alt='' className='' />
                        <div className='flex p-4 justify-between items-center'>
                            <h4 className="text-base text-darkCoal font-normal">AI Assistance</h4>
                            <img src={right_arrow} alt='' className='w-5 h-5' />
                        </div>
                    </div>

                    <div className="bg-white shadow rounded-t-lg">
                        <img src={analytics} alt='' className='' />
                        <div className='flex p-4 justify-between items-center'>
                            <h4 className="text-base text-darkCoal font-normal">Analytics</h4>
                            <img src={right_arrow} alt='' className='w-5 h-5' />
                        </div>
                    </div>

                    <div className="bg-white shadow rounded-t-lg">
                        <img src={report} alt='' className='' />
                        <div className='flex p-4 justify-between items-center'>
                            <h4 className="text-base text-darkCoal font-normal">One health Articles</h4>
                            <img src={right_arrow} alt='' className='w-5 h-5' />
                        </div>
                    </div>

                    <div className="bg-white shadow rounded-t-lg">
                        <img src={surveillance} alt='' className='' />
                        <div className='flex p-4 justify-between items-center'>
                            <h4 className="text-base text-darkCoal font-normal">Analytics</h4>
                            <img src={right_arrow} alt='' className='w-5 h-5' />
                        </div>
                    </div>

                    <div className="bg-white shadow rounded-t-lg">
                        <img src={assistance} alt='' className='' />
                        <div className='flex p-4 justify-between items-center'>
                            <h4 className="text-base text-darkCoal font-normal">Disease Prevention</h4>
                            <img src={right_arrow} alt='' className='w-5 h-5' />
                        </div>
                    </div>

                    <div className="bg-white shadow rounded-t-lg">
                        <img src={analytics} alt='' className='' />
                        <div className='flex p-4 justify-between items-center'>
                            <h4 className="text-base text-darkCoal font-normal">Hotlines</h4>
                            <img src={right_arrow} alt='' className='w-5 h-5' />
                        </div>
                    </div>
                </div>

                <div className='mt-10 text-right justify-end'>
                    <a href='#' className='text-steelBlue font-primary font-medium text-base hover:underline'>View All</a>
                </div>

            </div>
        </section>
    )
}

export default Services