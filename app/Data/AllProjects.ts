import { v4 as uuidv4 } from "uuid";

// Define the structure for a task
export type Task = {
    id: string;
    title: string;
    icon: string;
    projectName: string;
    status: "In Progress" | "Completed";
    priority: "Low" | "Medium" | "High";
    createdAt: string;
    updateAt: string;
};

// Define the structure for a project
export type Project = {
    id: string;
    clerkUserId: string;
    title: string;
    createdAt: string;
    updateAt: string;
    icon: string;

    tasks: Task[];
};

// Sample data with three tasks
export const projectsData: Project[] = [
    {
        id: uuidv4(),
        clerkUserId: "123",
        title: "Project Title",
        createdAt: "2024-08-26T10:00:00Z",
        updateAt: "2024-08-26T14:30:00Z",
        icon: "LibraryBooks",

        tasks: [
            {
                id: uuidv4(),
                title: "Create the UI Design of the task 1",
                icon: "SignalCellularAlt",
                projectName: "Project Title",
                status: "In Progress",
                priority: "Low",
                createdAt: "2024-08-26T10:00:00Z",
                updateAt: "2024-08-26T14:30:00Z",
            },
            {
                id: uuidv4(),
                title: "Create the UI Design of the task 1",
                icon: "SignalCellularAlt",
                projectName: "Project Title",
                status: "In Progress",
                priority: "Low",
                createdAt: "2024-08-26T10:00:00Z",
                updateAt: "2024-08-26T14:30:00Z",
            },
            {
                id: uuidv4(),
                title: "Create the UI Design of the task 2",
                icon: "SignalCellularAlt",
                projectName: "Project Title",
                status: "In Progress",
                priority: "Low",
                createdAt: "2024-08-26T10:00:00Z",
                updateAt: "2024-08-26T14:30:00Z",
            },
            {
                id: uuidv4(),
                title: "Create the UI Design of the task 3",
                icon: "SignalCellularAlt",
                projectName: "Project Title",
                status: "In Progress",
                priority: "Low",
                createdAt: "2024-08-26T10:00:00Z",
                updateAt: "2024-08-26T14:30:00Z",
            }
        ]
    },
    {
        id: uuidv4(),
        clerkUserId: "123",
        title: "Project Title 2",
        createdAt: "2024-08-26T10:00:00Z",
        updateAt: "2024-08-26T14:30:00Z",
        icon: "LibraryBooks",

        tasks: [
            {
                id: uuidv4(),
                title: "Create the UI Design of the task 1",
                icon: "SignalCellularAlt",
                projectName: "Project Title 2",
                status: "Completed",
                priority: "Low",
                createdAt: "2024-08-26T10:00:00Z",
                updateAt: "2024-08-26T14:30:00Z",
            }
        ]
    }
]