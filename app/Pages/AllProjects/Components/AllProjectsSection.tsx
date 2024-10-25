import React from 'react';
import SingleProjectCard from './SingleProjectCard';
import { useContextApp } from 'app/app/contextApp';
import { ProjectsEmptyScreen } from 'app/app/EmptyScreens/ProjectsEmptySreen';


function AllProjectsSection (){
    const {allProjectsObject: {allProjects}} = useContextApp();
    return (
        <ul className='h-[78%] overflow-auto flex gap-4 flex-wrap mt-6 max-sm:grid max-sm:grid-cols-1'>
            {allProjects.length === 0 ?(
                <div className='w-full flex justify-center'> 
                    <ProjectsEmptyScreen/>
                </div>
                ) : allProjects.map((project) => (
                    <SingleProjectCard key={project.id} project={project}/>
                ))
            }
        </ul>
    )
}

export default AllProjectsSection;