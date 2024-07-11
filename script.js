import { dataset } from "./pokemonDataSet.js";

const generateButton = document.getElementById("generate");
const imageElement = document.getElementById("pokemonPicture");
const headerElement = document.getElementById("title");
async function fetchPokemon(pokemon) {
  let url = "https://pokeapi.co/api/v2/pokemon/" + pokemon;
  let request = await fetch(url);
  let pokemonJson = await request.json();
  return pokemonJson;
}

function generateCard(pokemon) {
  let oldCard = document.querySelector(".card");
  if (oldCard) {
    oldCard.remove();
  } else {
    let card = document.createElement("div");
    card.classList.add("card");
    document.body.append(card);
    let pokemonImg = document.createElement("img");
    pokemonImg.setAttribute("src", pokemon["sprites"]["front_default"]);
    card.append(pokemonImg);
  }
}

generateButton.addEventListener("click", () => {
  alert("clicked");
  let randomPokemon =
    dataset[Math.floor(Math.random() * dataset.length)].toLowerCase();
  let pokemon = fetchPokemon(randomPokemon);
  pokemon
    .then((pokemon) => {
      headerElement.textContent = "You are " + pokemon.name;
      generateCard(pokemon);
    })
    .catch((err) => {
      console.log(err);
    });
});
