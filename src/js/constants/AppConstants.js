var keyMirror = require('react/lib/keyMirror');

module.exports = {

  CHANGE_EVENT: 'change',

  ActionTypes: keyMirror({
    ADD_TASK: null,
    ADD_CARD: null,
    CLEAR_CARDS: null,
    EXPORT_CARDS: null,
    SWITCH_CARD: null
  }),

  ActionSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })

};
