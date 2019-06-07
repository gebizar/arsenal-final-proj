const React = require('react');

class CustomComponent extends React.Component {
  render() {
    const { hasError, idyll, updateProps, ...props } = this.props;
    return (
      <div {...props} style={{height: "0px", width:"0px", margin:"0px", padding:"0px"}}>
      </div>
    );
  }
}

module.exports = CustomComponent;
