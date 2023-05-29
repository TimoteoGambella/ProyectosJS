import { useNavigate } from "react-router-dom";
import "../styles/navbar.scss"
import { useEffect } from "react";

export default function Navbar (){
    const navigate = useNavigate();

    useEffect(() => {
        if(window.location.pathname!=="/"){
            scroll()
        }
    }, [])
    
    const scroll=()=>{        
        document.getElementById(window.location.pathname.slice(1)).scrollIntoView({
            inline:"center",
            behavior:"smooth"
        })
    }

    const navegaciones = [
        {
            title:"Project 1",
            url:"/project1"
        },
        {
            title:"Project 2",
            url:"/project2"
        },
        {
            title:"Project 3",
            url:"/project3"
        },
        {
            title:"Project 4",
            url:"/project4"
        },
        {
            title:"Project 5",
            url:"/project5"
        },
        {
            title:"Project 6",
            url:"/project6"
        },
        {
            title:"Project 7",
            url:"/project7"
        },
        {
            title:"Project 8",
            url:"/project8"
        },
        {
            title:"Project 9",
            url:"/project9"
        },
        {
            title:"Project 10",
            url:"/project10"
        },
        {
            title:"Project 11",
            url:"/project11"
        },
        {
            title:"Project 12",
            url:"/project12"
        },
        {
            title:"Project 13",
            url:"/project13"
        },
        {
            title:"Project 14",
            url:"/project14"
        },
        {
            title:"Project 15",
            url:"/project15"
        },
        {
            title:"Project 16",
            url:"/project16"
        },
        {
            title:"Project 17",
            url:"/project17"
        },
        {
            title:"Project 18",
            url:"/project18"
        },
        {
            title:"Project 19",
            url:"/project19"
        },
        {
            title:"Project 20",
            url:"/project20"
        }
    ]

    return(
        <div className="navbar-container" id="nav">
            {navegaciones.map((nav,i)=>{
                return(
                    <h1 key={i} id={"project"+(i+1)} onClick={()=>{
                        navigate(`${nav.url}`)
                        scroll()
                    }} className={`${window.location.pathname===nav.url?"active":""}`}>{nav.title}</h1>
                )
            })}
        </div>
    )
}