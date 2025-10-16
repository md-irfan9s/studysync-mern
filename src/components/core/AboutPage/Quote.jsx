import React from 'react'
import HighlightText from '../HomePage/HighlightText'
import GradientText from '../../../Animation/GradientText'

const Quote = () => {
  return (
    <div className=" text-xl md:text-4xl font-semibold mx-auto py-5 pb-20 text-center text-white">
        We are passionate about revolutionizing the way we learn. Our
        innovative platform <HighlightText text={"combines technology,"} />{" "}
        
       <GradientText
         colors={["#FF512F", "#F09819", "#40ffaa"]}
         animationSpeed={3}
         showBorder={false}
         className="custom-class"
       >
         {/* <span className="bg-gradient-to-b from-[#FF512F] to-[#F09819] text-transparent bg-clip-text font-bold"> */}
           <span>
            {" "}
            expertise,
        </span>
       </GradientText> 

         and community to create an
       <GradientText
         colors={["#E65C00", "#F9D423", "#ffff",]}
         animationSpeed={3}
         showBorder={false}
         className="custom-class"
       >
         {/* <span className="bg-gradient-to-b from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text font-bold"> */}
            <span>
            {" "}
            unparalleled educational
        experience.
        </span> 
       </GradientText>
        {/* We are passionate about revolutionizing the way we learn. Our */}
        {/* innovative platform <HighlightText text={"combines technology"} />,{" "} */}
        {/* <span className="bg-gradient-to-b from-[#FF512F] to-[#F09819] text-transparent bg-clip-text font-bold">
            {" "}
            expertise
        </span> */}
        {/* , and community to create an */}
        {/* <span className="bg-gradient-to-b from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text font-bold">
            {" "}
            unparalleled educational
        experience.
        </span>  */}
    </div>
  )
}

export default Quote