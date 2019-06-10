const React = require('react');

class ImgComponent extends React.Component {
  render() {
    const { hasError, idyll, updateProps, ...props } = this.props;
    return (
      <img src={this.props.path} style={{width:this.props.width, height:this.props.height}}/>
    );
  }
}

module.exports = ImgComponent;
