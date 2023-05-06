const Card = ({ card, handleSelected, disabled, rotated }) => {

    const handleClick = () => {
        if(!disabled) {
            handleSelected(card)
        }
    }

    return (
        <div className="card">
            <div className= {rotated ? "rotated" : ""}>
                <img className="cardFront" src={card.path} />
                <img className="cardBack" onClick={() => handleClick()} src='../img/background.jpg' />
            </div>
        </div>
    )
}

export default Card;