// eslint-disable-next-line no-unused-vars
import React from 'react'
import backgroundImage from '../assets/hero_bg.png';
import rightArrow from '../assets/right_arrow.png';

const Hero = () => {
    return (
        <section className="bg-cover bg-center h-screen flex items-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="ml-52 text-white">
                <h1 className="font-primary text-6xl font-bold mb-6 leading-tight">Integrated Health <br />Surveillance for a <br /> <span className='font-cursive'>Safer</span> World</h1><br />

                <div className='mt-6 flex items-center text-white font-bold'>
                    <a href="#get-started" className="flex items-center bg-turquoiseBlue py-3 px-4 rounded cursor-pointer space-x-6">
                        <span>Get started now</span>
                        <img src={rightArrow} alt="Right arrow" className="w-5 h-5 ml-2" />
                    </a>
                </div>

                <p className="mt-3 text-lg font-primary text-white">The One Health approach is a collaborative,<br /> multisectoral, and transdisciplinary strategy<br /> that recognizes the interconnection between<br /> human health, animal health, and<br /> environmental health.</p>
            </div>
        </section>
    )
}

export default Hero