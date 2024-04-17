import "./loginbtn.css"
import { motion } from 'framer-motion';
// import { useNavigate } from "react-router-dom";
export default function LoginButton(text:string, classname:string, click:any){
//   const navigate = useNavigate();

    return(
        <>
        {/* <Link to = {""}> */}
            <motion.button
                className={classname}
                onClick={click}
                whileHover={{ 
                        scale: 1.05,
                        textShadow: "0px 0px 8px rgb(255, 255, 255)",
                    }}
                    whileTap={{
                        scale:1,
                    }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >{text}</motion.button>
        {/* </Link> */}
            
        
        </>
        
    );
}