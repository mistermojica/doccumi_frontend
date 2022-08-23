import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import Collection from '@ckeditor/ckeditor5-utils/src/collection';
import Model from '@ckeditor/ckeditor5-ui/src/model';

import {
  addListToDropdown,
  createDropdown
} from '@ckeditor/ckeditor5-ui/src/dropdown/utils';

import _ from 'underscore';

export default class PlaceholderUI extends Plugin {
  init() {
    // const editor = this.editor;
    const {t} = this.editor;

    const placeholderNames =
      this.editor.config.get('placeholderProps.types') || [];

    // The "placeholder" dropdown must be registered among UI components of the editor
    // to be displayed in the toolbar.
    this.editor.ui.componentFactory.add('placeholder', (locale) => {
      const dropdownView = createDropdown(locale);

      // Populate the list in the dropdown with items.
      addListToDropdown(
        dropdownView,
        getDropdownItemsDefinitions(placeholderNames)
      );

      dropdownView.buttonView.set({
        // The t() function helps localize the editor. All strings enclosed in t() can be
        // translated and change when the language of the editor changes.
        label: t('Placeholder'),
        tooltip: true,
        withText: true
      });

      // Execute the command when the dropdown items is clicked (executed).
      this.listenTo(dropdownView, 'execute', (evt) => {
        this.editor.execute('placeholder', {
          value: evt.source.commandParam
        });
        this.editor.editing.view.focus();
      });

      return dropdownView;
    });
  }
}

function getDropdownItemsDefinitions(placeholderNames) {
  const itemDefinitions = new Collection();

  _.each(placeholderNames, (value, key) => {
    const definition = {
      type: 'button',
      model: new Model({
        commandParam: key,
        label: key,
        withText: true
      })
    };

    // Add the item definition to the collection.
    itemDefinitions.add(definition);
  });

  // for (const name of placeholderNames) {
  //   const definition = {
  //     type: 'button',
  //     model: new Model({
  //       commandParam: name,
  //       label: name,
  //       withText: true
  //     })
  //   };

  //   // Add the item definition to the collection.
  //   itemDefinitions.add(definition);
  // }

  return itemDefinitions;
}
