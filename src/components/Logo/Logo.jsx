import React from 'react';
import idea from "../../assets/Idea.png"

const Logo = () => {
    return (
        <div className='flex items-end'>
            <img src={idea} alt="" className="w-10 md:w-12 lg:w-17"  />
            <h3 className='-ms-4 font-bold text-3xl'>IdeaArena</h3>
        </div>
    );
};

export default Logo;