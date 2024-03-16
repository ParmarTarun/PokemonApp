import { useEffect, useState } from "react";
import "./App.css";
import { getPokemons } from "./api/pokemon";
import { Pokemon } from "./types";

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  const loadPokemons = () => {
    setIsLoading(true);
    getPokemons(pokemons.length)
      .then((data) => {
        setPokemons([...pokemons, ...data.results]);
        setTotalCount(data.count);
      })
      .catch((e) => {
        alert("Failed to fetch pokemons. Check Console!");
        console.log(e);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadPokemons();
  }, []);
  return (
    <>
      <h1>Project IDX</h1>
      <h4>
        A Simple React <span>Pokemon</span> App
      </h4>
      <div className="pokemons-wrapper">
        {pokemons.map((poke) => (
          <a href={poke.url} className="pokemon-card" key={poke.name}>
            {poke.name}
          </a>
        ))}
      </div>
      <p>
        Showing {pokemons.length} of {totalCount}
      </p>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <button onClick={loadPokemons}>Load more</button>
      )}
    </>
  );
}

export default App;
