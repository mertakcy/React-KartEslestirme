import './App.css'
import Card from './components/Card'
import { useEffect, useState } from 'react'


const cardList = [
  { "path": "/img/1.jpeg" },
  { "path": "/img/2.jpeg" },
  { "path": "/img/3.jpeg" },
  { "path": "/img/4.jpeg" },
  { "path": "/img/5.jpeg" },
  { "path": "/img/6.jpeg" },
  { "path": "/img/7.jpeg" },
  { "path": "/img/8.jpeg" }
]




function App() {
  const [cards, setCards] = useState([])
  const [selectedOne, setSelectedOne] = useState('')
  const [selectedTwo, setSelectedTwo] = useState('')
  const [disabled, setDisabled] = useState(false)
  const [score, setScore] = useState(0)

  const prepareCards = () => {

    const sortedCards = [...cardList, ...cardList]
      .sort(() => 0.5 - Math.random())
      .map((card) => ({ ...card, id : Math.random() }))

    setCards(sortedCards)
    setSelectedOne('')
    setSelectedTwo('')
  }
  


  useEffect(() => {
    prepareCards()
  }, [])


  useEffect(() => {
    if(selectedOne && selectedTwo) {
      if(selectedOne.path === selectedTwo.path) {
        setScore(score+10)
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if(card.path === selectedOne.path) {
              return { ...card, matched:true }
            }
            else {
              return card
            }
          })
        })
        resetState()
      }
      else {
        setTimeout(() => {
          resetState()
        }, 1000);
      }
    }
  }, [selectedOne, selectedTwo])


  const resetState = () => {
    setSelectedOne('')
    setSelectedTwo('')
    setDisabled(false)
  }


  const handleSelected = (card) => {
    selectedOne ? setSelectedTwo(card) : setSelectedOne(card)
  }
  

  return (
    <div className='container'>
      <h1>Eşleştirme Oyunu</h1>
      <div className='scoreBoard'>
        <button onClick={prepareCards}>Tekrar Oyna</button>
        <p>Puan: {score}</p>
      </div>
      <div className='card-grid'>
        {
          cards.map((card) => (
            <Card card={card} key={card.id} handleSelected={handleSelected} disabled={disabled} rotated={ card === selectedOne || card === selectedTwo || card.matched }/>
          ))
        }
      </div>
    </div>
  )
}

export default App
