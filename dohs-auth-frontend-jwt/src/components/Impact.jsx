// eslint-disable-next-line no-unused-vars
import React from 'react';
import Dev_one from '../assets/dev_one.png';
import Dev_two from '../assets/dev_two.png';
import Dev_three from '../assets/dev_three.png';
import Dev_four from '../assets/dev_four.png';

const Impact = () => {
    return (
        <section className="py-12 bg-gray-100">
            <div className="flex mx-52 px-4 text-center mb-20">

                <div className="ml-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                    <img src={Dev_one} alt="Impact 1" className="rounded" />
                    <img src={Dev_two} alt="Impact 2" className="rounded" />
                    <img src={Dev_three} alt="Impact 3" className="rounded" />
                    <img src={Dev_four} alt="Impact 4" className="rounded" />
                </div>

                <div className='mt-20 font-sans text-darkCoal'>
                    <h2 className="text-3xl font-bold mb-4 text-left ml-40">Impact</h2>
                    <p className="mb-8 mx-40 text-left leading-9">
                        Intersectoral spillover threat-alert to community health, Prevention of outbreaks of zoonotic disease in animals and
                        people, Improvement in food safety and security, A robust alert system Reduction in anti-microbial resistant infections,
                        Improvement of human and animal health, Empowerment of frontline workers with supportive technologies Protection of
                        global health security, and Protection of biodiversity and conservation.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Impact;