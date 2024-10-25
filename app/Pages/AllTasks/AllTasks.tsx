import React from 'react';
import TasksHeader from './Components/TasksHeader';
import TasksSubHeader from './Components/TasksSubHerder';
import TasksList from './Components/TasksList';


function AllTasksContainer(){
    return (
        <div className='bg-slate-50 w-full p-10 max-sm:py-9 max-sm:p-8'>
            <TasksHeader />
            <TasksSubHeader />
            <TasksList />
        </div>
    )
}

export default AllTasksContainer;