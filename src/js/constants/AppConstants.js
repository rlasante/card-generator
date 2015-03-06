var keyMirror = require('react/lib/keyMirror');

module.exports = {

  CHANGE_EVENT: 'change',

  ActionTypes: keyMirror({
    ADD_TASK: null,
    ADD_CARD: null,
    CLEAR_CARDS: null,
    CLEAR_FILTER: null,
    EXPORT_CARDS: null,
    PUT_FILTER: null,
    REMOVE_CARD: null,
    SET_CURRENT_FILTER: null,
    SWITCH_CARD: null
  }),

  ActionSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })

};
