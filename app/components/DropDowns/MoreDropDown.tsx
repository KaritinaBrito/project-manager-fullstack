"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useContextApp } from "app/app/contextApp";

function MoreDropDown (){
    const { 
        openDropDownObject: {openDropDown, setOpenDropDown},
        dropDownPositionsObject: {dropDownPositions},
        openConfirmationWindowObject: {setOpenConfirmationWindow},
        openProjectWindowObject: {setOpenProjectWindow},
    }  = useContextApp();

    const [dropDownOptions] = useState([
        {id: 1, name: "Edit", icon: <EditOutlinedIcon />},
        {id: 2, name: "Delete", icon: <DeleteIcon />},
    ]);

    const menuRef = React.useRef<HTMLDivElement>(null);

    function clickedItemHandler(id:number){
        if(id === 1){
            //Open the project window
            setOpenProjectWindow(true);
        }
        if(id === 2){
            //Open  the window  to confirm the deletion
            setOpenConfirmationWindow(true);
        }
        //Close the drop down menu
        setOpenDropDown(false);
    }

    useEffect(()=> {
        function handleClickOutside(evetn: MouseEvent){
            if(menuRef.current && !menuRef.current.contains(evetn.target as Node)){
                setOpenDropDown(false);
            }
        }

        if(openDropDown){
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [openDropDown, setOpenDropDown]);


    return (
        <div 
            ref={menuRef}
            style={{top: dropDownPositions.top, left: dropDownPositions.left}}
            className={`bg-white fixed z-[90] top-14 lef-24 px-5 border-slate-50 py-6 w-[130px] select-none shadow-md rounded-lg flex flex-col gap-7 ${openDropDown ? "block" : "hidden"}`}
        >
            {dropDownOptions.map((dropDownOption) => (
                <div 
                    key={dropDownOption.id}
                    onClick={() => clickedItemHandler(dropDownOption.id)}
                    className={`flex gap-1 items-center text-slate-400 cursor-pointer hover:text-orange-600 ${dropDownOption.id === 2 && "hover:text-red-600"}`}>
                        {/* Edit Icon */}
                        {dropDownOption.icon}
                        <span className="text-[14px]">{dropDownOption.name}</span>
                    </div>
            ))}
        </div>  
    );
}

export default MoreDropDown; 