// eslint-disable-next-line no-unused-vars
import React from 'react';
import rightArrow from '../assets/right_arrow.png';

function Newsletter() {
    return (
        <section className="mt-14 mb-10 py-12">
            <div className="flex justify-between items-center w-4/5 mx-auto">
                <h2 className="text-3xl font-bold text-darkCoal mb-4">
                    Subscribe to our newsletter to get<br /> latest news in your inbox.
                </h2>
                <form className="grid grid-cols-2 gap-x-8 items-center">
                    <input
                        type="email"
                        className="ml-16 w-full md:w-1/2 lg:w-full h-1/2 p-5 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
                        placeholder="Enter your email"
                    />
                    <div className='ml-14 flex items-center text-white font-sans font-bold'>
                        <a href="#get-started" className="flex items-center text-lg bg-turquoiseBlue py-2 px-4 rounded cursor-pointer space-x-6">
                            <span>Subscribe</span>
                            <img src={rightArrow} alt="Right arrow" className="w-5 h-5 ml-2" />
                        </a>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default Newsletter;