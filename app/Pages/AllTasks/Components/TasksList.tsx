import React, { useEffect, useMemo, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import CachedIcon from '@mui/icons-material/Cached';
import CircleIcon from '@mui/icons-material/Circle';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useContextApp } from 'app/app/contextApp';
import { Project, Task } from 'app/app/Data/AllProjects';
import { getIconComponent } from 'app/app/functions/IconsActions';
import { TasksEmptyScreen } from 'app/app/EmptyScreens/TasksEmptySreen';

const TasksList = () => {
    const {
        chosenProjectobject: {chosenProject},
        allProjectsObject: {allProjects},
        tabsOptionsObject: {tabsOptions},
        allTasksObject: {allTasks},
    } = useContextApp();

    //Filter tasks based on chosen project status
    const filteredTasks = useMemo(() => {
        let tasks =  allTasks;

        //Filter by project
        if(chosenProject){
            tasks = tasks.filter((task) => task.projectName === chosenProject.title);
        }

        //Filter by status if "Completed" tab is selected:
        if(tabsOptions[1].isSelected) {
            tasks = tasks.filter((task) => task.status === "Completed");
        } else {
            tasks = tasks.filter((task) => task.status === "In Progress");
        }

        return tasks;
    }, [allTasks, chosenProject, tabsOptions, allProjects]);


    return (
        <div className='ml-12 max-sm:ml-0 mt-11 flex flex-col gap-4'>
            <Tabs />
            {chosenProject?.tasks.length === 0 ? (
                <TasksEmptyScreen/>
            ):(
                <div className='flex flex-col gap-4 w-full overflow-auto'>
                    {filteredTasks.map((singleTask, index) => (
                        <SingleTask key={index} task={singleTask}/>
                    ))}
                </div>
            )}
        </div>
    )
}

export default TasksList;

function Tabs(){
    const {
        allProjectsObject: {allProjects},
        chosenProjectobject: {chosenProject},
        tabsOptionsObject: {tabsOptions, setTabsOptions}
    } = useContextApp();

    function countOnGoingTasks(){
        //If chosen project is not null, count the tasks are  in progress  by using the reduce method based on its status
        if(chosenProject){
            return chosenProject.tasks.reduce((accTask, task) => {
                return accTask + (task.status === "In Progress" ? 1 : 0);
            }, 0);
        }

        //otherwise count total of all tasks in all Projects
        return allProjects.reduce((accProjects, project) => {
            return(
                accProjects + project.tasks.reduce((accTasks, task) => {
                    return accTasks + (task.status === "In Progress" ? 1 : 0)
                }, 0)
            );
        }, 0);
    }

    function completedTasks(){

        //If chosen project is selected, calculate the difference  between the on going tasks and the total  of all tasks in this project
        if(chosenProject){
            return chosenProject.tasks.length - countOnGoingTasks();
        }

        //The same for all projects but first we need the count  all the tasks in all project, that's why I'm using reduce function
        const totalTasksInAllProjects = allProjects.reduce((acc, project) => {
            return acc + project.tasks.length;
        }, 0);

        //If the chosen project  is still null, return the completed tasks of all projects
        return totalTasksInAllProjects - countOnGoingTasks();
    }

    function switchTabs(index: number){
        setTabsOptions((prevState) => 
            prevState.map((tab, i) => ({
                ...tab,
                isSelected: index === i
            }))    
        );
    }

    return (
        <div className='flex items-center gap-6 ml-3 mt-8 mb-5'>
            {tabsOptions.map((singleTabOption, index) => (
                <div 
                    key={index}
                    onClick={() => switchTabs(index)}
                    className={`flex gap-2 cursor-pointer 
                        ${singleTabOption.isSelected ? "text-orange-600 font-semibold" : "text-slate-300"}`}
                >
                    <span>{singleTabOption.name}</span>
                    <span 
                        className={`${singleTabOption.isSelected ? "bg-orange-600" : "bg-slate-300"} text-white px-2 rounded-md max-[420px]:hidden`}
                    >
                        {singleTabOption.id === 1 ? countOnGoingTasks() : completedTasks()}
                    </span>
                </div>
            ))}
        </div>
    );
}

function SingleTask({task} : {task: Task} ){
    const {
        selectedTaskObject: {setSelectedTask},
        openTasksWindowObject: {setOpenTasksWindow},
        openConfirmationWindowObject: {setOpenConfirmationWindow},
        allProjectsObject: {allProjects, setAllProjects},
        allTasksObject: {allTasks, setAllTasks},
        chosenProjectobject: {chosenProject, setChosenProject},
    } = useContextApp();

    const [checked, setChecked] = useState(false);
    const priorityColors = {
        Low: "text-green-500",
        Medium: "text-yellow-500",
        High: "text-red-500",
    }

    useEffect(() => {
        setChecked(task.status === "Completed");
    }, [task]);

    function updateStatus(){
        const newStatus = checked ? "In Progress" : "Completed";

        //Update allProjects
        const updatedProjects: Project[] = allProjects.map((project) => ({
            ...project,
            tasks: project.tasks.map((t) =>
                t.id === task.id ? {...t, status: newStatus}: t
            ),
        }));

        //Update allTasks
        const updatedTasks: Task[] = allTasks.map((t) =>
            t.id === task.id ? {...t, status: newStatus}: t
        );

        if(chosenProject){
            const updateChosenProject: Project = {
                ...chosenProject,
                tasks: chosenProject.tasks.map((t) => {
                    if(task.id === t.id){
                        return {...t, status: newStatus};
                    }
                    return t;
                }),
            };
            setChosenProject(updateChosenProject);
        }

        //update states
        setAllProjects(updatedProjects);
        setAllTasks(updatedTasks);
        setChecked(!checked);
    }

    return (
        <div className='flex gap-2 items-center'>
            <Checkbox
                sx={{
                    color:"orangered",
                    "&.Mui-checked": {
                        color: "orange",
                    }
                }}
                onClick={updateStatus}
                checked={checked}
            />
            <div className='w-full bg-white rounded-lg border-slate-100 flex gap-3 items-center justify-between p-5 py-6'>
                <div className='flex gap-3 items-center'>
                    {/* Wallter icon */}
                    <div>
                        <div className='bg-orange-200 rounded-lg p-2 flex items-center justify-center'>
                                {getIconComponent(task.icon, "text-orange-600")}
                            {/* <ListIcon /> */}
                        </div>
                    </div>
                    {/* Wallet Name */}
                    <div 
                        onClick={() => {setSelectedTask(task); setOpenTasksWindow(true);}}
                        className='flex flex-col'
                    >
                        <span className='font-bold hover:text-orange-600 cursor-pointer'>
                            {task.title}
                        </span>
                        <div className='flex'>
                            <span className='text-[13px] text-slate-400 p-[2px]'>
                                {task.projectName}
                            </span>
                        </div>
                    </div>
                </div>

                <div className='flex gap-36 font-bold items-center'>
                    {/* Status */}
                    <div className='flex gap-2 items-center max-[770px]:hidden'>
                        <CachedIcon className='text-slate-400 text-[24px]'/>
                        <span className='text-14px text-slate-400'>
                            {task.status}
                        </span>
                    </div>

                    {/* Priority */}
                    <div className='flex gap-2 items-center max-[940px]:hidden'>
                        {<CircleIcon 
                            className={`text-[14px] ${priorityColors[task.priority]}`}
                        />}
                        <span className='text-[14px] text-slate-400'>
                            {task.priority}
                        </span>
                    </div>

                    {/* Actions Buttons */}
                    <div className='flex gap-2 items-center'>
                        {/* Edit button */}
                        <div 
                            onClick={() => {setSelectedTask(task); setOpenTasksWindow(true);}}
                            className='rounded-lg p-2 flex items-center justify-center cursor-pointer bg-orange-200 hover:bg-orange-300 transition-all'
                        >
                            <EditOutlinedIcon sx={{fontSize:"17px"}} className='text-orange-600'/>
                        </div>

                        {/* Delete Button */}
                        <div 
                            onClick={() => {setSelectedTask(task); setOpenConfirmationWindow(true)}}
                            className='rounded-lg  p-2 flex items-center justify-center cursor-pointer bg-slate-200 hover:bg-slate-300'>
                            <DeleteOutlinedIcon sx={{fontSize:"17px"}} className='text-slate-600'/>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}