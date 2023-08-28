<template>
  <h1 class="fade-in">¿Quién es este pokémon?</h1>
  <h1 v-if="!pokemon">Espere por favor...</h1>
  <div v-else class="fade-in">
    <PokemonPicture :pokemonId="pokemon.id" :showPokemon="showPokemon" />
    <PokemonOptions :pokemons="pokemonArr" @selection="checkAnswer" />
    <template v-if="showAnswer">
      <h2>{{ message }}</h2>
      <button @click="newGame">Nuevo juego</button>
    </template>
  </div>
</template>

<script>
import PokemonOptions from "@/components/PokemonOptions.vue";
import PokemonPicture from "@/components/PokemonPicture.vue";
import getPokemonOptions from "../helpers/getPokemonOptions";
console.log(getPokemonOptions());
export default {
  data() {
    return {
      pokemonArr: [],
      pokemon: null,
      showPokemon: false,
      message: "",
      showAnswer: false,
    };
  },
  methods: {
    async mixPokemonArray() {
      this.pokemonArr = await getPokemonOptions();
      const rndInt = Math.floor(Math.random() * 4);
      this.pokemon = this.pokemonArr[rndInt];
      console.log(this.pokemon);
    },
    checkAnswer(selectedId) {
      console.log(selectedId);
      this.showPokemon = true;
      this.showAnswer = true;
      if (selectedId === this.pokemon.id) {
        this.message = `Felicidades,  si es ${this.pokemon.name}`;
      } else {
        this.message = `Oops, el pokemon era ${this.pokemon.name}`;
      }
    },
    newGame() {
      this.showPokemon = false;
      this.showAnswer = false;
      this.pokemon = null;
      this.pokemonArr = [];
      this.mixPokemonArray();
    },
  },
  components: {
    PokemonPicture,
    PokemonOptions,
  },
  mounted() {
    this.mixPokemonArray();
  },
};
</script>

