
import React from "react";
import './section.css'; 

const ProjectContent = (props) => {
  return (

    props.switch && props.switch_verify ?
    

    <div class="content">
     Line 4:18:   'useFrame' is defined but never used          no-unused-vars
  Line 48:10:  'clicked' is assigned a value but never used  no-unused-vars
  Line 51:53:  Unexpected use of comma operator              no-sequences
  Line 53:44:  Unexpected use of comma operator              no-sequences
  Line 62:54:  Expected '===' and instead saw '=='           eqeqeq
  Line 63:46:  Expected '===' and instead saw '=='           eqeqeq
  Line 74:48:  Unexpected use of comma operator
  </div>:null







  );
};
  
export default ProjectContent;