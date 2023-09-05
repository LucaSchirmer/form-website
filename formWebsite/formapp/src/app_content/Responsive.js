import { useState } from "react";
import Sidebar from "./Sidebar";

const Responsive = () => {
    const [displayNone, setDisplayNone] = useState(1);

    const handleOnclick = (event)=>{
        setDisplayNone(displayNone * - 1);
        console.log(displayNone)
    }

    return( 
        <div>
            <div className="responsiveNavEl" onClick={handleOnclick} >
                <div className="lineEL"></div>
                <div className="lineEL"></div>
                <div className="lineEL"></div>
            </div>
            {displayNone === 1 ? <Sidebar displayNone={true}/>: <Sidebar/>}
        </div>
    );
}

export default Responsive