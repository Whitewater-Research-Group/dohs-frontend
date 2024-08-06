// eslint-disable-next-line no-unused-vars
import React from 'react'
import report from '../assets/report_img.png';
import surveillance from '../assets/surveillance_img.png';
import assistance from '../assets/assistance_img.png';
import analytics from '../assets/analytics_img.png';
import right_arrow from '../assets/b_right_arrow.png';

const Services = () => {
    return (
        <section className="py-20 bg-gray-50 font-primary">
            <div className="container mx-auto">
                <h3 className="text-4xl font-bold text-center mb-8 text-darkCoal">Services we offer you</h3>
                <p className='text-center text-lg font-normal text-darkCoal mb-20'>With a comprehensive suite of tools, you can effortlessly monitor and manage <br /> public health data. Enhance your surveillance capabilities today.</p>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    <div className="bg-white px-6 py-4 shadow rounded">
                        <img src={report} alt='Report generation' className='' />
                        <div className='mt-5 flex space-x-24'>
                            <h4 className="text-base text-darkCoal font-normal ml-6">Report Generation</h4>
                            <img src={right_arrow} alt='' className='w-5 h-5' />
                        </div>
                    </div>

                    <div className="bg-white p-6 shadow rounded">
                        <img src={surveillance} alt='' className='' />
                        <div className='mt-5 flex space-x-28'>
                            <h4 className="text-base text-darkCoal font-normal ml-6">Surveillance Map</h4>
                            <img src={right_arrow} alt='' className='w-5 h-5' />
                        </div>
                    </div>

                    <div className="bg-white p-6 shadow rounded">
                        <img src={assistance} alt='' className='' />
                        <div className='mt-5 flex space-x-36'>
                            <h4 className="text-base text-darkCoal font-normal ml-6">AI Assistance</h4>
                            <img src={right_arrow} alt='' className='w-5 h-5' />
                        </div>
                    </div>

                    <div className="bg-white p-6 shadow rounded">
                        <img src={analytics} alt='' className='' />
                        <div className='mt-5 flex space-x-44'>
                            <h4 className="text-base text-darkCoal font-normal ml-6">Analytics</h4>
                            <img src={right_arrow} alt='' className='w-5 h-5' />
                        </div>
                    </div>

                    <div className="bg-white p-6 shadow rounded">
                        <img src={report} alt='' className='' />
                        <div className='mt-5 flex space-x-24'>
                            <h4 className="text-base text-darkCoal font-normal ml-6">One health Articles</h4>
                            <img src={right_arrow} alt='' className='w-5 h-5' />
                        </div>
                    </div>

                    <div className="bg-white p-6 shadow rounded">
                        <img src={surveillance} alt='' className='' />
                        <div className='mt-5 flex space-x-44'>
                            <h4 className="text-base text-darkCoal font-normal ml-6">Analytics</h4>
                            <img src={right_arrow} alt='' className='w-5 h-5' />
                        </div>
                    </div>

                    <div className="bg-white p-6 shadow rounded">
                        <img src={assistance} alt='' className='' />
                        <div className='mt-5 flex space-x-20'>
                            <h4 className="text-base text-darkCoal font-normal ml-6">Disease Prevention</h4>
                            <img src={right_arrow} alt='' className='w-5 h-5' />
                        </div>
                    </div>

                    <div className="bg-white p-6 shadow rounded">
                        <img src={analytics} alt='' className='' />
                        <div className='mt-5 flex space-x-44'>
                            <h4 className="text-base text-darkCoal font-normal ml-6">Hotlines</h4>
                            <img src={right_arrow} alt='' className='w-5 h-5' />
                        </div>
                    </div>
                </div>

                <div className='mt-10 text-end'>
                    <a href='#' className='text-steelBlue font-primary font-medium text-base underline'>View All</a>
                </div>

            </div>
        </section>
    )
}

export default Services