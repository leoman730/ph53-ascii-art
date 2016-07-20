'use babel';

import { CompositeDisposable } from 'atom';

export default {

  subscriptions: null,

  activate(state) {

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'ph53-ascii-art:convert': () => this.convert()
    }));
  },

  deactivate() {
    this.ph53AsciiArtView.destroy();
  },

  convert: function() {
    var editor, figlet, font, selection;
    if (editor = atom.workspace.getActiveTextEditor()) {
      selection = editor.getSelectedText();
      figlet = require('figlet');
      font = "O8";
      return figlet(selection, {
        font: font
      }, function(error, art) {
        if (error) {
          return console.error(error);
        } else {
          return editor.insertText("\n" + art + "\n");
        }
      });
    }
  }
};
