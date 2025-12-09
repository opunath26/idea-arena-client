import React from 'react';
import idea from "../../assets/Idea.png"

const Logo = () => {
    return (
        <div className='flex items-end'>
            <img src={idea} alt="" className="w-10 md:w-12 lg:w-13"  />
            <h3 className='-ms-1 font-bold text-2xl'>IdeaArena</h3>
        </div>
    );
};

export default Logo;