const React = require('react');

class CustomComponent extends React.Component {
  render() {
    const { hasError, idyll, updateProps, ...props } = this.props;
    return (
      <h1 {...props} style={{margin:"0px", padding:"0px"}}>
        {this.props.text}
      </h1>
    );
  }
}

module.exports = CustomComponent;
