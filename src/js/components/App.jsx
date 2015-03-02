var React = require('react');
var DataStore = require('../stores/DataStore');
var ActionCreator = require('../actions/DataActionCreators');
var CardActionCreator = require('../actions/CardActionCreators');
var Button = require('react-bootstrap/Button');
var Jumbotron = require('react-bootstrap/Jumbotron');
var TaskList = require('./TaskList.jsx');
var CardDataStore = require('../stores/CardDataStore')
var Card = require('./Card.jsx')
var CardSelector = require('./CardSelector.jsx')

var App = React.createClass({

  getInitialState: function() {
    var data = DataStore.getAll();
    var cards = CardDataStore.getAll();
    var currentCard = CardDataStore.getCurrentCard();
    return {
      tasks: data.tasks,
      cards: cards.cards,
      currentCard: currentCard
    }
  },

  _onChange: function() {
    console.log("On Change")
    this.setState({
      tasks: DataStore.getAll().tasks,
      cards: CardDataStore.getAll().cards,
      currentCard: CardDataStore.getCurrentCard()
    });
  },

  componentDidMount: function() {
    DataStore.addChangeListener(this._onChange);
    CardDataStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    DataStore.removeChangeListener(this._onChange);
    CardDataStore.removeChangeListener(this._onChange);
  },

  handleAddNewTaskClick: function(e) {
    var title = prompt('Enter task title:');
    if (title) {
      ActionCreator.addItem(title);
    }
  },

  handleClearTaskListClick: function(e) {
    ActionCreator.clearList();
  },

  handleAddNewCardClick: function(e) {
    var title = prompt('Enter card title:');
    if (title) {
      var text = prompt('Enter card text:');
      var image = prompt('Enter url for card image:');
      CardActionCreator.addCard(title, text, image);
    }
  },

  handleSwitchCardClick: function(e) {
    var card = prompt('Enter card number you wish to see:');
    if (card) {
      CardActionCreator.changeCard(card);
    }
  },

  render: function() {
    return (
      <div className="container">
        <Jumbotron>
          <h1>Learning Flux</h1>
          <p>
            Below is a list of tasks you can implement to better grasp the patterns behind Flux.<br />
            Most features are left unimplemented with clues to guide you on the learning process.
          </p>
        </Jumbotron>

        <p>Card Title: {this.state.currentCard ? this.state.currentCard.title : ''} </p>
        <Card card={this.state.currentCard} />
        <Button onClick={this.handleAddNewCardClick}>Add New Card</Button>
        <CardSelector/>

        <TaskList tasks={this.state.tasks} />

        <Button onClick={this.handleAddNewTaskClick} bsStyle="primary">Add New Task</Button>
        <Button onClick={this.handleClearTaskListClick} bsStyle="danger">Clear Task List</Button>
      </div>
    );
  }

});

module.exports = App;
