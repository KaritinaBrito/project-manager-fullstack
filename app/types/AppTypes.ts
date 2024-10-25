import React from "react";
import { Project, Task } from "../Data/AllProjects";

export type SideBarMenuItem = {
    id: number;
    name: string;
    isSelected: boolean;
};

export interface IconData {
    id: number;
    name: string;
    icon: React.ReactNode;
    isSelected: boolean;
}

type SortingOption = {
    category: string;
    options: {
        label: string;
        value: string;
        selected: boolean;
    }[];
};

export type SortingDropDownPosition = {
    top: number;
    left: number;
    width?: number;
};

export type TabOption = {
    id: number;
    name: string;
    isSelected: boolean;
}


export type AppType = {
    openSortingDropDownObject: {
        openSortingDropDown: boolean;
        setOpenSortingDropDown: React.Dispatch<React.SetStateAction<boolean>>;
    }
    sortingDropDownPositionsObject: {
        sortingDropDownPositions: SortingDropDownPosition;
        setSortingDropDownPositions: React.Dispatch<React.SetStateAction<SortingDropDownPosition>>;
    },
    sortingOptionsProjectObject: {
        sortingOptionsProject: SortingOption[];
        setSortingOptionsProject: React.Dispatch<React.SetStateAction<SortingOption[]>>;
    },
    sortingOptionsTaskObject: {
        sortingOptionsTask: SortingOption[];
        setSortingOptionsTask: React.Dispatch<React.SetStateAction<SortingOption[]>>;
    },
    openSideBarObject: {
        openSideBar: boolean;
        setOpenSideBar: React.Dispatch<React.SetStateAction<boolean>>;
    };

    sideBarMenuObject: {
        sideBarMenu: SideBarMenuItem[];
        setSideBarMenu: React.Dispatch<React.SetStateAction<SideBarMenuItem[]>>;
    };

    openProjectWindowObject: {
        openProjectWindow: boolean,
        setOpenProjectWindow: React.Dispatch<React.SetStateAction<boolean>>;
    };

    allIconsDataObject: {
        allIconsData: IconData[];
        setAllIconsData: React.Dispatch<React.SetStateAction<IconData[]>>;
    },

    openIconWindowObject: {
        openIconWindow: boolean;
        setOpenIconWindow: React.Dispatch<React.SetStateAction<boolean>>;
    },

    selectedIconObject: {
        selectedIcon: IconData | null;
        setSelectedIcon: React.Dispatch<React.SetStateAction<IconData | null>>;
    },

    allProjectsObject: {
        allProjects: Project[];
        setAllProjects: React.Dispatch<React.SetStateAction<Project[]>>;
    },

    openDropDownObject: {
        openDropDown: boolean;
        setOpenDropDown: React.Dispatch<React.SetStateAction<boolean>>;
    }
    dropDownPositionsObject: {
        dropDownPositions: { top: number; left: number };
        setDropDownPositions: React.Dispatch<React.SetStateAction<{ top: number; left: number }>>;
    },
    selectedProjectObject: {
        selectedProject: Project | null;
        setSelectedProject: React.Dispatch<React.SetStateAction<Project | null>>;
    },
    openConfirmationWindowObject: {
        openConfirmationWindow: boolean;
        setOpenConfirmationWindow: React.Dispatch<React.SetStateAction<boolean>>;
    },
    chosenProjectobject: {
        chosenProject: Project | null;
        setChosenProject: React.Dispatch<React.SetStateAction<Project | null>>;
    },
    tabsOptionsObject: {
        tabsOptions: TabOption[];
        setTabsOptions: React.Dispatch<React.SetStateAction<TabOption[]>>;
    },
    projectsDropDownPositionObject: {
        projectsDropDownPositions: SortingDropDownPosition;
        setProjectsDropDownPositions: React.Dispatch<React.SetStateAction<SortingDropDownPosition>>;
    },
    openProjectsDropDownObject: {
        openProjectsDropDown: boolean;
        setOpenProjectsDropDown: React.Dispatch<React.SetStateAction<boolean>>;
    },
    openTasksWindowObject: {
        openTasksWindow: boolean,
        setOpenTasksWindow: React.Dispatch<React.SetStateAction<boolean>>;
    },
    allTasksObject: {
        allTasks: Task[];
        setAllTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    },
    selectedTaskObject: {
        selectedTask: Task | null;
        setSelectedTask: React.Dispatch<React.SetStateAction<Task | null>>;
    },
    projectClickedObject: {
        projectClicked: Project | null;
        setProjectClicked: React.Dispatch<React.SetStateAction<Project | null>>;
    }
};