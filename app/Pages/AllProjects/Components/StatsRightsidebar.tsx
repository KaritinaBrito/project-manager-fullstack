import React, { useEffect, useMemo } from 'react';
import SplitscreenIcon from '@mui/icons-material/Splitscreen';
import { useContextApp } from 'app/app/contextApp';
import { Project } from 'app/app/Data/AllProjects';
import {CircularProgressbar, buildStyles} from "react-circular-progressbar";
import QueueIcon from '@mui/icons-material/Queue';

function StatsRightSidebar () {
    const {
        allProjectsObject: {allProjects}
    } = useContextApp();

    const { completedProjects, completedTasks, completionPercentage } = useMemo(() => {
        let completedProjects: Project[] = [];
        let totalTasks = 0;
        let completedTasks = 0;

        allProjects.forEach((project) => {
            const projectCompleted = project.tasks.every((task) => task.status === "Completed");
            if(projectCompleted) completedProjects.push(project);

            project.tasks.forEach((task) => {
                totalTasks++;
                if(task.status === "Completed") completedTasks++;
            });
        });

        const percentage = completedProjects.length > 0 
            ? Math.round((completedProjects.length / allProjects.length)*100) 
            : 0;

        return {
            completedProjects: completedProjects,
            completedTasks, 
            completionPercentage: percentage,
        };
    }, [allProjects]);

    return (
        <div className='w-[22%] flex justify-end items-center max-lg:hidden'>
            {/* White background */}
            <div className='h-[92%] w-[94%] bg-white rounded-l-3xl p-3 flex flex-col'>
                {/* Header */}
                <Header/>
                {/* Circular Char and the labels */}
                <div className=' flex flex-col gap-11 items-center justify-center mt-6'>
                    <CircularChart percentage={completionPercentage}/>
                    <ProjectsCompletedLabels
                        completedProjects={completedProjects}
                        completedTasks={completedTasks}
                    />
                </div>
                {/* Projects List */}
                <ProjectsList completedProjects={completedProjects}/>
            </div>
        </div>
    );

    function Header (){
        return (
            <h2 className='text-[22px] font-bold text-center mt-7'>Projects Completed</h2>
        );
    }

    function CircularChart ( {percentage} : {percentage: number}){
        return (
            <div className='w-40 h-40 mt-7 mb-1'>
                <CircularProgressbar
                    value={percentage}
                    text={`${percentage}%`}
                    styles={buildStyles({
                        textSize: "16px",
                        pathColor: `rgba(234, 88, 12, 2)`,
                        textColor: "#f97316",
                        trailColor: "#f1f5f9",
                        backgroundColor: "#3e98c7"
                    })}
                />
            </div>
        );
    }

    function ProjectsCompletedLabels({
        completedProjects,
        completedTasks
    } : {completedProjects: Project[]; completedTasks: number}){
        return (
            <div className='flex flex-col just gap-1 items-center justify-center'>
                <p className='font-bold text-[17px]'>
                    {completedProjects.length} Completed
                </p>
                <p className='text-[13px] text-slate-400'>
                    {completedTasks} Tasks done
                </p>
            </div>
        );
    }

    function ProjectsList({
        completedProjects,
    } : {
        completedProjects: Project[];
    }){
        return (
            <ul className='flex flex-col gap-3 mt-16 mx-4 overflow-auto'>
                <div className='h-[100%] flex items-center justify-center py-20 w-full'>
                    {completedProjects.length === 0 && (
                        <div className={`p-1 gap-5 flex flex-col justify-center opacity-40 pb-8 items-center`}>
                            <NotAchievedProjectsIcon />
                            <div className='flex flex-col items-center gap-2'>
                                <p className='text-slate-700 text-[12px] mb-1 text-center'>
                                    {`No Projects Accomplished Yet...`}
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {completedProjects.map((project, index) => (
                    <div key={project.id}>
                        <SingleProject project={project}/>
                        {index < completedProjects.length - 1 && (
                            <hr className='w-[80%] mx-auto text-slate-100 opcity-50'></hr>
                        )}
                    </div>
                ))}
            </ul>
        );
    }

    function SingleProject ({ project} : { project: Project}) {
        return (
            <li className='p-3 flex gap-2 items-center'>
                <div className='w-8 h-8 bg-orange-600 rounded-md flex justify-center items-center text-white'>
                    <SplitscreenIcon sx={{ fontSize:"19px"}}/>
                </div>

                <ul>
                    <li className='text-[14px] font-semibold'>
                        {truncateString(project.title, 40)}
                    </li>
                    <li className='text-[12px text-slate-400'>
                        {project.tasks.length} tasks
                    </li>
                </ul>
            </li>
        );
    }

}

export default StatsRightSidebar;

function truncateString(str: string, maxLength: number){
    if(str.length > maxLength){
        return str.slice(0, maxLength) + "...";
    }
    return str;
}

function NotAchievedProjectsIcon(){
    return(
       <QueueIcon sx={{ fontSize: "90px"}} className='text-slate-400'/>
    )
}