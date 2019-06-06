const React = require('react');
import styled from 'styled-components';
import Card from "./Card.js"
const cardPrimitives = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const suits = ["♠", "♣", "♥", "♦"];




const DeckStyle = styled.div`
    border-radius: 10%;
    background-color: white;
    width: 100px !important;
    word-wrap: break-word;
    box-shadow: 0 0.0625em 0.1875em 0 rgba(0, 0, 0, 0.1), 0 0.5em 0 -0.25em #f2f2f2, 0 0.5em 0.1875em -0.25em rgba(0, 0, 0, 0.1), 0 1em 0 -0.5em #e5e5e5, 0 1em 0.1875em -0.5em rgba(0, 0, 0, 0.1);

`

function makeCards(suits, cardPrimitives) {
    let allPlayedCards = [];
    while (allPlayedCards.length < 12) {
        let newCard = makeRandCard(suits, cardPrimitives);
        let currSize = allPlayedCards.length
        while (allPlayedCards.length == currSize) {
            let newArr = allPlayedCards.filter(function(card){
                card.value == newCard.value && card.suit == newCard.suit
            });
            if (newArr.length == 0) {
                allPlayedCards.push(newCard);
            } else {
                newCard = makeRandCard(suits, cardPrimitives);
            }
        }
    }
    return allPlayedCards;
}

function makeRandCard(suits, cardPrimitives) {
    let cardVal = Math.floor(Math.random() * 13);
    let cardSuit = Math.floor(Math.random() * 4);
    return {
        suit: suits[cardSuit],
        value: cardPrimitives[cardVal]
    };
}


class CardVis extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            parent: "",
            allCards: makeCards(suits, cardPrimitives)
        };
    }
    componentDidMount(){
        this.setState({
            parent: this.parentNode,
            allCards: makeCards(suits, cardPrimitives)
        });
    }
    updateProps() {
    
    }
    render() {
        const { idyll, hasError, updateProps, ...props } = this.props;
        return (
            <div style={{top: "5vw", marginLeft: "50vw", position: "relative"}}>
                <DeckStyle {...props} style={{backgroundImage: `url("../static/images/card_back.svg)`}}>
                    <img className="cardback" src="../static/images/card_back.svg" alt="Avatar" />
                </DeckStyle>
                {this.state.allCards.map((card, i) => (
                    <Card len={150} wid={100} suit={card.suit} value={card.value} ind={i} />
                ))}
            </div>
        );
    }
  
        
}

module.exports = CardVis;