"use client";
import Sidebar from "../components/Sidebar";
import AllProjects from "../Pages/AllProjects/AllProjects";
import AllTasksContainer from '../Pages/AllTasks/AllTasks';
import { useContextApp } from "../contextApp";
import React from "react";
import {Toaster} from "react-hot-toast";
import ProjectWindow from "../components/Windows/ProjectWindow";
import IconsWindow from "../components/Windows/IconWindow";
import MoreDropDown from "../components/DropDowns/MoreDropDown";
import SortingDropDown from "../components/DropDowns/SortingDropDown";
import ConfirmationWindow from "../components/Windows/ConfirmationWindow";
import ProjectsDropDown from "../components/DropDowns/PorjectsDropDown";
import { TaskWindow, useTaskFormContext } from "../components/Windows/TasksWindow";
import TasksDropDown from "../components/DropDowns/TasksDropDown";

export default function Home() {
  const { 
    openSideBarObject: { openSideBar },
    sideBarMenuObject: {sideBarMenu},
    openProjectWindowObject: {openProjectWindow},
    openConfirmationWindowObject: {openConfirmationWindow}
  } = useContextApp();
  const {openTasksDropDown} = useTaskFormContext();

  const componentMap: Record<number, React.ReactNode> = {
    1: <AllProjects/>,
    2:<AllTasksContainer/>
  };

  const componentKey = sideBarMenu.findIndex((item) => item.isSelected);

  const selectComponent = componentMap[componentKey+1] || null;


  return (
    <div className="flex w-full h-screen poppins">
      <TaskWindow/>
      <TasksDropDown/>
      <ProjectsDropDown/>
      <SortingDropDown />
      <Toaster/>
      <ConfirmationWindow/>
      <MoreDropDown/>
      <IconsWindow/>
      <ProjectWindow/>
      {/* Soft Layer */}
      {(openSideBar || openProjectWindow || openConfirmationWindow || openTasksDropDown) && (
        <div 
          className={`w-full h-full ${openProjectWindow || openConfirmationWindow ? "z-[70]" : "z-50"}   bg-slate-800 fixed opacity-30`}></div>
      )}

      {/* Sidebar */}
      <Sidebar/>
      {selectComponent && selectComponent}
    </div>
  );
}
