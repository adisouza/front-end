import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import './App.css'
import React from 'react'
import Nav from '../../components/templates/Nav'
import Routes from '../home/Route'
import Footer from '../../components/templates/Footer'
import Logo from '../../components/templates/Logo'
import { BrowserRouter } from 'react-router-dom'

export default props =>
<BrowserRouter>
<div className="app">  
<Logo/> 
<Nav/>
<Routes/>
<Footer/>
</div>
</BrowserRouter>