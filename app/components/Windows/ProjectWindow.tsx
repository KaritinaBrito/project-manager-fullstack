"use client";
import React, { useEffect, useState } from 'react';
import {useContextApp} from "../../contextApp";
import BorderAllIcon from '@mui/icons-material/BorderAll';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { useForm, SubmitHandler, UseFormRegister, FieldErrors } from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as z from 'zod';
import {addNewProject, editProject} from '../../functions/projectsAction';
import {getIconComponent    } from '../../functions/IconsActions';
import toast from 'react-hot-toast';
import { allIconsArray } from 'app/app/Data/AllIcons';
import { Project } from 'app/app/Data/AllProjects';

const schema = z.object({
    projectName: z
        .string()
        .min(1, {message: "Project name is required"})
        .max(30, {message: "Project name must be 30 characters or less"}),
});

export type FormData = z.infer<typeof schema>;

function ProjectWindow(){
    const {
        openProjectWindowObject: {openProjectWindow, setOpenProjectWindow},
        allProjectsObject: {allProjects, setAllProjects},
        selectedIconObject: {selectedIcon, setSelectedIcon},
        selectedProjectObject: {selectedProject, setSelectedProject},
        chosenProjectobject: {chosenProject, setChosenProject},
        allTasksObject: {allTasks, setAllTasks}
    } = useContextApp();

    const [isLoading, setIsLoading] = useState(false);

    const {register, handleSubmit, setValue, formState: { errors }, setError, setFocus, reset,} = useForm<FormData>({
        resolver: zodResolver(schema)
    });

    const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
        // Check if the project already exist
        const existingProject = allProjects.find(
            (project) => project.title.toLowerCase() === data.projectName.toLowerCase()
        );

        // if it existing, return an error
        if(existingProject && !selectedProject){
            setError("projectName", {
                type: "manual",
                message: "Project already exists",
            });
            // Set the focus to the project name input
            setFocus("projectName");
            return;
        } 

        projectsFunction()


        async function projectsFunction(){
            try{
                //set the loading is true
                setIsLoading(true);
    
                //Simulate  a delay
                await new Promise((resolve) => setTimeout(resolve, 1000));
    
                if(!selectedProject){
                    addNewProject(
                        data,
                        allProjects,
                        setAllProjects,
                        setOpenProjectWindow,
                        selectedIcon,
                        reset
                    );
                } else {
                    editProject(
                        selectedProject, 
                        setSelectedProject,
                        data,
                        selectedIcon,
                        allProjects,
                        allTasks,
                        setAllTasks,
                        setAllProjects,
                        setOpenProjectWindow
                    )
                }
    
            } catch(error){
                console.log(error);
                toast.error("Something went wrong");
            } finally {
                //set the Loading false
                setIsLoading(false);

                //Update the chosen project
                if(selectedProject && chosenProject){
                    //if the project we want  to edit  is the same that is selected in the all tasks page
                    if(chosenProject.id === selectedProject.id){
                        const updateChosenPorject: Project = {
                            ...chosenProject,
                            title: data.projectName,
                        };
                        setChosenProject(updateChosenPorject);
                    }
                }
                toast.success(`Project ${selectedProject ? "edited" : "added"} successfully`);
            }
        }
    };
    

    const handleClose = () => {
        setOpenProjectWindow(false);
        reset();
    };

    useEffect(()=> {
        if(openProjectWindow){
            if(!selectedProject){
                reset();
            } else {
                setValue("projectName", selectedProject.title);

                const findIconsInArray = allIconsArray.find((icon) => icon.name === selectedProject.icon);
                if(findIconsInArray){
                    setSelectedIcon(findIconsInArray);
                }
            }
        }
    }, [openProjectWindow, reset]);

    return (
        <div className={`${openProjectWindow ? "block" : "hidden"} w-[48%] max-sm:w-[82%] max-[600px]:w-[93%] z-[80] p-3 left-1/2 top-[47%] -translate-y-1/2 -translate-x-1/2 absolute flex flex-col gap-3 border border-slate-50 bg-white rounded-lg shadow-md`}>
            {/* Header */}
            <Header handleClose={handleClose} />
            <form 
                onSubmit={handleSubmit(onSubmit)}
                className='flex flex-col gap-2 pt-8 px-7 mt-3'
            >
                {/* Project input */}
                <ProjectInput register={register} errors={errors}/>
                {/* Footer */}
                <Footer handleClose={handleClose}/>
            </form>
        </div>
    );
    function Header ({handleClose} : {handleClose: () => void}){
        const {
            selectedProjectObject: {selectedProject},
        } = useContextApp();

        const {
            selectedIconObject: { setSelectedIcon} 
        } = useContextApp();
    
        return(
            <div  className='flex justify-between items-center pt-7 px-7'>
                <div className='flex items-center gap-2'>
                    {/* Project Icon */}
                    <div className='p-[7px] bg-orange-200 rounded-lg flex items-center justify-center'>
                        <BorderAllIcon 
                            sx={{fontSize: "21px"}} 
                            className="text-orange-600"
                        />
                    </div>
                    {/* Project Header */}
                    <span className="font-semibold text-lg">
                        {selectedProject ? "Edit Project" : "New Project"}
                    </span>
                </div>
    
                <CloseOutlinedIcon 
                    sx={{fontSize: "18px"}}
                    className="text-slate-300 cursor-pointer"
                    onClick={() => {
                        setSelectedIcon(null);
                        handleClose();
                    }}
                />
            </div>
        );
    }
    
    function ProjectInput ({
        register, 
        errors} :{register: UseFormRegister<FormData>; errors: FieldErrors<FormData>;
        }) {
            const {
                openIconWindowObject: {setOpenIconWindow},
                selectedIconObject: {selectedIcon},
            } = useContextApp();
    
        return(
            <div className="flex flex-col gap-2">
                <span className="text-[14px] font-medium text-slate-600">Project Name</span>
                <div className="flex gap-3 justify-between">
                    {/* Input */}
                    <div className="w-full">
                        <input 
                            {...register("projectName")}
                            placeholder="Enter Project Name..."
                            className="p-[10px] text-[13px] w-full rounded-md border ourline-none"                    
                        />
                        {errors.projectName && (
                            <p className='text-[11px] mt-2 text-red-500'>
                                {errors.projectName?.message}
                            </p>
                        )}
                    </div>
    
                    {/* Icon */}
                    <div 
                        onClick={() => setOpenIconWindow(true)}
                        className='w-12 h-10 text-white flex items-center justify-center bg-orange-600 rounded-lg cursor-pointer'
                    >
                        {selectedIcon ? (
                            getIconComponent(selectedIcon?.name, "text-white")
                        ) : (
                            <LibraryBooksIcon className="text-white"/>
                        )}
                    </div>
                </div>
            </div>
        )
    }
    
    function Footer ({handleClose}:{handleClose: () => void}){
        const {
            selectedIconObject: {setSelectedIcon},
            selectedProjectObject: {selectedProject},
        } = useContextApp();

        return (
            <div className='w-[102%] p-[12px] mt-8 mb-4 flex gap-3 justify-end items-center'>
                {/* Cancel Button */}
                <button
                    onClick={() => {
                        handleClose();
                        setSelectedIcon(null);
                    }}
                    className='border border-slate-200 text-slate-400 text-[13px] p-2 px-6 rounded-md hover:border-slate-300 transition-all'
                >
                    Cancel
                </button>
    
                <button type='submit' className='bg-orange-600 hover:bg-orange-700 text-white text-[13px] p-2 px-4 rounded-md transition-all'>
                    {isLoading 
                        ? "Saving" 
                        : selectedProject
                        ? "Edit Project"
                        : "Add Project"
                    }
                </button>
            </div>
        );
    }
}


export default ProjectWindow;