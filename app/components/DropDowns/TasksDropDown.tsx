import React, { useEffect } from "react";
import { useRef } from "react";
import PriorityListComponent from "../DropDowns/TasksDropDown/PriorityListComponent";
import ProjectsListComponent from "../DropDowns/TasksDropDown/ProjectsListComponent";
import { useTaskFormContext } from "../Windows/TasksWindow";

export default function TasksDropDown(){
    const {openTasksDropDown, setOpenTasksDropDown, tasksDropDownPositions, clickedSelection} = useTaskFormContext();

    const menuRef = useRef<HTMLDivElement>(null);
    const dropDownToggle = openTasksDropDown ? 'block' : 'hidden';

    useEffect(() => {
        function handleClickOutside(event: MouseEvent){
            if(menuRef.current && !menuRef.current.contains(event.target as Node)){
                setOpenTasksDropDown(false);
            }
        }

        function handleResize(){
            //Close the drop down menu when the window is resized
            setOpenTasksDropDown(false);
        }
        if(openTasksDropDown){
            document.addEventListener("mousedown", handleClickOutside);
            window.addEventListener("resize", handleResize);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
            window.removeEventListener("resize", handleResize);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            window.removeEventListener("resize", handleResize);
        }

    }, [openTasksDropDown, setOpenTasksDropDown]);

    //let udpateBottomPos = 0;
    let updatedRightPos = 0;
    let updatedLeftPos = 0;

    if(clickedSelection){
        if(clickedSelection === "priority"){
            updatedRightPos = 0;
            updatedLeftPos = 40;
        } else {
            updatedRightPos = 40;
            updatedLeftPos = 0
        }
    }

    
    return(
        <div 
            ref={menuRef}
            style={{
                left: clickedSelection === "priority" ? updatedLeftPos : "auto",
                right: clickedSelection === "priority" ? "auto" : updatedRightPos,
                top: tasksDropDownPositions.top -49,
                width: tasksDropDownPositions.width
            }}
            className={` ${dropDownToggle} bg-white absolute p-3 z-[90] border border-slate-50 select-none shadow-md rounded-lg flex flex-col gap-2`}
        >
            {clickedSelection === "priority" ? (
                <PriorityListComponent/>
            ) : (
                <ProjectsListComponent />
            )}
        </div>
    );
}