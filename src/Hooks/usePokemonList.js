import axios from "axios";
import { useEffect, useState } from "react";

function usePokemonList(){
    const [pokemonListState,setPokemonListState] = useState({
        pokemonList:[],
        isLoading:true,
        pokedexUrl:'https://pokeapi.co/api/v2/pokemon',
        nextUrl:'',
        prevUrl:''
    })

    async function downloadPokemons(){
        
                // setIsLoading(true);
            setPokemonListState((state)=>({
                ...state,
                isLoading:true
            }));

            const response = await axios.get(pokemonListState.pokedexUrl)// this downloads list of 20 pokemons

            const pokemonResults = response.data.results;//we get the array of pokemons from result
            console.log("response ise:",response.data.pokemon);
            setPokemonListState((state)=>({
                ...state,
                nextUrl:response.data.next,
                prevUrl:response.data.previous
            }));

            // iterating over the array of pokemons and using their url to create an array of promises that will download those 20 pokemons
            const pokemonResultPromise = pokemonResults.map((pokemon)=> axios.get(pokemon.url))
            // console.log(pokemonResultPromise);

            // passing that promise array to axios.all
            const pokemonData = await axios.all(pokemonResultPromise)//array of 20 pokemon detailed data

            // console.log(pokemonData);

            //now iterate on the data of each pokemon,and extract id,name,image,types
            const results = pokemonData.map((pokeData)=>{
                const pokemon = pokeData.data;
                return {
                    id:pokemon.id,
                    name:pokemon.name,
                    image:pokemon.sprites.other.dream_world.front_default,
                    types:pokemon.types
                }
            })

            console.log(results);
            setPokemonListState((state)=>({
                ...state,
                pokemonList:results,
                isLoading:false
            }))
        
        
        

    }

    useEffect(()=>{
        downloadPokemons();
    },[pokemonListState.pokedexUrl])

    return {pokemonListState,setPokemonListState}
}

export default usePokemonList;