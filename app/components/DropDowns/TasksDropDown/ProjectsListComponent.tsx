import React from "react";
import { useTaskFormContext } from "../../Windows/TasksWindow";
import{ProjectWithSelection} from "../../Windows/TasksWindow";
import {getIconComponent} from "../../../functions/IconsActions";

export default function ProjectsListComponent(){
    const {
        updatedAllProjects: {updatedAllProjects, setUpdatedAllProjects},
    } = useTaskFormContext();

    return(
        <div className="flex flex-col gap-3">
            {updatedAllProjects.map((singleProject, index) => (
                <SingleProject 
                    key={index}
                    singleProject={singleProject}
                    index={index}
                />
            ))}
        </div>
    );

    function SingleProject ({
        singleProject,
        index
    } : {singleProject: ProjectWithSelection; index: number}){
        const {setProject, setOpenTasksDropDown} = useTaskFormContext();

        function updateTheProjectState(index: number){
            //Update the project selected
            setProject(singleProject);
            //Update the updateAllProjects Array
            setUpdatedAllProjects((prevProjects) =>
                prevProjects.map((project, i) => ({
                    ...project,
                    isSelected: index === i,
            }))
        );
        //Close the drop down
        setOpenTasksDropDown(false);
        }

        return(
            <div 
                onClick={()=> updateTheProjectState(index)}
                className={`${singleProject.isSelected && "bg-orange-50 border border-orange-200"} flex items-center gap-2 p-[7px] rounded-md cursor-pointer`}
            >
                <div className={`flex gap-2 items-center`}>
                    {/* Icon */}
                    <div>
                        {getIconComponent(singleProject.icon, "text-orange-600", "22px")}{""}
                    </div>
                    <span className="mt-[3px] hover:text-orange-600 text-slate-500">
                        {singleProject.title}
                    </span>
                </div>
            </div>
        );
    }
}