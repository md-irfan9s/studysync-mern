import React from "react";
import ErrorImg from "../assets/Images/ErrorImg.jpg"
import HighlightText from "../components/core/HomePage/HighlightText";

const Error = () => {

    return (
        <div className="mt-[7rem] text-4xl flex flex-col items-center justify-center
        gap-5 text-white">

            <img src={ErrorImg} alt="" 
            className="w-[20%]"
            />
            <HighlightText text={"Error - 404 Not found"} />

        </div>
    )

}

export default Error