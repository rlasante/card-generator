var AppDispatcher = require('../dispatchers/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/AppConstants');
var assign = require('object-assign');

// data storage
var _data = [{title:'Title', text:'text', imageUrl:null}, {title:'2nd Title', text:'text', imageUrl:null}];
var _currentCard = 0;

// add private functions to modify data
function addCard(title, text='',imageUrl='') {
  _data.push({title, text, imageUrl});
}

function switchCard(cardIndex) {
  _currentCard = cardIndex;
}

// Facebook style store creation.
var CardDataStore = assign({}, EventEmitter.prototype, {

  // public methods used by Controller-View to operate on data
  getAll: function() {
    return {
      cards: _data
    };
  },

  getCurrentCard: function() {
    return _data[_currentCard];
  },

  getCurrentIndex: function() {
    return _currentCard;
  },


  // Allow Controller-View to register itself with store
  addChangeListener: function(callback) {
    this.on(Constants.CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(Constants.CHANGE_EVENT, callback);
  },
  // triggers change listener above, firing controller-view callback
  emitChange: function() {
    this.emit(Constants.CHANGE_EVENT);
  },


  // register store with dispatcher, allowing actions to flow through
  dispatcherIndex: AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.type) {
      case Constants.ActionTypes.ADD_CARD:
        var title = action.title.trim();
        var text = action.text.trim();
        var imageURL = action.imageUrl;
        // NOTE: if this action needs to wait on another store:
        // AppDispatcher.waitFor([OtherStore.dispatchToken]);
        // For details, see: http://facebook.github.io/react/blog/2014/07/30/flux-actions-and-the-dispatcher.html#why-we-need-a-dispatcher
        if (text !== '') {
          addCard(title, text, imageURL);
          switchCard(_data.length-1);
          CardDataStore.emitChange();
        }
        break;
      case Constants.ActionTypes.SWITCH_CARD:
        if(action.card !== _currentCard) {
          switchCard(action.card);
          CardDataStore.emitChange();
        }
        break;

      case Constants.ActionTypes.CLEAR_CARDS:
        _data = {};
        CardDataStore.emitChange();
        break;

      case Constants.ActionTypes.EXPORT_CARDS:
        console.warn("Exporting the cards isn't supported yet");
        break;

      // add more cases for other actionTypes...
    }
  })

});

module.exports = CardDataStore;
