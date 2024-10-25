import { createContext, useContext, useEffect, useRef, useState } from "react";
import {Project, Task, } from "../../Data/AllProjects";
import {SortingDropDownPosition} from "../../types/AppTypes";
import { useContextApp } from 'app/app/contextApp'; 
import TasksDropDown from 'app/app/components/DropDowns/TasksDropDown';
import ListAltIcon from "@mui/icons-material/ListAlt";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import CircleIcon from "@mui/icons-material/Circle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { getIconComponent } from "app/app/functions/IconsActions";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import * as z from 'zod';
import { FieldErrors, SubmitHandler, useForm, UseFormRegister } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";
import { allIconsArray } from "app/app/Data/AllIcons";
import addNewTask from "app/app/functions/tasksFunction";
import toast from "react-hot-toast";



export type SelectionOption = "priority" | "project";

export type Priority = {
    id: number;
    name: string;
    icon: React.ReactNode;
    isSelected: boolean;
};

export type Errors = {
    
    id: number,
    label: string,
    message: string,
    show: boolean,
}

export type ProjectWithSelection = Project & {isSelected: boolean};

//Define the structure of our context
type TaskFormType = {
    clickedSelection: SelectionOption | null;
    setClickedSelection: React.Dispatch<React.SetStateAction<SelectionOption | null>>;
    openTasksDropDown: boolean;
    setOpenTasksDropDown: React.Dispatch<React.SetStateAction<boolean>>;
    tasksDropDownPositions: SortingDropDownPosition;
    setTasksDropDownPositions: React.Dispatch<React.SetStateAction<SortingDropDownPosition>>;
    priority: Priority | null;
    setPriority: React.Dispatch<React.SetStateAction<Priority | null>>;
    project: Project | null;
    setProject: React.Dispatch<React.SetStateAction<Project | null>>;
    priorityList: {
        priorityList: Priority[];
        setPriorityList: React.Dispatch<React.SetStateAction<Priority[]>>;
    };
    updatedAllProjects: {
        updatedAllProjects: ProjectWithSelection[];
        setUpdatedAllProjects: React.Dispatch<React.SetStateAction<ProjectWithSelection[]>>;
    };
    selectionErrorsObject: {
        selectionErrors: Errors[];
        setSelectionErrors: React.Dispatch<React.SetStateAction<Errors[]>>;
    },
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

//Set the default state
const TaskFormState= {
    clickedSelection: null,
    setClickedSelection: () => {},
    openTasksDropDown: false,
    setOpenTasksDropDown: () => {},
    tasksDropDownPositions: {left:0, top: 0},
    setTasksDropDownPositions: () =>{},
    priority: null,
    setPriority: () => {},
    project: null,
    setProject: () => {},
    priorityList: {
        priorityList: [],
        setPriorityList: () => {}
    },
    updatedAllProjects: {
        updatedAllProjects: [],
        setUpdatedAllProjects: () => {}
    },
    selectionErrorsObject: {
        selectionErrors: [],
        setSelectionErrors: () => {}
    },
    isLoading: false,
    setIsLoading: () => {},
}
//Create context
const TaskFormContext = createContext<TaskFormType>(TaskFormState);

//Create a custom hook to consume our context
export  function useTaskFormContext(){
    return useContext(TaskFormContext);
}

//Zod schema
const schema = z.object({
    tasktName: z
        .string()
        .min(1, {message: "Task name is required"})
        .max(30, {message: "Task name must be 30 characters or less"}),
});

//Infer the type  from the schema
type FormData = z.infer<typeof schema>;

export function TaskWindow(){
    //Usage of the  for Data
    const { 
        handleSubmit, register, reset, setError, setFocus, formState: {errors}, setValue
    } = useForm<FormData>({resolver: zodResolver(schema)});

    const [clickedSelection, setClickedSelection] = useState<SelectionOption | null>(null);
    const [openTasksDropDown, setOpenTasksDropDown] = useState(false);
    const [tasksDropDownPositions, setTasksDropDownPositions] = useState<SortingDropDownPosition>({left:0, top: 0, width: 0});
    const [priority, setPriority] = useState<Priority | null>(null);
    const [project, setProject] = useState<Project | null>(null);
    const [priorityList, setPriorityList] = useState<Priority[]>([
        {
            id: 1,
            name: "Low",
            icon: <CircleIcon className="text-[14px] text-green-500" />,
            isSelected: false
        },
        {
            id: 2,
            name: "Medium",
            icon: <CircleIcon className="text-[14px] text-yellow-500"/>,
            isSelected: false
        },
        {
            id: 3,
            name: "High",
            icon: <CircleIcon className="text-[14px] text-red-500"/>,
            isSelected: false
        }
    ]);

    const {
        allProjectsObject: {allProjects, setAllProjects},
        openTasksWindowObject: {openTasksWindow, setOpenTasksWindow},
        selectedIconObject: {selectedIcon, setSelectedIcon},
        chosenProjectobject: {chosenProject, setChosenProject},
        allTasksObject: {allTasks, setAllTasks},
        selectedTaskObject: {selectedTask, setSelectedTask},
        projectClickedObject: {projectClicked, setProjectClicked},
    } = useContextApp();

    const [updateAllProjects, setUpdateAllProjects] = useState<ProjectWithSelection[]>([]);
    const [selectionErrors, setSelectionErrors] = useState([
        {
            id: 1,
            label: "priority",
            message: "Please select the priority",
            show: false,
        },
        {
            id: 2,
            label: "project",
            message: "Please select a project",
            show: false,
        },
    ]);
    const [isLoading, setIsLoading] = useState(false);


    //Add the inSelected Property to allProjects
    //Added this useEffect, so whenever the all projects is updated
    //we are going to add the  isSelected property
    useEffect(() => {
        const tempAllPorjects: ProjectWithSelection[] = allProjects.map((project) => ({
            ...project,
            isSelected: false,
        }));

        setUpdateAllProjects(tempAllPorjects);
    }, [allProjects]);

    useEffect(() => {
        //Reset the input
        if(!selectedTask){
            if(projectClicked){
                setProject(projectClicked);
                setUpdateAllProjects((prevProjects) =>
                    prevProjects.map((proj) => ({
                        ...proj,
                        isSelected: proj.id === projectClicked.id ? true: false,
                    }))
                );
            } else {
                setProject(null);
            }
            reset();
            //Rest the  priority  and  project states
            setPriority(null);
            setProject(null);
        } else {
            //update the input name
            setValue("tasktName", selectedTask.title);

            //extract the priority from the priority list  and update the priority state
            const getPriority = priorityList.find(
                (priority) => priority.name === selectedTask.priority
            );
            if(getPriority){
                setPriority(getPriority);
            }

            //extract the project from updatedAllProjects list and update the project state
            const getProject = updateAllProjects.find(
                (proj) => proj.title.toLowerCase() === selectedTask.projectName.toLowerCase()
            );

            if(getProject){
                setProject(getProject);
            }

            //update the icon 
            const findIconAllIconsArray = allIconsArray.find(
                (icon) => icon.name === selectedTask.icon
            );
            if(findIconAllIconsArray){
                setSelectedIcon(findIconAllIconsArray);
            }
        }

        //Set the timeout
        setTimeout(() => {
            setFocus("tasktName");
        }, 0);
        //Set all the  show properties  to false
        setSelectionErrors((prevState) => 
            prevState.map((error) => ({...error, show: false}))
        );
    }, [openTasksWindow]);


    const onSubmit: SubmitHandler<FormData> = (data) => {
        //Check if  the task already  exists into the project selected
        if(project){
            //1. find  the project  in the updatedProject Array
            const findProject = updateAllProjects.find(
                (proj) => proj.id === project.id
            );

            //2. Look for the task if is in all tasks array in the project
            const findTask = findProject?.tasks.find(
                (task) => task.title.toLowerCase() === data.tasktName.toLowerCase()
            );

            if(findTask){
                setError("tasktName", {
                    type: "manual",
                    message: "task already exists",
                });
                //Set the  focus  to the project name input
                setFocus("tasktName");
                return;
            }
        }

        const newErrors = selectionErrors.map((error) => {
            if(error.label === "priority" && !priority){
                return {...error, show: true};
            }

            if(error.label === "project" && !project){
                return {...error, show: true};
            }            
            return {...error, show: false};
        });
        
        //If the show  properties  are false  when the use  clicks in submit
        //Then update  or add  a task
        if(newErrors.every((error) => error.show === false)){
            tasksFunction(data);
        }
        
        setSelectionErrors(newErrors);

    }

    async function tasksFunction(data: FormData){
        try{
            setIsLoading(true);
            //Simulate  a delay 
            await new Promise((resolve) => setTimeout(resolve, 1000));
            //Add new task
            if(!selectedTask){
                const newTask: Task = {
                    id: uuidv4(),
                    title: data.tasktName,
                    icon: selectedIcon ? selectedIcon.name : "MenuBook",
                    createdAt: new Date().toISOString(),
                    updateAt: new Date().toISOString(),
                    priority: priority ? priority?.name as "Low" | "Medium" | "High": "Low",
                    projectName: project?.title || "",
                    status: "In Progress",
                };

                addNewTask(
                    newTask,
                    allProjects,
                    setAllProjects,
                    chosenProject,
                    setChosenProject,
                    allTasks,
                    setAllTasks,
                    project
                );
            } else {
                //To update  everything, we are going  to fallow 4 steps:
                //1. Create the task object  we need to update
                //2. Re structure the all Projects array, to move the task that its project changed
                //3. Update the all tasks array that we are using the show all the tasks
                //4. Update the chosen project that we are using to select the project in the drop down
                
                // 1.
                const updateTask: Task = {
                    ...selectedTask,
                    title: data.tasktName,
                    icon: selectedIcon?.name || "LibraryBooksIcon",
                    status: selectedTask.status,
                    projectName: project?.title || "",
                    priority: priority?.name as "Low" | "Medium" | "High" || "Low",
                    updateAt: new Date().toISOString(),
                };

                //2. Update the all projects task array to move the task that to the project if it has been changed
                const updatedProjects = allProjects.map((proj) => {
                    if(proj.title === updateTask.projectName){
                        //If this is the correct project, either add or update the task
                        const taskExists = proj.tasks.some(
                            (task) =>task.id === updateTask.id
                        );
                        if(taskExists){
                            //Update the existing tak
                            return{
                                ...proj,
                                tasks: proj.tasks.map((task) =>
                                    task.id === updateTask.id ? updateTask : task
                                ),
                            };
                        } else{
                            //Add the task to this project
                            return {...proj, tasks: [...proj.tasks, updateTask]}
                        }
                    } else {
                        //For the other projects, remove the task if it exists
                        return {
                            ...proj,
                            tasks: proj.tasks.filter((task) => task.id !== updateTask.id),
                        };
                    }
                });

                //3.Update all tasks array
                const updateAllTasks = updatedProjects.flatMap((proj) => proj.tasks);
                setAllTasks(updateAllTasks);

                //Update the chosen project that we are using in the projects frop down 
                if(chosenProject && project){
                    //Creating a new array
                    let updateTasksOfChosenProject: Task[] = [];

                    //4. If the chosen project is the same as the project that we selected into the drop down 
                    //we are going to update the task in the tasks array
                    if(chosenProject.id === project.id){
                        updateTasksOfChosenProject = chosenProject.tasks.map((task) => {
                            if(task.id === updateTask.id){
                                return updateTask;
                            }
                            return task;
                        });
                        //If they are not it means that  it was  moved, so we need
                        //to delete the task from the tasks array

                    } else {
                        updateTasksOfChosenProject = chosenProject.tasks.filter(
                            (task) => task.id !== updateTask.id
                        );
                    }
                    const updatedChosenProject: Project = {
                        ...chosenProject,
                        tasks: updateTasksOfChosenProject,
                    };
                    setChosenProject(updatedChosenProject);
                }

                //Update the all projects
                setAllProjects(updatedProjects);

            }
            //addNewTask(data);
        } catch(error){
            console.log(error);
        } finally{
            toast.success(`The task has been ${selectedTask ? "edit" : "added"} successfully.`);
            setIsLoading(false);
            setOpenTasksWindow(false);
            setSelectedTask(null);
            setProjectClicked(null);
        }
    }



    return(
        <TaskFormContext.Provider
            value={{
                clickedSelection,
                setClickedSelection,
                openTasksDropDown,
                setOpenTasksDropDown,
                tasksDropDownPositions,
                setTasksDropDownPositions,
                priority,
                setPriority,
                project,
                setProject, 
                priorityList: {
                    priorityList,
                    setPriorityList
                },
                updatedAllProjects: {
                    updatedAllProjects: updateAllProjects,
                    setUpdatedAllProjects: setUpdateAllProjects,
                },
                selectionErrorsObject: {
                    selectionErrors, 
                    setSelectionErrors
                },
                isLoading,
                setIsLoading
            
            }}
        >
            <div className={`w-[48%] max-sm:w-[82%] max-[600px]:w-[93%] z-[80] p-3 left-1/2 top-[47%] -translate-y-1/2 -translate-x-1/2 absolute  flex flex-col gap-3 border border-slate-50 bg-white rounded-lg shadow-md ${openTasksWindow ? "block" : "hidden"}`}>
                <TasksDropDown />
                <Header />
                <form 
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-2 pt-8 px-7 mt-3">
                    {/* Input and icon */}
                    <TaskInput  register={register} errors={errors}/>
                    {/* Both selections components */}
                    <div className="flex justify-between gap-3 mt-5">
                        <PrioritySelection />
                        <ProjectsSelection />
                    </div>
                    <Footer isLoading={isLoading}/>
                </form>
            </div>
        </TaskFormContext.Provider>
    );
}

function Header(){
    const {
        openTasksWindowObject: {setOpenTasksWindow},
        selectedTaskObject: {selectedTask, setSelectedTask},
        projectClickedObject: {setProjectClicked},
    } = useContextApp();

    return(
        <div className=" flex justify-between items-center pt-7 px-7">
            <div className="flex items-center gap-2">
                <div className="p-[7px] bg-orange-200 rounded-lg flex items-center justify-center">
                    <ListAltIcon
                        sx={{fontSize: "21px"}}
                        className="text-orange-600"
                        onClick={() => {setOpenTasksWindow(false); setProjectClicked(null)}}
                    />
                </div>
                <span className="font-semibold text-lg">
                    {selectedTask ? "Edit Task" : "Add New Task"}
                </span>
            </div>

            <CloseOutlinedIcon 
                onClick={() => {setOpenTasksWindow(false); setSelectedTask(null)}}
                sx={{fontSize: "18px"}}
                className="text-slate-300 cursor-pointer"
            />
        </div>
    );
}

// Task input
function TaskInput ({register, errors} : {register: UseFormRegister<FormData>, errors: FieldErrors<FormData>}){
    const{ 
        openIconWindowObject: { setOpenIconWindow },
        selectedIconObject: { selectedIcon},
    } = useContextApp();
    return(
        <div className="flex flex-col gap-2">
            <span className="text-[14px] font-medium text-slate-600">Project Name</span>
            <div className="flex gap-3 justify-between">
                {/* Input */}
                <div className="w-full">
                    <input 
                        {...register("tasktName")}
                        placeholder="Enter Task Name..."
                        className="p-[10px] text-[13px] w-full rounded-md border ourline-none"                    
                    />
                    {errors.tasktName && (
                        <p className='text-[11px] mt-2 text-red-500'>
                            {errors.tasktName.message}
                        </p>
                    )}
                </div>

                {/* Icon */}
                <div 
                    onClick={() => setOpenIconWindow(true)}
                    className='w-12 h-10 text-white flex items-center justify-center bg-orange-600 rounded-lg cursor-pointer'
                >
                    {selectedIcon ? (
                        getIconComponent(selectedIcon?.name, "text-white", "text-[20px]")
                    ) : (
                        <LibraryBooksIcon />
                    )}
                </div>
            </div>
        </div>
    )
}


//Priority Selection
function PrioritySelection(){
    //Variables
    const {
        setClickedSelection,
        setOpenTasksDropDown,
        setTasksDropDownPositions,
        priority,
        selectionErrorsObject: {selectionErrors, setSelectionErrors}
    } = useTaskFormContext();

    const prioritySelectionRef = useRef<HTMLDivElement>(null);

    //Update the clicked selection state
    function handleClickedSelection(){
        //Update the properties of the tasks drop down positions state
        if(prioritySelectionRef.current){
            const rect = prioritySelectionRef.current.getBoundingClientRect();
            const {left, top, width} = rect;
            setTasksDropDownPositions({left: left, top: top, width: width});
        }
        //Ope the drop down
        setOpenTasksDropDown(true);
        //Update the clicked  selection state
        setClickedSelection("priority");
        //Hide  the error if it is show
        setSelectionErrors((prevState) => 
            prevState.map((error) => ({
                ...error,
                show: error.label === "priority" && false,
            }))
        );
    }

    return(
        <div
            ref={prioritySelectionRef}
            onClick={handleClickedSelection}
            className="flex flex-col gap-2 w-full relative cursor-pointer"
        >
            {/* Priority span */}
            <span className="text-[14px] font-medium text-slate-600">
                Task Priority
            </span>
            {/* Selection Placeholder and the arrow icon */}
            <div className="flex justify-between items-center border h-[42px] px-2 rounded-md">
                <span className="w-full text-[13px] text-slate-400">
                    {priority ? (
                        <div className="flex gap-1 items-center">
                            <div>{priority.icon}</div>
                            <span className="mt-[3px]">{priority.name}</span>
                        </div>
                    ) : (
                        <span>Select Priority</span>
                    )}
                </span>
            </div>
            {selectionErrors[0].show &&(
                <span className="text-red-500 text-[11px]">
                    {selectionErrors[0].message}
                </span>
            )}
        </div>
    )
}


//Projects
function ProjectsSelection(){
    //Variables
    const {
        setClickedSelection,
        setOpenTasksDropDown,
        setTasksDropDownPositions,
        project, 
        selectionErrorsObject: {selectionErrors, setSelectionErrors}
    } = useTaskFormContext();

    const projectsSelectionRef = useRef<HTMLDivElement>(null);

    //Update the clicked selection  state
    function handleClickedSelection(){
        //Update the properties  of the taks  drop down positions  state
        if(projectsSelectionRef.current){
            const rect = projectsSelectionRef.current.getBoundingClientRect();
            const {left, top, width} = rect;
            setTasksDropDownPositions({ left: left, top: top, width: width});
        }
        //Update  the clickedSelection  state
        setClickedSelection("project");
        //Open the tasks drop down
        setOpenTasksDropDown(true);
        //Hide  the error if it is show
        setSelectionErrors((prevState) => 
            prevState.map((error) => ({
                ...error,
                show: error.label === "project" && false,
            }))
        );
    }

    return (
        <div
            ref={projectsSelectionRef}
            onClick={handleClickedSelection}
            className="flex flex-col gap-2 w-full relative cursor-pointer"
        >
            {/* Projects span */}
            <span className="text-[14px] font-medium text-slate-600">Projects</span>
            {/* selection placeholder and the arrow icon  */}
            <div className=" flex justify-between items-center border  h-[42px] px-2 rounded-md">
                <span className="w-full text-[13px] text-slate-400">
                    {project ? (
                        <div className="flex gap-1 items-center">
                            <div>{getIconComponent(project.icon, "text-[16px]")}</div>
                            <span className="mt-[3px]">{project.title}</span>
                        </div>
                    ) : (
                        <span>Select Project</span>
                    )}
                </span>
                {/* Arrow icon */}
                <KeyboardArrowDownIcon className="absolute top-[40px] right-3 text-slate-400" />
            </div>
            {selectionErrors[1].show &&(
                <span className="text-red-500 text-[11px]">
                    {selectionErrors[1].message}
                </span>
            )}
        </div>
    )
}

//Footer
function  Footer ({isLoading}: {isLoading:boolean}){
    const {
        selectedIconObject: {setSelectedIcon},
        selectedTaskObject: {setSelectedTask, selectedTask},
        openTasksWindowObject: {setOpenTasksWindow},
        projectClickedObject: {setProjectClicked}

    } = useContextApp();
    return (
        <div className='w-[102%] p-[12px] mt-8 mb-4 flex gap-3 justify-end items-center'>
            {/* Cancel Button */}
            <button
                onClick={() => {
                    setOpenTasksWindow(false); 
                    setSelectedIcon(null);
                    setSelectedTask(null);
                    setProjectClicked(null);
                }}
                className='border border-slate-200 text-slate-400 text-[13px] p-2 px-6 rounded-md hover:border-slate-300 transition-all'
            >
                Cancel
            </button>

            <button 
                type='submit' 
                className='bg-orange-600 hover:bg-orange-700 text-white text-[13px] p-2 px-4 rounded-md transition-all'
            >
                {isLoading 
                    ? "Saving..." 
                    : selectedTask 
                    ? "Edit Task"
                    : "Add Task"
                }
            </button>
        </div>
    );
}