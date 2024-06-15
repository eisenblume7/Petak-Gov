import React from 'react'
import CategoryButtons from "../components/CategoryButtons";
import ProjectDetail from "../components/ProjectDetail";

const projectDetailer = () => {
    return (
        <div className='flex items-center justify-center mb-12 bg-center bg-cover bg-primary/20'>
            <div className='absolute top-20 left-20 right-20'>
                <CategoryButtons/>
                <ProjectDetail/>
            </div>
        </div>

    )
}

export default projectDetailer;