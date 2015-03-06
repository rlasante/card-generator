var React = require('react');
var Panel = require('react-bootstrap/Panel');
var Actions = require('../actions/CardActionCreators')
var Button = require('react-bootstrap/Button')

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

  onClick: function(event) {
    Actions.removeCard(this.props.card);
  },

  render: function() {
    var card = this.props.card;
    return (
      <Panel>
        <h1>{card.title}</h1>
        <img src={card.imageUrl} />
        <p>{card.text}</p>
        <Button onClick={this.onClick}>Delete</Button>
      </Panel>
    );
  }
});

module.exports = Card;
