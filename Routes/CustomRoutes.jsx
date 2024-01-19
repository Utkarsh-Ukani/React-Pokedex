import { Route, Routes } from "react-router-dom";
import Pokedex from "../src/components/Pokedex/Pokedex";
import PokemonDetails from "../src/components/PokemonDetails/PokemonDetails";

function CustomRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Pokedex/>}/>
            <Route path="/pokemon/:id" element={<PokemonDetails/>}/>
        </Routes>
    )
}

export default CustomRoutes;