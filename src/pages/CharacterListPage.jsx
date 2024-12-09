import { useEffect, useState, useCallback, useRef } from "react";
import { fetchCharacters, postFavoriteCharacter, deleteFavoriteCharacter } from "../services/character";
import CharacterCard from "../components/CharacterCard";

function CharacterListPage({onLogout}) {
  const [characters, setCharacters] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);   

  const mounted = useRef(false);


  const loadCharacters = async () => {
    if (loading) return;  
    setLoading(true);     

    try {
      const data = await fetchCharacters(page);
      if (data.length > 0) {
        setCharacters(prev => [...prev, ...data]);
        setPage(prev => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching characters:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = useCallback(() => {
    if (loading || !hasMore) return;

    const nearBottom = window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100;
    if (nearBottom  && hasMore) {
      loadCharacters();
    }
  }, [hasMore, loading]);


  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);


  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    loadCharacters();
  }, []);

  const handleFavoriteToggle = async (id) => {
    
    const isFavorite = characters.find((char) => char.id === id)?.favorite;
    if (!isFavorite) {
       // await postFavoriteCharacter(id);
    } else {
      //  await deleteFavoriteCharacter(id);
    }

    setCharacters((prev) =>
        prev.map((char) =>
          char.id === id ? { ...char, favorite: !char.favorite } : char
        )
      );
  };

  const filteredCharacters = showFavorites
    ? characters.filter((char) => char.favorite)
    : characters;

  return (
    <div className="p-4">
        <button
        className="bg-red-500 text-white px-4 py-2 rounded mb-4"
        onClick={onLogout}
      >
        Logout
      </button>
      <h1 className="text-2xl font-bold mb-4">Character List</h1>
      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => setShowFavorites(!showFavorites)}
      >
        {showFavorites ? "Show All" : "Show Favorites"}
      </button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCharacters.map((char) => (
            <CharacterCard key={char.id} character={char} onFavoriteToggle={handleFavoriteToggle}/>
          ))}
        </div>
      )}

      {!hasMore && <div className="text-center mt-4">No more characters to load.</div>}
    </div>
  );
}

export default CharacterListPage;
