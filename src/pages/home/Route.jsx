import React from "react"
import { Routes, Route } from "react-router-dom"
import Home from './Home'
import Cliente from '../cliente/Cliente'
import Filme from '../filme/Filme'
import Locacao from '../locacao/Locacao'
export default props =>
<Routes>
    <Route exact path="/" element={<Home/>}/>
    <Route exact path="/customers" element={<Cliente/>}/>
    <Route exact path="/movies" element={<Filme/>}/>
    <Route exact path="/booked" element={<Locacao/>}/>
    <Route/>
    <Route/>
    <Route/>
</Routes>

