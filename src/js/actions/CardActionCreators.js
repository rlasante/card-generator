var AppDispatcher = require('../dispatchers/AppDispatcher');
var Constants = require('../constants/AppConstants');

module.exports = {

  addCard: function(title, text, imageUrl) {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.ADD_CARD,
      title:title,
      text: text,
      imageUrl:imageUrl
    });
  },

  clearCards: function() {
    AppDispatcher.handleViewAction({
      type:Constants.ActionTypes.CLEAR_CARDS
    });
  },

  exportCards: function() {
    AppDispatcher.handleViewAction({
      type:Constants.ActionTypes.EXPORT_CARDS
    });
  },

  changeCard: function(card) {
    AppDispatcher.handleViewAction({
      type:Constants.ActionTypes.SWITCH_CARD,
      card: card
    });
  }

};
