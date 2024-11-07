// eslint-disable-next-line no-unused-vars
import React from 'react';
import Ivie from '../assets/ivie_bot.png';

function Chat() {
    return (
        <section className="py-12">
            <div className="">
                <h3 className='text-teal font-primary font-bold text-3xl ml-40 mb-6'>Chat with Ivie</h3>
                <div className="bg-turquoiseBlue p-6 grid grid-cols-3 items-center">
                    <div className="flex ml-40 self-stretch">
                        <img src={Ivie} alt="Ivie" className="w-1/2 rounded-full" />
                    </div>

                    <div className='font-manrope mr-40 leading-10'>
                        <h2 className="text-xl font-bold text-white mb-4">Hello! I&apos;m Ivie</h2>
                        <p className="text-white font-extralight text-lg mb-4">
                            I&apos;m here to assist you with any questions or needs you might have. Whether you&apos;re looking for information, support, or just a friendly chat, I&apos;m here to help. How can I assist you today?
                        </p>
                    </div>

                    <div className='my-28 rounded-md  w-1/2 bg-white p-10'>
                        <div className='flex items-center justify-center'>
                            <a href='#' className='font-normal font-rale text-2xl text-white bg-turquoiseBlue text-center px-10 py-2 rounded-md'>Chat</a>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default Chat;