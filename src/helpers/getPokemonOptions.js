import pokemonApi from '@/api/pokemonApi';


const getPokemons = () => {
    const pokemonArr = Array.from(Array(650))
    return pokemonArr.map((_, index) => index + 1);
}
const getPokemonOptions = async () => {
    const mixedPokemons = getPokemons().sort(() => Math.random() - 0.5)

    const pokemons = await getPokemonNames(mixedPokemons.splice(0, 4))
    console.table(pokemons);
    return pokemons;
}

const getPokemonNames = async ([a, b, c, d] = []) => {

    const resp = await pokemonApi.get('/1');
    const arrPromise = [
        pokemonApi.get(`/${a}`),
        pokemonApi.get(`/${b}`),
        pokemonApi.get(`/${c}`),
        pokemonApi.get(`/${d}`),
    ]

    const [pk1, pk2, pk3, pk4] = await Promise.all(arrPromise);
    return [
        {
            name: pk1.data.name, id: pk1.data.id
        },
        {
            name: pk2.data.name, id: pk2.data.id
        },
        {
            name: pk3.data.name, id: pk3.data.id
        },
        {
            name: pk4.data.name, id: pk4.data.id
        },
    ]


}

//https://pokeapi.co/api/v2/pokemon

export default getPokemonOptions