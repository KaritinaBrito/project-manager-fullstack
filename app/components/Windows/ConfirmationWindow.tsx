"use client";
import React, { useEffect, useState } from 'react';
import { useContextApp } from "app/app/contextApp";
import {toast} from 'react-hot-toast';
import { deleteProject } from 'app/app/functions/projectsAction';
import { deleteTask } from 'app/app/functions/tasksFunction';

function ConfirmationWindow(){
    const {
        openConfirmationWindowObject: {openConfirmationWindow, setOpenConfirmationWindow},
        selectedProjectObject: {selectedProject, setSelectedProject},
        allProjectsObject: {allProjects, setAllProjects},
        chosenProjectobject: {chosenProject, setChosenProject},
        allTasksObject: {allTasks, setAllTasks},
        selectedTaskObject: {selectedTask, setSelectedTask},
    } = useContextApp();

    const [isLoading, setIsLoading] = useState(false);
    const [header, setHeader] = useState("");
    const [message, setMessage] = useState("");

    function closeConfirmationWindow () {
        setOpenConfirmationWindow(false);
        setSelectedProject(null);
    };

    async function deleteFunction (){
        try{
            //set the loading as true
            setIsLoading(true)

            //simulate a delay
            await new Promise((resolve) => setTimeout(resolve, 1000));

            //delete the project
            if(selectedProject){
                deleteProject(
                    selectedProject,
                    setSelectedProject,
                    allProjects,
                    setAllProjects,
                    allTasks,
                    setAllTasks,
                    setOpenConfirmationWindow
                );
            } else if(selectedTask){
                deleteTask({
                    taskToDelete: selectedTask,
                    allProjects,
                    chosenProject,
                    setAllTasks,
                    setChosenProject,
                    setAllProjects
                })
            }
        } catch(error){
            console.log(error);
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
            setOpenConfirmationWindow(false);

            //Set the chosen project only if we are going to delete a project
            selectedTask === null && setChosenProject(null);

            setSelectedProject(null);
            setSelectedTask(null);
            toast.success(
                `${selectedProject ? "Project" : "Task"} deleted successfully.`
            );
        }
    }

    useEffect(() => {
        if(selectedProject){
            setHeader("Project");
            setMessage(` Are you  sure you want to remove this project? This action can't be undone, and will remove all projects associeted with it.`);
        } else if(selectedTask){
            setHeader("Task");
            setMessage(` Are you  sure you want to remove this task? This action can't be undone.`)
        }
    }, [openConfirmationWindow, selectedProject, selectedTask]);

    return (
        <div className={`w-[38%] bg-white max-sm:w-[91%] max-lg:w-[80%] p-6 fixed shadow-md z-[90] rounded-lg flex items-center top-[30%] left-1/2 -translate-x-1/2 ${openConfirmationWindow ? "block" : "hidden"}`}>
            <div className="rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-5">Delete {header}</h2>
                <p className={`text-gray-600 mb-4 text-sm `}>
                    {message}
                </p>

                <div className="flex justify-end gap-2 mt-10 text-[13px]">
                    <button
                        onClick={closeConfirmationWindow}
                        className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={deleteFunction}
                        className="px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-lg text-white"
                    >
                        {isLoading ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationWindow;