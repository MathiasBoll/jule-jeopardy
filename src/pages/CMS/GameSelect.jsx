import React, { useState } from 'react'
import FetchGame from "./FetchGame"


const GameSelect = ({ onSelect }) => {
  const { games, loading, error } = useGames()
  const [selectedGame, setSelectedGame] = useState("")


  const handleChange = (e) => { 
    setSelectedGame(e.target.value)
  }

  const handleNext = () => {
    const game = games.find((g) => g._id === selectedGame)
    if (game && onSelect) onSelect(game)
  };
  
    if (loading) return <p>Loading games...</p>;
  if (error) return <p>Error: {error}</p>;

    return (
      <div>
        
      </div>
  )
}

export default GameSelect
