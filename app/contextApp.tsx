"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import {AppType, IconData, SideBarMenuItem, TabOption} from "./types/AppTypes";
import { allIconsArray } from "./Data/AllIcons";
import { Project, projectsData, Task } from "./Data/AllProjects";


// Setting the default state
const defaultState: AppType = {
    openSideBarObject : { openSideBar: false, setOpenSideBar: () => {}},
    sideBarMenuObject : { sideBarMenu: [], setSideBarMenu: () => {}},
    openProjectWindowObject: { openProjectWindow: false, setOpenProjectWindow: () => {}},
    allIconsDataObject: {allIconsData: [], setAllIconsData: () => {}},
    openIconWindowObject: {openIconWindow: false, setOpenIconWindow: () => {}},
    selectedIconObject: {selectedIcon: null, setSelectedIcon: () => {}},
    allProjectsObject: {allProjects: [], setAllProjects: () => {}},
    openDropDownObject: {openDropDown: false, setOpenDropDown: () => {}},
    dropDownPositionsObject: {dropDownPositions: {top: 0, left: 0}, setDropDownPositions: () => {}},
    selectedProjectObject: {selectedProject: null, setSelectedProject: () => {}},
    openConfirmationWindowObject: {openConfirmationWindow: false, setOpenConfirmationWindow: () => {}},
    sortingOptionsProjectObject: {sortingOptionsProject: [], setSortingOptionsProject: () => {}},
    sortingOptionsTaskObject: {sortingOptionsTask: [], setSortingOptionsTask: () => {}},
    openSortingDropDownObject: { openSortingDropDown: false, setOpenSortingDropDown: () => {}},
    sortingDropDownPositionsObject: {sortingDropDownPositions: {top: 0, left: 0 }, setSortingDropDownPositions: ()=>{}},
    chosenProjectobject: {chosenProject: null, setChosenProject: () => {}},
    tabsOptionsObject: {tabsOptions: [], setTabsOptions: () => {}},
    projectsDropDownPositionObject: {projectsDropDownPositions: {top: 0, left: 0}, setProjectsDropDownPositions: () => {}},
    openProjectsDropDownObject: { openProjectsDropDown: false, setOpenProjectsDropDown: () => {}},
    openTasksWindowObject: {openTasksWindow: false, setOpenTasksWindow: () => {}},
    allTasksObject: {allTasks: [], setAllTasks: () => {}},
    selectedTaskObject: { selectedTask: null, setSelectedTask: () => {}},
    projectClickedObject: {projectClicked: null, setProjectClicked: () => {}},
}

// Creating the context
const ContextApp = createContext<AppType>(defaultState);

// Creating the provider
export default function ContextAppProvider ({
    children,
} : {
    children: React.ReactNode;
}) {
    const [openSideBar, setOpenSideBar] = useState(false);
    const [isMobileView, setIsMobileView] =  useState(false);
    const [sideBarMenu, setSideBarMenu] = useState<SideBarMenuItem[]>([
        {
            id: 1,
            name: "All Projects",
            isSelected: true
        },
             {
            id: 2,
            name: "All Tasks",
            isSelected: false
        },
        {
            id: 3,
            name: "Log out",
            isSelected: false
        }
    ]);
    const [openProjectWindow, setOpenProjectWindow] = useState(false);
    const [allIconsData, setAllIconsData] = useState<IconData[]>(allIconsArray);
    const [openIconWindow, setOpenIconWindow] = useState(false);
    const [selectedIcon, setSelectedIcon] = useState<IconData | null>(null);
    const [allProjects, setAllProjects] = useState<Project[]>([]);
    const [openDropDown, setOpenDropDown] = useState(false);
    const [dropDownPositions, setDropDownPositions] = useState({ top: 0, left: 0 });
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [openConfirmationWindow, setOpenConfirmationWindow] = useState<boolean>(false);
    const [sortingOptionsProject, setSortingOptionsProject] = useState([
        {
            category: "Order",
            options: [
                {label: "A-Z", value:"asc", selected: true},
                {label: "Z-A", value:"desc", selected: false},
            ],
        },
        {
            category: "Date",
            options: [
                {label: "Newest", value:"newest", selected: false},
                {label: "Oldest", value:"oldest", selected: false},
            ],
        }
    ]);
    const [sortingOptionsTask, setSortingOptionsTask] = useState([
        {
            category: "Order",
            options: [
                {label: "A-Z", value:"asc", selected: true},
                {label: "Z-A", value:"desc", selected: false},
            ],
        },
        {
            category: "Date",
            options: [
                {label: "Newest", value:"newest", selected: false},
                {label: "Oldest", value:"oldest", selected: false},
            ],
        }
    ]);
    const [openSortingDropDown, setOpenSortingDropDown] = useState(false);
    const [sortingDropDownPositions, setSortingDropDownPositions] = useState({ top: 0, left: 0 });
    const [chosenProject, setChosenProject] = useState<Project | null>(null);
    const [tabsOptions, setTabsOptions] = useState<TabOption[]>([
        { id: 1, name: "On Going Tasks", isSelected: true},
        { id: 2, name: "Completed Tasks", isSelected: false},
    ])
    const [projectsDropDownPositions, setProjectsDropDownPositions] = useState({ top: 0, left: 0 });
    const [openProjectsDropDown, setOpenProjectsDropDown] = useState(false);
    const [openTasksWindow, setOpenTasksWindow] = useState(false);
    const [allTasks, setAllTasks] = useState<Task[]>([]);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [projectClicked, setProjectClicked] = useState<Project | null>(null);


    // Update the window size
    useEffect(() => {
        function handleResize(){
            setIsMobileView(window.innerWidth <= 940);
        }
        // Initial check
        handleResize();

        // Event listener for window resize
        window.addEventListener("resize", handleResize);

        // Clean up
        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, []);

    // Simulate the fetching of the projects
    useEffect(() => {
        const fetchData = async () => {
            try {
                //Simulate a netework delay 
                await new Promise((resolve) => setTimeout(resolve, 1000));
                // Update the state

                const extractAllTasks = projectsData.flatMap(
                    (project) => project.tasks);

                setAllTasks(extractAllTasks)
                setAllProjects(projectsData);
            } catch (error){
                console.log(error);
            }
        };
        fetchData();
    }, []);

    // Close the side bar on mobile view is false
    useEffect(()=> {
        if(!isMobileView){
            setOpenSideBar(false);
        }
    }, [isMobileView]);

    useEffect(() => {
        setOpenSideBar(false);
    }, [sideBarMenu]);

    return (
        <ContextApp.Provider value={
            {
                openSideBarObject: { openSideBar, setOpenSideBar}, 
                sideBarMenuObject: {sideBarMenu, setSideBarMenu},
                openProjectWindowObject: {openProjectWindow, setOpenProjectWindow},
                allIconsDataObject: {allIconsData, setAllIconsData},
                openIconWindowObject: {openIconWindow, setOpenIconWindow},
                selectedIconObject: {selectedIcon, setSelectedIcon},
                allProjectsObject: {allProjects, setAllProjects},
                dropDownPositionsObject: {dropDownPositions, setDropDownPositions},
                openDropDownObject: {openDropDown, setOpenDropDown},
                selectedProjectObject: {selectedProject, setSelectedProject},
                openConfirmationWindowObject: {openConfirmationWindow, setOpenConfirmationWindow},
                sortingOptionsProjectObject: {sortingOptionsProject, setSortingOptionsProject},
                sortingOptionsTaskObject: {sortingOptionsTask, setSortingOptionsTask},
                openSortingDropDownObject: {openSortingDropDown, setOpenSortingDropDown},
                sortingDropDownPositionsObject: {sortingDropDownPositions, setSortingDropDownPositions},
                chosenProjectobject: {chosenProject, setChosenProject},
                tabsOptionsObject: {tabsOptions, setTabsOptions},
                projectsDropDownPositionObject: {projectsDropDownPositions,setProjectsDropDownPositions},
                openProjectsDropDownObject: {openProjectsDropDown, setOpenProjectsDropDown},
                openTasksWindowObject: {openTasksWindow, setOpenTasksWindow},
                allTasksObject: {allTasks, setAllTasks},
                selectedTaskObject: {selectedTask, setSelectedTask},
                projectClickedObject: {projectClicked, setProjectClicked}
            }
        }>
            {children}
        </ContextApp.Provider>
    );
}

// Creating the hook
export function useContextApp() {
    return useContext(ContextApp);
}
