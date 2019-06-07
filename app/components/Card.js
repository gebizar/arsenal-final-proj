const React = require('react');

const yourHand = [0, 2];
const oppoHand = [1,3];
const board= [5,6,7,9,11];
const burn= [4,8,10];
const hStart = -200;
const order = [0, 1, 2, ,3 ,4, 5, 6, 7, 8, 9, 10, 11];

class Card extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            len: this.props.len,
            wid: this.props.wid,
            movement: `translateX(0px)`,
            rot: "rotateY(0deg)",
            ind: this.props.ind
        };
        this.determinePosition = this.determinePosition.bind(this);


    }

    componentDidMount() {
        this.setState({
            suit: this.props.suit,
            value: this.props.value,
            movement: `translateX(0px)`,
            rot: "rotateY(0deg)"
        })
    }

    componentDidUpdate(prevProps) {
        this.setState({
            movement: this.determinePosition()
        })
      } 
  

    determinePosition() {
        let mov = "translate(0px)"
        let rot = "rotateY(0deg)"
        let x = 0
        let y = 0
        let ind = -1
        console.log("CHECK ARRAY HERE", this.props.phase)
        if (this.props.phase.indexOf(this.state.ind) != -1) {
            if (yourHand.indexOf(this.state.ind) != -1) {
                ind = yourHand.indexOf(this.state.ind)
                x = hStart + ind * this.state.wid 
                if (ind != 0) {
                    x += (this.state.wid * 0.15)
                }
                y = this.state.len * 1.2
                console.log(1, ind, x, y)
                mov = `translate(${x}px, ${y}px)`
                console.log(mov)
            } else if (oppoHand.indexOf(this.state.ind) != -1) {
                ind = oppoHand.indexOf(this.state.ind)
                x = hStart + ind * this.state.wid 
                if (ind != 0) {
                    x += (this.state.wid * 0.15)
                }
                y = this.state.len * 3.6
                console.log(2, ind, x, y)
                mov = `translate(${x}px, ${y}px)`
            } else if (board.indexOf(this.state.ind) != -1) {
                ind = board.indexOf(this.state.ind)
                x = hStart - 50 + ind * this.state.wid 
                if (ind != 0) {
                    x += (this.state.wid * 0.15 * ind)
                }
                y = this.state.len * 2.4
                console.log(3, ind, x, y)

                mov = `translate(${x}px, ${y}px)`
            } else {
                mov = `translateX(${this.state.wid + 15}px)`
                console.log(4, this.state.wid + 15)
                console.log(typeof mov)
            }
            rot = "rotateY(180deg)"
        }
        return mov, rot

    }

    render() {
        const { idyll, hasError, updateProps, ...props} = this.props;
        return (
            <div onClick={this.toggleClick} className="flip-card" 
            style={{width: this.state.wid, height: this.state.len, transform: this.state.movement, backgroundColor: "white", transition:"all 1.4s linear", top: 0, position:"absolute"}}>
                <div style={{transform: this.state.rot}} className="flip-card-inner">
                    <div className="flip-card-front">
                        <img className="cardback" src="../static/images/card_back.svg" alt="Avatar" />
                    </div>
                    <div className="flip-card-back">
                        <p style={{color: (this.state.suit == "♥" || this.state.suit == "♦")? "#8a0303" : "#000000", "fontSize": "3em", "marginTop": (this.state.len / 4)}}> {this.state.suit + this.state.value} </p>
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = Card;