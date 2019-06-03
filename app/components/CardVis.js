const React = require('react');
import styled from 'styled-components';
import Card from "./Card.js"
const cardPrimitives = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const suits = ["♠", "♣", "♥", "♦"];




const DeckStyle = styled.div`
    border-radius: 10%;
    width: auto !important;
    background-color: white;
    word-wrap: break-word;
    box-shadow: 0 0.0625em 0.1875em 0 rgba(0, 0, 0, 0.1), 0 0.5em 0 -0.25em #f2f2f2, 0 0.5em 0.1875em -0.25em rgba(0, 0, 0, 0.1), 0 1em 0 -0.5em #e5e5e5, 0 1em 0.1875em -0.5em rgba(0, 0, 0, 0.1);

`

// margin: 0 auto 2rem;
//     padding: 1rem;
//     min-width: 10rem;
//     max-width: 20rem;

function makeCards(suits, cardPrimitives) {
    let allPlayedCards = [];
    while (allPlayedCards.length < 12) {
        let newCard = makeRandCard(suits, cardPrimitives);
        let currSize = allPlayedCards.length
        while (allPlayedCards.length == currSize) {
            let newArr = allPlayedCards.filter(function(card){
                console.log(card);
                card.value == newCard.value && card.suit == newCard.suit
            });
            if (newArr.length == 0) {
                allPlayedCards.push(newCard);
                console.log(allPlayedCards.length, "APC LENGTH")
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

// let cards = makeCards(suits, cardPrimitives);

class CardVis extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            parent: "",
            allCards: makeCards(suits, cardPrimitives)
        };
        // this.state = {allCards: makeCards(suits, cardPrimitives)};
    }
    componentDidMount(){
        this.setState({
            parent: this.parentNode,
            allCards: makeCards(suits, cardPrimitives)
        });
    }
    render() {
        const { idyll, hasError, updateProps, ...props } = this.props;
        return (
          <DeckStyle {...props}>
            <Card len={150} wid={100} suit={this.state.allCards[0].suit} value={this.state.allCards[0].value} />
          </DeckStyle>
        );
    }
  
        
}

module.exports = CardVis;