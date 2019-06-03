const React = require('react');



class Card extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            card: [this.props.suit, this.props.value]
        }
        
    }
    componentDidMount() {
    }

    render() {
        const { idyll, hasError, updateProps, ...props } = this.props;
        return (
            <div class="flip-card">
                <div class="flip-card-inner">
                    <div class="flip-card-front">
                        <img src="../static/images/card_back.svg" alt="Avatar" />
                    </div>
                    <div class="flip-card-back">
                        <p> {this.state.suit + " " +this.state.value} </p>
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = Card;