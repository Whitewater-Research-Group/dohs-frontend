// eslint-disable-next-line no-unused-vars
import React from 'react';
import About_image from '../assets/about_hero.png';

const Story = () => {
    return (
        <section className="py-12">
            <div className=" text-center px-4 font-sans text-darkCoal">
                <h2 className="text-4xl font-bold mb-4 mt-24">Our story</h2>
                <p className="text-darkCoal text-xl mb-8 md:mx-32 mt-10 leading-10">Welcome to White Water Research Group, pioneers in developing a cutting-edge Digital OneHealth Surveillance System tailored for sub-Saharan Africa. Our mission is to create a holistic, community-driven, and intelligent surveillance platform that seamlessly integrates the health of humans, animals, plants, and the environment.</p>
                <img src={About_image} alt="Team meeting" className="mx-auto w-5/6 rounded mt-10" />
            </div>
        </section>
    )
}

export default Story