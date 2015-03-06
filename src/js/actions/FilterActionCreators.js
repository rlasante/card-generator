var AppDispatcher = require('../dispatchers/AppDispatcher');
var Constants = require('../constants/AppConstants');

module.exports = {

  setCurrentFilter: function(filterName) {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.SET_CURRENT_FILTER,
      name: filterName
    });
  },

  putFilter: function(filter, filterName=current) {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.PUT_FILTER,
      name: filterName,
      filter: filter
    });
  },

  clearFilter: function(filterName=current) {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.PUT_FILTER,
      name: filterName
    });
  }

};
