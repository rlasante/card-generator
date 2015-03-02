var React = require('react');
var ReactAddons = require('react/addons')
var Button = require('react-bootstrap/Button')
var Modal = require('react-bootstrap/Modal')
var Input = require('react-bootstrap/Input')
var OverlayMixin = require('react-bootstrap/OverlayMixin')
var CardDataStore = require('../stores/CardDataStore')
var CardActionCreators = require('../actions/CardActionCreators')
var Card = require('./Card.jsx')


var CardSelector = React.createClass({
  mixins: [ReactAddons.LinkedStateMixin, OverlayMixin],

  getInitialState: function() {
    return {
      isModalOpen: false,
      cards: CardDataStore.getAll().cards,
      currentCard: CardDataStore.getCurrentCard(),
      currentSelection: CardDataStore.getCurrentIndex()
    };
  },

  _onChange: function() {
    this.setState({
      isModalOpen: this.state.isModalOpen,
      cards: CardDataStore.getAll().cards,
      currentCard: CardDataStore.getCurrentCard(),
      currentSelection: CardDataStore.getCurrentIndex()
    });
  },

  componentDidMount: function() {
    CardDataStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    CardDataStore.removeChangeListener(this._onChange);
  },

  render: function() {
    return (
      <Button onClick={this.handleToggle} bsStyle="primary">Select Card</Button>
    );
  },

  handleToggle: function() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  },

  onSelect: function(event) {
    console.log("On select event: " + event.target.value);
    CardActionCreators.changeCard(event.target.value);
  },

  // This is called by the `OverlayMixin` when this component
  // is mounted or updated and the return value is appended to the body.
  renderOverlay: function () {
    if (!this.state.cards || this.state.cards.size == 0 || !this.state.isModalOpen) {
      return <span/>;
    }

    return (
      <Modal bsStyle="primary" title="Select Card" onRequestHide={this.handleToggle}>
        <div className="modal-body">
          This modal is controlled by our custom trigger component.
          <Input type="select"
            label='Select Card'
            default={this.state.currentSelection}
            value={this.state.currentSelection}
            onChange={this.onSelect}
            >
            {this.state.cards.map(card =>
                <option value={this.state.cards.indexOf(card)}>{card.title}</option>
            )}
          </Input>
        </div>
        <div className="modal-footer">
          <Button onClick={this.handleToggle}>Close</Button>
        </div>
      </Modal>
    );
  }
});

module.exports = CardSelector;
