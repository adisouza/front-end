import './Nav.css'
import React from 'react'
import {Link} from 'react-router-dom'

export default props => 
<aside className="menu">
    <nav className="menu">
        <Link to='/'>
            <i className="fa fa-home"></i>início
        </Link>
        <Link to='/customers'>
        <i className="fa fa-users"></i>Clientes
        </Link>
        <Link to='/movies'>
        <i className="fa-solid fa-cassette-tape"></i>Filmes
        </Link>
        <Link to='/booked'>
        <i className="fa-solid"></i>locações
        </Link>
    </nav>
</aside>