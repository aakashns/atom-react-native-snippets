'use babel';

import AtomReactNativeSnippetsView from './atom-react-native-snippets-view';
import { CompositeDisposable } from 'atom';

export default {

  atomReactNativeSnippetsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomReactNativeSnippetsView = new AtomReactNativeSnippetsView(state.atomReactNativeSnippetsViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomReactNativeSnippetsView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-react-native-snippets:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomReactNativeSnippetsView.destroy();
  },

  serialize() {
    return {
      atomReactNativeSnippetsViewState: this.atomReactNativeSnippetsView.serialize()
    };
  },

  toggle() {
    console.log('AtomReactNativeSnippets was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
