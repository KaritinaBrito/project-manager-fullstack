import React from 'react';
import ProjectsHeader from './Components/ProjectsHeader';
import ProjectsSubHeader from './Components/ProjectsSubHeader';
import AllProjectsSection from './Components/AllProjectsSection';
import StatsRightSidebar from './Components/StatsRightsidebar';

function AllProjects (){
    return (
        <div className='bg-slate-50 w-full min-h-screen flex flew-grow overflow-auto'>
            <AllProjectsArea/>
            <StatsRightSidebar/>
        </div>
    );

    function AllProjectsArea (){
        return (
            <div className='w-[100%] p-10 flex flex-col gap-3'>
                {/* Search bar and  the add  project button */}
                <ProjectsHeader/>
                {/* My projects title and the add button */}
                <ProjectsSubHeader/>
                {/* All Projects Added */}
                <AllProjectsSection/>

            </div>
        )
    }
}

export default AllProjects;