import React from "react";
import GradientText from '../../../Animation/GradientText'

const HighlightText = ({text}) => {
  return (
  
<GradientText
  colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
  animationSpeed={3}
  showBorder={false}
  className="custom-class"
>
  <span className="font-bold">
      {/* {" "} */}
      {text}
    </span>
</GradientText>
    
  );
};

export default HighlightText;

// className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold"