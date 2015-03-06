var AppDispatcher = require('../dispatchers/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/AppConstants');
var assign = require('object-assign');

// data storage
var _data = {filters: ['all', 'current'], current: '.*', all: '.*'};
var _currentFilterName = 'current';
var _currentFilter = _data[_currentFilterName];


function setCurrentFilter(name) {
  _currentFilterName = name;
  _currentFilter = _data[_currentFilterName];
}

function putFilter(name, filter) {
  if (_data.filters.indexOf(name) === -1) {
    _data.filters.push(name);
  }
  _data[name] = filter;
  if (name === _currentFilterName) {
    _currentFilter = filter;
  }
}

function filterSort(a,b) {
  if (a.name.toUpperCase() < b.name.toUpperCase())
  {
    return -1;
  }
  if (a.name.toUpperCase() > b.name.toUpperCase()) {
    return 1;
  }

  return 0;
}

// Facebook style store creation.
var FilterStore = assign({}, EventEmitter.prototype, {

  // public methods used by Controller-View to operate on data
  getAllFilters: function() {
    return {
      filters: _data.filters.map(function(name) {
        return {name, filter:_data[name]};
      })
    };
  },

  getAllFiltersSorted: function() {
    return {
      filters: this.getAllFilters().sort(filterSort)
    };
  },

  getFilter: function(filterName) {
    return _data[filterName];
  },

  getCurrentFilter: function() {
    return _currentFilter;
  },

  getCurrentFilterName: function() {
    return _currentFilterName;
  },

  getCurrentFilterRegExp: function() {
    return new RegExp(_currentFilter);
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
      case Constants.ActionTypes.SET_CURRENT_FILTER:
        var name = action.name;
        // NOTE: if this action needs to wait on another store:
        // AppDispatcher.waitFor([OtherStore.dispatchToken]);
        // For details, see: http://facebook.github.io/react/blog/2014/07/30/flux-actions-and-the-dispatcher.html#why-we-need-a-dispatcher
        if (name !== '') {
          setCurrentFilter(name)
          FilterStore.emitChange();
        }
        break;
      case Constants.ActionTypes.PUT_FILTER:
        var name = action.name;
        var filter = action.filter;

        if (name !== undefined &&
            filter !== undefined) {
          putFilter(name, filter);
          FilterStore.emitChange();
        }
        break;
      case Constants.ActionTypes.CLEAR_FILTER:
        var name = action.name;
        if (name !== undefined) {
          putFilter(name, _data.all);
          FilterStore.emitChange();
        }
        break;

      // add more cases for other actionTypes...
    }
  })

});

module.exports = FilterStore;
