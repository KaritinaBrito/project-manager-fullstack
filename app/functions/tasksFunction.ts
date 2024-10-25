import React from "react";
import { Project, Task } from "../Data/AllProjects";
import { Priority } from "../components/Windows/TasksWindow";

interface DeleteTaskProps {
    taskToDelete: Task;
    allProjects: Project[];
    chosenProject: Project | null;
    setAllTasks: (task: Task[]) => void;
    setChosenProject: (project: Project) => void;
    setAllProjects: (projects: Project[]) => void;
}

export default function addNewTask(
    newTask: Task,
    allProjects: Project[],
    setAllProjects: React.Dispatch<React.SetStateAction<Project[]>>,
    chosenProject: Project | null,
    setChosenProject: React.Dispatch<React.SetStateAction<Project | null>>,
    allTasks: Task[],
    setAllTasks: React.Dispatch<React.SetStateAction<Task[]>>,
    project: Project | null,
) {
    console.log(newTask);

    //upcate the all  projects array 
    const updateAllProjects = allProjects.map((proj) => ({
        ...proj,
        tasks: proj.id === project?.id ? [...proj.tasks, newTask] : [...proj.tasks],
    }));

    //Update the chosen project  state a well, so when the project is selected  in all tasks page,
    //I add the tasks, the number are  going to be updates as well
    if (chosenProject) {
        const copyChosenproject: Project = {
            ...chosenProject,
            tasks: [...chosenProject.tasks, newTask]
        };
        setChosenProject(copyChosenproject);
    }
    //update the states
    setAllTasks([...allTasks, newTask]);
    setAllProjects(updateAllProjects);
}

interface UpdateTaskAndProjectsProps {
    selectedTask: Task;
    data: FormData;
    selectedIcon: { name: string } | null;
    project: Project | null;
    priority: Priority | null;
    allProjects: Project[];
    chosenProject: Project | null;
    setAllTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    setChosenProject: React.Dispatch<React.SetStateAction<Project>>;
    setAllProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}



export const updateTaskAndProjects = ({
    updateTask,
    project,
    allProjects,
    chosenProject,
    setAllTasks,
    setChosenProject,
    setAllProjects
}: {
    updateTask: Task;
    project: Project | null;
    allProjects: Project[];
    chosenProject: Project | null;
    setAllTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    setChosenProject: React.Dispatch<React.SetStateAction<Project | null>>;
    setAllProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}) => {

    // Update the task in the corresponding project
    const updatedProjects = allProjects.map((proj) => {
        if (proj.title === updateTask.projectName) {
            const updatedTasks = proj.tasks.map((task) =>
                task.id === updateTask.id ? { ...task, ...updateTask } : task
            );
            return { ...proj, tasks: updatedTasks };
        }
        return proj;
    });

    // Updates the global task list
    const updatedAllTasks = updatedProjects.flatMap((proj) => proj.tasks);
    setAllTasks(updatedAllTasks);

    // If the chosen project is the one being updated, update its status as well
    if (chosenProject && chosenProject.id === project?.id) {
        const updatedChosenProject = {
            ...chosenProject,
            tasks: chosenProject.tasks.map((task) =>
                task.id === updateTask.id ? { ...task, ...updateTask } : task
            )
        };
        setChosenProject(updatedChosenProject);
    }

    // Update the status of all projects
    setAllProjects(updatedProjects);
}

export const deleteTask = ({
    taskToDelete,
    allProjects,
    chosenProject,
    setAllTasks,
    setChosenProject,
    setAllProjects,
}: DeleteTaskProps): void => {
    //1. Remove the task form all projects
    const updatedProjects = allProjects.map((proj) => ({
        ...proj,
        tasks: proj.tasks.filter((task) => task.id !== taskToDelete.id),
    }));

    //2.  Update all tasks array
    const updateAllTasks = updatedProjects.flatMap((proj) => proj.tasks);
    setAllTasks(updateAllTasks);

    //3. Update all tasks array
    if (
        chosenProject &&
        chosenProject.tasks.some((task) => task.id === taskToDelete.id)
    ) {
        const updatedChosenProject: Project = {
            ...chosenProject,
            tasks: chosenProject.tasks.filter((task) => task.id !== taskToDelete.id),
        };
        setChosenProject(updatedChosenProject);
    }

    //4. Update all projects
    setAllProjects(updatedProjects);
}
