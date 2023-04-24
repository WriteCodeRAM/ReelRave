import React from "react"
import githubLogo from '../images/github.png'

const Footer = () => {
    return(
       <footer>

            <ul>
                <li><a href="https://github.com/WriteCodeRAM"><img src={githubLogo} alt="" /></a></li>
            </ul>
       </footer>

    )
}


export default Footer