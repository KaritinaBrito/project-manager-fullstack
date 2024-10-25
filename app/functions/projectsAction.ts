import React, { Dispatch, SetStateAction } from 'react';
import { v4 as uuidv4 } from "uuid";
import { Project, Task } from '../../app/Data/AllProjects';
import { IconData } from '../../app/types/AppTypes';
import { FormData } from '../components/Windows/ProjectWindow';

export function addNewProject(
    data: FormData,
    allProjects: Project[],
    setAllProjects: Dispatch<SetStateAction<Project[]>>,
    setOpenProjectWindow: Dispatch<SetStateAction<boolean>>,
    selectedIcon: IconData | null,
    reset: () => void,
) {
    try {
        const newProject: Project = {
            id: uuidv4(),
            title: data.projectName,
            icon: selectedIcon?.name || "LibraryBooks",
            tasks: [],
            clerkUserId: "123",
            createdAt: new Date().toISOString(),
            updateAt: new Date().toISOString(),
        };
        setAllProjects([...allProjects, newProject]);
        setOpenProjectWindow(false);
        reset();
    } catch (error) {
        console.log(error);
    }
}

export function editProject(
    selectedProject: Project | null,
    setSelectedProject: React.Dispatch<React.SetStateAction<Project | null>>,
    data: FormData,
    selectedIcon: IconData | null,
    allProjects: Project[],
    allTasks: Task[],
    setAllTasks: React.Dispatch<React.SetStateAction<Task[]>>,
    setAllProjects: React.Dispatch<React.SetStateAction<Project[]>>,
    setOpenConfirmationWindow: React.Dispatch<React.SetStateAction<boolean>>,
) {
    if (selectedProject) {
        const updateProject: Project = {
            ...selectedProject,
            title: data.projectName,
            icon: selectedIcon?.name || "LocalLibrary",
            tasks: selectedProject.tasks.map((task) => ({
                ...task,
                projectName: data.projectName
            })),
        };

        const updateAllProjects = allProjects.map((project) => {
            if (project.id === selectedProject.id) {
                return updateProject;
            }
            return project
        });

        //update allTasks
        const updateAllTasks = allTasks.map((task) =>
            task.projectName === selectedProject.title
                ? { ...task, projectName: data.projectName }
                : task
        );

        setAllTasks(updateAllTasks);
        setAllProjects(updateAllProjects);
        setSelectedProject(null);
        setOpenConfirmationWindow(false);
    }
}

export function deleteProject(
    selectedProject: Project | null,
    setSelectedProject: React.Dispatch<React.SetStateAction<Project | null>>,
    allProjects: Project[],
    setAllProjects: React.Dispatch<React.SetStateAction<Project[]>>,
    allTasks: Task[],
    setAllTasks: React.Dispatch<React.SetStateAction<Task[]>>,
    setOpenConfirmationWindow: React.Dispatch<React.SetStateAction<boolean>>
) {
    if (selectedProject) {
        const updateAllProjects = allProjects.filter((project) => project.id !== selectedProject.id);

        setAllProjects(updateAllProjects);
        setSelectedProject(null);
        setOpenConfirmationWindow(false);
    }

}