// eslint-disable-next-line no-unused-vars
import React from 'react'
import Heart from '../assets/heart.png';

const QuickConsult = () => {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto text-center">
                <h3 className="text-3xl font-bold mb-8 text-start text-steelBlue font-primary"><span className='text-cyan'>Quick</span> Consult For</h3>
                <div className="grid grid-cols-2 xl:grid-cols-6 gap-4 font-primary">
                    <a href="#" className='flex rounded-md bg-whiteSteel bg-opacity-15 px-3 py-3 cursor-pointer'>
                        <img src={Heart} alt='' className='w-14' />
                        <p className='text-steelBlue font-semibold text-sm mt-5 ml-3'>Lassa Fever</p>
                    </a>

                    <a href="#" className='flex rounded-md bg-whiteSteel bg-opacity-15 px-3 py-3 cursor-pointer'>
                        <img src={Heart} alt='' className='w-14' />
                        <p className='text-steelBlue font-semibold text-sm mt-5 ml-3'>Yellow Fever</p>
                    </a>

                    <a href="#" className='flex rounded-md bg-whiteSteel bg-opacity-15 px-3 py-3 cursor-pointer'>
                        <img src={Heart} alt='' className='w-14' />
                        <p className='text-steelBlue font-semibold text-sm mt-5 ml-3'>Ebola</p>
                    </a>

                    <a href="#" className='flex rounded-md bg-whiteSteel bg-opacity-15 px-3 py-3 cursor-pointer'>
                        <img src={Heart} alt='' className='w-14' />
                        <p className='text-steelBlue font-semibold text-sm mt-5 ml-3'>Avian Influenza</p>
                    </a>

                    <a href="#" className='flex rounded-md bg-whiteSteel bg-opacity-15 px-3 py-3 cursor-pointer'>
                        <img src={Heart} alt='' className='w-14' />
                        <p className='text-steelBlue font-semibold text-sm mt-5 ml-3'>Dengue</p>
                    </a>

                    <a href="#" className='flex rounded-md bg-whiteSteel bg-opacity-15 px-3 py-3 cursor-pointer'>
                        <img src={Heart} alt='' className='w-14' />
                        <p className='text-steelBlue font-semibold text-sm mt-5 ml-3'>Monkey Pox</p>
                    </a>

                    <a href="#" className='flex rounded-md bg-whiteSteel bg-opacity-15 px-3 py-3 cursor-pointer'>
                        <img src={Heart} alt='' className='w-14' />
                        <p className='text-steelBlue font-semibold text-sm mt-5 ml-3'>Common Flu</p>
                    </a>

                    <a href="#" className='flex rounded-md bg-whiteSteel bg-opacity-15 px-3 py-3 cursor-pointer'>
                        <img src={Heart} alt='' className='w-14' />
                        <p className='text-steelBlue font-semibold text-sm mt-5 ml-3'>Bird Flu</p>
                    </a>

                    <a href="#" className='flex rounded-md bg-whiteSteel bg-opacity-15 px-3 py-3 cursor-pointer'>
                        <img src={Heart} alt='' className='w-14' />
                        <p className='text-steelBlue font-semibold text-sm mt-5 ml-3'>Monkey pox</p>
                    </a>

                    <a href="#" className='flex rounded-md bg-whiteSteel bg-opacity-15 px-3 py-3 cursor-pointer'>
                        <img src={Heart} alt='' className='w-14' />
                        <p className='text-steelBlue font-semibold text-sm mt-5 ml-3'>Yellow Fever</p>
                    </a>

                    <a href="#" className='flex rounded-md bg-whiteSteel bg-opacity-15 px-3 py-3 cursor-pointer'>
                        <img src={Heart} alt='' className='w-14' />
                        <p className='text-steelBlue font-semibold text-sm mt-5 ml-3'>Dengue</p>
                    </a>

                    <a href="#" className='flex rounded-md bg-whiteSteel bg-opacity-15 px-3 py-3 cursor-pointer'>
                        <img src={Heart} alt='' className='w-14' />
                        <p className='text-steelBlue font-semibold text-sm mt-5 ml-3'>Cholera</p>
                    </a>
                    {/* {['Lassa Fever', 'Yellow Fever', 'Ebola', 'Avian Influenza', 'Dengue', 'Monkey Pox', 'Monkey Pox', 'Dengue', 'Lassa Fever, Yellow Fever, Ebola, Avian Influenza'].map((item, index) => (
                        <div key={index} className="bg-white p-4 shadow rounded">
                            <p className="text-lg">{item}</p>
                        </div>
                    ))} */}
                </div>
            </div>
        </section>
    )
}

export default QuickConsult