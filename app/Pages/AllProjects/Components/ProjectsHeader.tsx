import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';
import { useContextApp } from 'app/app/contextApp';

function ProjectsHeader (){
    return (
        <div className='flex justify-between'>
            {/* search bar component */}
            <SearchBar/>
            {/* Add button */}
            <AddProjectButton/>
        </div>
    );

    function SearchBar(){
        return (
            <div className='flex items-center'>
                {/* search icon */}
                <div className='border-b-2 border-orange-600 h-[39px] w-11 flex justify-center items-center'>
                    <SearchIcon sx={{fontSize:"26px"}} className="text-slate-400 outline-none"/>
                </div>

                {/* search input */}
                <div className='border-b-2 border-slate-200 w-[67%]'>
                    <input type="text"  placeholder='Search a project ...' className='p-2 bg-transparent text-[14px] outline-none'/>
                </div>
            </div>
        );
    }

    function AddProjectButton(){
        const {
            openProjectWindowObject: {setOpenProjectWindow},
            openSideBarObject: {setOpenSideBar} 
        } = useContextApp();
        return(
            <div className='flex gap-3 items-center'>
                <button 
                    className='bg-orange-600 text-white px-2 text-[14px] rounded-md flex gap-1 items-center  p-2 pr-3 max-sm:pr-2'
                    onClick={() => setOpenProjectWindow(true)}
                >
                    <AddIcon sx={{ fontSize: "22px"}} className="mt-[2px]"/>
                    <span className='max-sm:hidden'>New Project</span>
                </button>
                <MenuIcon 
                    onClick={() => setOpenSideBar(true)} 
                    className='text-slate-400 h-9 cursor-pointer hidden max-[940px]:block'
                />
            </div>
        );
    }
}

export default ProjectsHeader;