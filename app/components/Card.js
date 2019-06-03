const React = require('react');



let CardStyle = ""
class Card extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            len: this.props.len,
            wid: this.props.wid
        }
        
    }

    componentDidMount() {
        this.setState({
            suit: this.props.suit,
            value: this.props.value,
        })
    }

    render() {
        const { idyll, hasError, updateProps, ...props} = this.props;
        return (
            <div className="flip-card" style={{width: this.state.wid, height: this.state.len}}>
                <div className="flip-card-inner">
                    <div className="flip-card-front">
                        <img className="cardback" src="../static/images/card_back.svg" alt="Avatar" />
                    </div>
                    <div className="flip-card-back">
                        <p style={{color: (this.state.suit == "♥" || this.state.suit == "♦")? "#8a0303" : "#000000", "font-size": "3em", "margin-top": (this.state.len / 4)}}> {this.state.suit + this.state.value} </p>
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = Card;