const React = require('react');
import styled from 'styled-components';
import Card from "./Card.js"
const cardPrimitives = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const suits = ["♠", "♣", "♥", "♦"];
import { calculateEquity } from 'poker-odds'

const yourHand = [0,2];
const oppoHand = [1,3];
const board= [5,6,7,9,11];
const burn= [4,8,10];





const DeckStyle = styled.div`
    border-radius: 10%;
    background-color: white;
    width: 70px !important;
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

function exchangeCard(card) {
    let convSuit = "";
    let convValue = card.value;
    switch (card.suit) {
        // ["♠", "♣", "♥", "♦"]
        case "♠":
            convSuit = "s";
            break;
        case "♣":
            convSuit = "c";
            break;
        case "♥":
            convSuit = "h";
            break;
        case "♦":
            convSuit = "d";
            break;
    }
    if (card.value == "10") {
        convValue = "T"
    } 
    let totalConv = convValue + convSuit
    return totalConv
}

function convertHands(myHand, oppoHand) {
    let totalHand = []
    let myHandConv = []
    let oppoHandConv = []
    myHand.forEach(function(card) {
       myHandConv.push(exchangeCard(card));
    })
    oppoHand.forEach(function(card){
        oppoHandConv.push(exchangeCard(card));
    }) 
    totalHand.push(myHandConv);
    totalHand.push(oppoHandConv);
    return totalHand;
    
}


class CardVis extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            parent: "",
            allCards: [],
            phases: [this.props.phase],
            yourOdds: "Unknown",
            oppoOdds: "Unknown",
            tie: "Unknown",
        };
        this.calculateOdds = this.calculateOdds.bind(this)
    }
    componentDidMount(){
        this.setState({
            parent: this.parentNode,
            allCards: makeCards(suits, cardPrimitives)
        });
    }

    componentDidUpdate(prevProps) {
        // console.log("PHASES", this.state.phases)
        if (this.state.phases.indexOf(this.props.phase) == -1) {
            this.setState({
                phases: this.state.phases.concat(this.props.phase)
            })
        }
        if (this.state.phases.length == 4) {
            this.calculateOdds(3)
        } else if (this.state.phases.length == 5) {
            this.calculateOdds(4)
        } else if (this.state.phases.length == 6) {
            this.calculateOdds(5)
        }
    } 

   

    calculateOdds(revealed) {
        let yh = this.state.allCards.filter(function(card, ind) {
            return yourHand.includes(ind);
        })
        let oh = this.state.allCards.filter(function(card, ind) {
            return oppoHand.includes(ind);
        })
        let bothHands = convertHands(yh, oh)
        let subBoard = board.slice(0, revealed)
        let b = this.state.allCards.filter(function(card, ind) {
            return subBoard.includes(ind)
        })
        let boardConv = []
        b.forEach(function(card) {
            boardConv.push(exchangeCard(card));
        })
        console.log("boardConv", bothHands, boardConv)

        let odds = calculateEquity(bothHands, boardConv, 2000, false)
        console.log("odds",odds)
        let count = odds[0].count
        let yourOdds = (Math.round(odds[0].wins * 1000 / count) / 10) + "%"
        let yourTie = (Math.round(odds[0].ties * 1000 / count) / 10) + "%"
        let oppoOdds = (Math.round(odds[1].wins * 1000 / count) / 10) + "%"
        this.setState({
            yourOdds: yourOdds,
            oppoOdds: oppoOdds,
            tie: yourTie
        })

    }
   
    render() {
        const { idyll, hasError, updateProps, ...props } = this.props;
        return (
            <div>
                <div style={{top: "0", marginLeft: "25vw", position: "relative"}}>
                    <DeckStyle {...props} style={{backgroundImage: `url("../static/images/card_back.svg)`}}>
                        <img className="cardback" src="../static/images/card_back.svg" alt="Avatar" />
                    </DeckStyle>
                    {this.state.allCards.map((card, i) => (
                        <Card len={105} wid={70} suit={card.suit} value={card.value} ind={i} key={i} phase={this.state.phases}/>
                    ))}
                </div>
                <p style={{position: "absolute", left: "150px", bottom: "75px", textAlign:"center"}}>Your Odds of Winning: {this.state.yourOdds}</p>
                <p style={{position: "absolute", left: "150px", bottom: "50px", textAlign:"center"}}>Opponent Odds of Winning: {this.state.oppoOdds}</p>
                <p style={{position: "absolute", left: "150px", bottom: "25px", textAlign:"center"}}>Chance of Both Players Tying: {this.state.tie}</p>
            </div>
        );
    }
  
        
}

module.exports = CardVis;