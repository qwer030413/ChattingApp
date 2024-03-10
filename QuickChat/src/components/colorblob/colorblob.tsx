
import './colorblob.css';
export default function ColorBlob(){
    const blob = document.getElementById("blob");
    // addEventListener("pointermove", (event) => {});
    document.body.onpointermove = event => {
        const{clientX, clientY} = event;
        blob?.animate(
            {
                left:  `${clientX}px`,
                top: `${clientY}px`
            },
            {
                duration: 2500, fill: "forwards"
            }
        
        );
        
    }
    return(
        <>
            <div className="colorblob" id='blob'></div>
            
        </>
    );
}