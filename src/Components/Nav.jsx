import React from "react"
import logo from '../images/ReelRave.png'
import { Link } from "react-router-dom"


const Nav = () => {

    return (
    <nav>
      <div> <Link to={'/'}><img className='logo' src={logo} alt="Reel Rave logo" /> </Link></div>
      <div className="nav-links">
        <ul>
          <li> <Link className="nav-discussion-link" to={'/discussion'}>Join the rave!</Link></li>
        </ul>
      </div>
    </nav>
    )
  }

  export default Nav