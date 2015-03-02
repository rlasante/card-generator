var React = require('react');
var Panel = require('react-bootstrap/Panel');

var Card = React.createClass({

  getDefaultProps: function() {
    return {
      card: {
        title: '',
        text: '',
        imageUrl: null
      }
    };
  },

  componentDidMount: function() {
  },

  render: function() {
    var card = this.props.card;
    return (
      <Panel>
        <h1>{card.title}</h1>
        <img src={card.imageUrl} />
        <p>{card.text}</p>
      </Panel>
    );
  }
});

module.exports = Card;
