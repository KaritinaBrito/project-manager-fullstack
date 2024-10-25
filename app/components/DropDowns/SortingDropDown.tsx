"use client";
import React, { useEffect, useRef } from "react";
import {useContextApp} from "../../contextApp";
import {sortProjects} from "../../functions/sortingFunctions";
import { Task } from "app/app/Data/AllProjects";

function SortingDropDown(){
    const {
        sortingOptionsProjectObject: {sortingOptionsProject, setSortingOptionsProject},
        sortingOptionsTaskObject: { sortingOptionsTask, setSortingOptionsTask},
        openSortingDropDownObject: {openSortingDropDown, setOpenSortingDropDown},
        sortingDropDownPositionsObject: {sortingDropDownPositions},
        allProjectsObject: {allProjects, setAllProjects},
        sideBarMenuObject: {sideBarMenu},
        allTasksObject: {allTasks, setAllTasks},
    } = useContextApp();

    const dropDownRef = useRef<HTMLDivElement>(null);

    const sortingOptionArray = sideBarMenu[0].isSelected
        ? sortingOptionsProject
        : sortingOptionsTask;

    useEffect(() => {
        function handleClickOutside (event: MouseEvent){
            if(
                dropDownRef.current && !dropDownRef.current.contains(event.target as Node)
            ){
                setOpenSortingDropDown(false);
            }
        }

        function handleResize(){
            setOpenSortingDropDown(false);
        }

        if(openSortingDropDown){
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
    }, [openSortingDropDown, setOpenSortingDropDown]);

    useEffect(() => {
        const currentSortingOption = sortingOptionsProject
            .flatMap((category) => category.options)
            .find((option) => option.selected);
        const selectedOption = currentSortingOption;

        const sortedProjects = sortProjects(allProjects, selectedOption?.value);

        if(JSON.stringify(sortedProjects) !== JSON.stringify(allProjects)){
            setAllProjects(sortedProjects);
        }        
    }, [allProjects]);
    

    // useEffect(() => {
    //     const sortedProjects = sortAllProjects();
    //     if(JSON.stringify(sortedProjects) !== JSON.stringify(allProjects)){
    //         setAllProjects(sortedProjects);
    //     }
    // }, [allProjects]);

  
    function handleOptionSelected(categoryIndex: number, optionIndex: number){
        // Update the selection in the sorting options array
        const updateSortingOptions = sortingOptionArray.map((category, cIndex) => ({
            ...category,
            options: category.options.map((option, oIndex) => ({
                ...option,
                selected: cIndex === categoryIndex && oIndex === optionIndex,
            })),
        }));

        // get the option object that has  the isSelected property as true
        const selectedOption = updateSortingOptions
            .flatMap((option) => option.options)
            .find((option) => option.selected);

        //If, the use is in  the all projects  page, sort the project, and if in the all tasks page, sort the all tasks array

        if(sideBarMenu[0].isSelected){
            const allSortedProjects = sortProjects(allProjects,selectedOption?.value);            
            setAllProjects(allSortedProjects);
            setSortingOptionsProject(updateSortingOptions);
            //If the tasks page is already selected, then exwcute the sorting af all tasks
        } else if (sideBarMenu[1].isSelected){
            const sortedTasks = sortAllTasks(allTasks, selectedOption?.value);
            setAllTasks(sortedTasks);

            //id we are in the all tasks page, we are going to update the sorting options tasks
            setSortingOptionsTask(updateSortingOptions);
        }
        setOpenSortingDropDown(false);
    }

    //Trigger the sorting whenever the allTasks is updated
    useEffect(() => {
        //Get the option value
        const currentSortingOption = sortingOptionsTask
            .flatMap((category) => category.options)
            .find((option) => option.selected);

        const selectedOption = currentSortingOption;

        const sortedTasks = sortAllTasks(allTasks, selectedOption?.value);
        if(JSON.stringify(sortedTasks) !== JSON.stringify(allTasks)){
            setAllTasks(sortedTasks)
        }
    }, [allTasks]);

    function sortAllTasks(allTasks: Task[], SelectionOptionValue: string | undefined){
        const sortedTasks = [...allTasks];//Copy of all tasks  avoid mutation

        switch (SelectionOptionValue) {
            case "asc":
                sortedTasks.sort((a,b) => a.title.localeCompare(b.title));
                break;
            case "desc":
                sortedTasks.sort((a,b) => b.title.localeCompare(a.title));
                break;
            case "newest":
                sortedTasks.sort(
                    (a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                );
                break;
            case "oldest":
                sortedTasks.sort(
                    (a,b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                );
                break;
            default:
                return allTasks;
        }
        return sortedTasks;
    }

    return (
        <div 
            ref={dropDownRef}
            style={{
                top: `${sortingDropDownPositions.top}px`,
                left: `${sortingDropDownPositions.left}px`,
                width: `${sortingDropDownPositions.width}px`,
            }}
            className={`bg-white text-sm top-[226px] right-60 px-5 border-s-slate-50 fixed py-6 w-[160px] select-none shadow-md rounded-lg flex flex-col ${openSortingDropDown ? "block" : "hidden"}`}>
            {/* Each category */}
            {sortingOptionArray.map((category, categoryIndex) => (
                <div
                    key={categoryIndex}  
                    className="flex flex-col gap-1 text-slate-700 cursor-pointer"
                >
                    <span className={`text-[13px] font-bold ${category.category === "Date" ? "mt-5" : ""}`}>
                        {category.category}
                    </span>

                    {/* Each option */}
                    <div className="flex flex-col gap-2 ml-2 mt-[5px]">
                        {category.options.map((option, optionIndex) => (
                            <div key={optionIndex}>
                                <span 
                                    onClick={() => handleOptionSelected(categoryIndex, optionIndex)}
                                    className={`${option.selected ? "text-orange-600" : "text-slate-500"} cursor-pointer hover:text-orange-600`}
                                >
                                    {option.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default SortingDropDown;