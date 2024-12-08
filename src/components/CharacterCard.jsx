import { useState } from "react";
import { FaStar } from "react-icons/fa";

function CharacterCard({ character, onFavoriteToggle }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="relative bg-white rounded shadow-md p-4 flex flex-col justify-between">
      <div className="relative">
        <img
          src={character.image}
          alt={character.name}
          className="w-full h-48 object-cover rounded"
        />

        <button
          className="absolute top-2 right-2 text-yellow-500"
          onClick={() => onFavoriteToggle(character.id)}
        >
          <FaStar size={24} fill={character.favorite ? "yellow" : "gray"} />
        </button>
      </div>

      <div className="mt-4 flex-grow">
        <h2 className="text-lg font-bold">{character.name}</h2>
        <p>{character.species}</p>
        <p>{character.gender}</p>
        <p>{character.origin.name}</p>
      </div>

      <div className="flex justify-end mt-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Less" : "More"}
        </button>
      </div>
      {expanded && (
        <div className="mt-4">
          <h3 className="text-sm font-bold">Episodes:</h3>
          <ul className="list-disc pl-4">
            {character.episodes.map((ep, index) => (
              <li key={index}>{ep}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CharacterCard;
