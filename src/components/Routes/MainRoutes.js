import React from 'react'
import Planets from '../Pages/Planets/Planets'
import Planet from '../Pages/Planets/Planet'
import People from '../Pages/People/People'
import Vehicles from '../Pages/Vehicles/Vehicles'
import Spaceships from '../Pages/Spaceships/Spaceships'
import Spaceship from '../Pages/Spaceships/Spaceship'
import Films from '../Pages/Films/Films'
import Species from '../Pages/Species/Species'
import { Route, Routes } from 'react-router-dom'
import Vehicle from '../Pages/Vehicles/Vehicle'
import Person from '../Pages/People/Person'
import Film from '../Pages/Films/Film'
import SingleSpecies from '../Pages/Species/SingleSpecies'
import Home from '../Pages/Home/Home'

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="planets" element={<Planets />} />
      <Route path="planets/:planetId" element={<Planet />} />
      <Route path="people" element={<People />} />
      <Route path="people/:personId" element={<Person />} />
      <Route path="species" element={<Species />} />
      <Route path="species/:speciesId" element={<SingleSpecies />} />
      <Route path="films" element={<Films />} />
      <Route path="films/:filmId" element={<Film />} />
      <Route path="vehicles" element={<Vehicles />} />
      <Route path="vehicles/:vehicleId" element={<Vehicle />} />
      <Route path="spaceships" element={<Spaceships />} />
      <Route path="spaceships/:spaceshipId" element={<Spaceship />} />
    </Routes>
  )
}

export default MainRoutes
