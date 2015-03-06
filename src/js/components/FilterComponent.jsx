var React = require('react');
var cardActions = require('../actions/CardActionCreators')
var filterActions = require('../actions/FilterActionCreators')
var FilterStore = require('../stores/FilterStore')
var CardDataStore = require('../stores/CardDataStore')
var Input = require('react-bootstrap/Input')
var ListGroup = require('react-bootstrap/ListGroup')
var ListGroupItem = require('react-bootstrap/ListGroupItem')

var FilterComponent = React.createClass({
  getInitialState: function() {
    var currentFilter = FilterStore.getCurrentFilterRegExp();
    var state = CardDataStore.getAll();
    state.cards = state.cards.filter(function(card) {
        var cardInfo = currentFilter.exec(card.title);
        if (cardInfo !== null) {
          card.filterInfo = cardInfo
          return card;
        }
    });
    return state;
  },

  _onChange: function() {
    var currentFilter = FilterStore.getCurrentFilterRegExp();
    var state = CardDataStore.getAll();
    state.cards = state.cards.filter(function(card) {
      var cardInfo = currentFilter.exec(card.title);
      if (cardInfo !== null) {
        card.filterInfo = cardInfo
        return card;
      }
    });
    console.log(state.cards);
    this.setState(state);
  },

  componentDidMount: function() {
    CardDataStore.addChangeListener(this._onChange);
    FilterStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    CardDataStore.removeChangeListener(this._onChange);
    FilterStore.removeChangeListener(this._onChange);
  },

  handleFilterChange: function(event) {
    // We want to now update the current filter's regex
    console.log("Handle input change: " + event.target.value);
    filterActions.putFilter('(?:' + event.target.value + ')', FilterStore.getCurrentFilterName());
  },

  handleListClick: function(card) {
    // Let's update the current card that's selected
    cardActions.changeCard(CardDataStore.getAll().cards.indexOf(card))
  },

  render: function() {
    if (FilterStore.getCurrentFilter() === '.*' ||
        FilterStore.getCurrentFilter() === '(?:)')
    {
      return (
        <div>
          <Input type="text" label="Filter" onChange={this.handleFilterChange} hasFeedback></Input>
          <ListGroup>
          {
            this.state.cards.map(card =>
                <ListGroupItem onClick={this.handleListClick} eventKey={card}><span>{card.title}</span></ListGroupItem>
            )}
          </ListGroup>
        </div>
      );
    }
    else {
      return (
        <div>
          <Input type="text" label="Filter" onChange={this.handleFilterChange} hasFeedback></Input>
          <ListGroup>
          {
            this.state.cards.map(card =>
                <ListGroupItem onClick={this.handleListClick} eventKey={card} >
                  <span>{card.title.substring(0, card.filterInfo.index)}
                  <em className="highlight">{card.filterInfo[0]}</em>
                  {card.title.substring(card.filterInfo.index + card.filterInfo[0].length)}</span>
                </ListGroupItem>
            )}
          </ListGroup>
        </div>
      );
    }
  }
});

module.exports = FilterComponent;
