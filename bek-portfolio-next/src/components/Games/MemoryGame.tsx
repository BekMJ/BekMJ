'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, RotateCcw, Trophy } from 'lucide-react'

interface Card {
  id: number
  emoji: string
  isFlipped: boolean
  isMatched: boolean
}

const emojis = ['🚀', '💻', '🤖', '🔬', '⚡', '🎯', '🌟', '💡']

const MemoryGame = () => {
  const [cards, setCards] = useState<Card[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [score, setScore] = useState(0)
  const [gameWon, setGameWon] = useState(false)
  const [isLocked, setIsLocked] = useState(false)

  const initializeGame = () => {
    const gameCards = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }))
    
    setCards(gameCards)
    setFlippedCards([])
    setMoves(0)
    setScore(0)
    setGameWon(false)
  }

  useEffect(() => {
    initializeGame()
  }, [])

  const handleCardClick = (cardId: number) => {
    if (isLocked || cards[cardId].isFlipped || cards[cardId].isMatched) return

    const newCards = [...cards]
    newCards[cardId].isFlipped = true
    setCards(newCards)

    const newFlippedCards = [...flippedCards, cardId]
    setFlippedCards(newFlippedCards)

    if (newFlippedCards.length === 2) {
      setIsLocked(true)
      setMoves(prev => prev + 1)

      const [firstId, secondId] = newFlippedCards
      const firstCard = newCards[firstId]
      const secondCard = newCards[secondId]

      if (firstCard.emoji === secondCard.emoji) {
        // Match found
        newCards[firstId].isMatched = true
        newCards[secondId].isMatched = true
        setCards(newCards)
        setScore(prev => prev + 10)
        setFlippedCards([])
        setIsLocked(false)

        // Check if game is won
        if (newCards.every(card => card.isMatched)) {
          setGameWon(true)
        }
      } else {
        // No match
        setTimeout(() => {
          newCards[firstId].isFlipped = false
          newCards[secondId].isFlipped = false
          setCards(newCards)
          setFlippedCards([])
          setIsLocked(false)
        }, 1000)
      }
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-bold gradient-text mb-4 flex items-center justify-center gap-2">
          <Brain className="h-8 w-8" />
          Memory Game
        </h2>
        <p className="text-gray-600 mb-6">
          Test your memory! Match the pairs of cards to win. Perfect for showcasing pattern recognition skills.
        </p>
        
        <div className="flex justify-center items-center gap-8 mb-6">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            <span className="font-semibold">Score: {score}</span>
          </div>
          <div className="flex items-center gap-2">
            <RotateCcw className="h-5 w-5 text-blue-500" />
            <span className="font-semibold">Moves: {moves}</span>
          </div>
        </div>

        <motion.button
          onClick={initializeGame}
          className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          New Game
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {gameWon && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <motion.div
              className="bg-white rounded-2xl p-8 text-center max-w-md mx-4"
              initial={{ y: 50 }}
              animate={{ y: 0 }}
            >
              <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Congratulations!</h3>
              <p className="text-gray-600 mb-4">
                You completed the game in {moves} moves with a score of {score}!
              </p>
              <button
                onClick={initializeGame}
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium"
              >
                Play Again
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            className="aspect-square cursor-pointer"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleCardClick(card.id)}
          >
            <motion.div
              className={`w-full h-full rounded-xl border-2 flex items-center justify-center text-3xl font-bold transition-all duration-300 ${
                card.isMatched
                  ? 'bg-green-100 border-green-300 text-green-600'
                  : card.isFlipped
                  ? 'bg-white border-blue-300 shadow-lg'
                  : 'bg-gradient-to-br from-blue-500 to-purple-500 text-white'
              }`}
              animate={{
                rotateY: card.isFlipped || card.isMatched ? 180 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                animate={{
                  rotateY: card.isFlipped || card.isMatched ? 180 : 0,
                }}
                transition={{ duration: 0.3, delay: 0.15 }}
              >
                {card.isFlipped || card.isMatched ? card.emoji : '?'}
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-8">
        <p className="text-sm text-gray-500">
          This game demonstrates React state management, animations, and interactive UI design.
        </p>
      </div>
    </div>
  )
}

export default MemoryGame 