import axios from "axios";
import { useEffect, useState } from "react";


function usePokemonDetails(id,pokemonName){
    const [pokemon,setPokemon] = useState({});
    // console.log(id);
    async function downloadPokemon(){
        try {
            let response;
    
            if(pokemonName){
                response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
            }else{
                response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            }
            
            const pokemonSameTypes = await axios.get(`https://pokeapi.co/api/v2/type/${response.data.types?response.data.types[0].type.name:''}`)
            // console.log(response.data);
            setPokemon({
                name:response.data.name,
                image:response.data.sprites.other.dream_world.front_default,
                weight:response.data.weight,
                height:response.data.height,
                types:response.data.types.map((t)=>t.type.name),
                similarPokemons:pokemonSameTypes.data.pokemon.slice(0,5)
            })
    
            // setPokemonListState({...pokemonListState,type:`https://pokeapi.co/api/v2/type/${response.data.types?response.data.types[0].type.name:''}`})
        } catch (error) {
            console.log("SomeThing Went Wrong");
        }
    }

    // const {pokemonListState} = usePokemonList()

    useEffect(()=>{
        downloadPokemon();
        // console.log("List ",pokemonListState);
    },[])

    return {pokemon}
}

export default usePokemonDetails;