const React = require('react');

const yourHand = [0,2];
const oppoHand = [1,3];
const board= [5,6,7,9,11];
const burn= [4,8,10];
const hStart = -200;

class Card extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            len: this.props.len,
            wid: this.props.wid,
            movement: `translateX(0px)`,
            rot: "rotateY(0deg)",
            ind: this.props.ind,
            textTop: 0,
            textLeft: 0,
            visibilty: "hidden",
            text: ""
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
        let arr = this.determinePosition();
        let vis = arr[2] != ""
        if (vis) {
            vis = "visible"
        }

        this.setState({
            movement: arr[0],
            rot: arr[1],
            visibilty: vis,
            textTop: (arr[4] + this.state.len),
            textLeft: arr[3],
            text: arr[2]
        })
      } 
  

    determinePosition() {
        let mov = "translate(0px)"
        let rot = "rotateY(0deg)"
        let text = ""
        let x = 0
        let y = 0
        let ind = -1
        if (this.props.phase.indexOf(this.state.ind) != -1) {
            if (yourHand.indexOf(this.state.ind) != -1) {
                ind = yourHand.indexOf(this.state.ind)
                x = hStart + ind * this.state.wid 
                if (ind != 0) {
                    x += (this.state.wid * 0.15)
                }
                y = this.state.len * 1.2
                mov = `translate(${x}px, ${y}px)`
                text = `Your Card ${ind + 1}`
                x += 10
                
            } else if (oppoHand.indexOf(this.state.ind) != -1) {
                ind = oppoHand.indexOf(this.state.ind)
                x = hStart + ind * this.state.wid 
                if (ind != 0) {
                    x += (this.state.wid * 0.15)
                }
                y = this.state.len * 3.6
                mov = `translate(${x}px, ${y}px)`
                text = `Opponent's Card ${ind + 1}`
            } else if (board.indexOf(this.state.ind) != -1) {
                ind = board.indexOf(this.state.ind)
                x = hStart - 50 + ind * this.state.wid 
                if (ind != 0) {
                    x += (this.state.wid * 0.15 * ind)
                }
                y = this.state.len * 2.4
                mov = `translate(${x}px, ${y}px)`
                if (ind < 3) {
                    text = `Board (Flop): ${ind + 1}`
                } else if (ind == 3 ) {
                    text = `Board (Turn Card)`
                } else {
                    text = `Board (The River)`
                }
            } else {
                mov = `translateX(${this.state.wid + 8}px)`
                text = `Burn Pile`
                x =  this.state.wid + 24
            }
            if (burn.indexOf(this.state.ind) == -1) {
                rot = "rotateY(180deg)"
            } 
        }
        return [mov, rot, text, x, y]

    }

    render() {
        const { idyll, hasError, updateProps, ...props} = this.props;
        return (
            <div>
                <p style={{visibility:this.state.visibilty, top: this.state.textTop, left: this.state.textLeft, position:"absolute", fontSize: "8px"}}> {this.state.text} </p>
                <div onClick={this.toggleClick} className="flip-card" 
                style={{width: this.state.wid, height: this.state.len, transform: this.state.movement, backgroundColor: "white", transition:"all 1.4s linear", top: 0, position:"absolute"}}>
                    <div style={{transform: this.state.rot}} className="flip-card-inner">
                        <div className="flip-card-front">
                            <img className="cardback" src="../static/images/card_back.svg" alt="Avatar" />
                        </div>
                        <div className="flip-card-back">
                            <p style={{color: (this.state.suit == "♥" || this.state.suit == "♦")? "#8a0303" : "#000000", "fontSize": "1.5em", "marginTop": (this.state.len / 4)}}> {this.state.suit + this.state.value} </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = Card;