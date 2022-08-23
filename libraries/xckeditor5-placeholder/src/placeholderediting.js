/* eslint no-underscore-dangle: 0 */
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';

import {
  toWidget,
  viewToModelPositionOutsideModelElement
} from '@ckeditor/ckeditor5-widget/src/utils';

import PlaceholderCommand from './placeholdercommand';

import './theme/placeholder.css';

export default class PlaceholderEditing extends Plugin {
  static get requires() {
    return [Widget];
  }

  init() {
    this._defineSchema();
    this._defineConverters();

    this.editor.commands.add(
      'placeholder',
      new PlaceholderCommand(this.editor)
    );

    this.editor.editing.mapper.on(
      'viewToModelPosition',
      viewToModelPositionOutsideModelElement(this.editor.model, (viewElement) =>
        viewElement.hasClass('placeholder')
      )
    );

    this.editor.config.define('placeholderProps', {
      types: ['name', 'date']
    });

    this.editor.config.define('placeholderBrackets', {
      open: '{',
      close: '}'
    });
  }

  _defineSchema() {
    const {schema} = this.editor.model;

    schema.register('placeholder', {
      // Allow wherever text is allowed:
      allowWhere: '$text',

      // The placeholder will acts as an inline node:
      isInline: true,

      // The inline-widget is self-contained so cannot be split by the caret and can be selected:
      isObject: true,

      // The placeholder can have many types, like date, name, surname, etc:
      allowAttributes: ['name']
    });
  }

  _defineConverters() {
    const {conversion} = this.editor;
    const {config} = this.editor;

    conversion.for('upcast').elementToElement({
      view: {
        name: 'span',
        classes: ['placeholder']
      },
      model: (viewElement, writer) => {
        // Extract the 'name' from '{name}'.
        const name = viewElement
          .getChild(0)
          .data.slice(
            config.get('placeholderBrackets.open').length,
            0 - config.get('placeholderBrackets.close').length
          );

        const modelWriter = writer.writer || writer;

        return modelWriter.createElement('placeholder', {name});
      }
    });

    conversion.for('editingDowncast').elementToElement({
      model: 'placeholder',
      view: (modelItem, writer) => {
        const viewWriter = writer.writer || writer;

        const widgetElement = createPlaceholderView(modelItem, viewWriter);

        // Enable widget handling on placeholder element inside editing view.
        return toWidget(widgetElement, viewWriter);
      }
    });

    conversion.for('dataDowncast').elementToElement({
      model: 'placeholder',
      view: (modelItem, writer) => {
        const viewWriter = writer.writer || writer;

        return createPlaceholderView(modelItem, viewWriter);
      }
    });

    // Helper method for both downcast converters.
    function createPlaceholderView(modelItem, viewWriter) {
      const name = modelItem.getAttribute('name');

      const placeholderView = viewWriter.createContainerElement('span', {
        class: 'placeholder'
      });

      const innerText = viewWriter.createText(
        config.get('placeholderBrackets.open') +
          name +
          config.get('placeholderBrackets.close')
      );
      viewWriter.insert(
        viewWriter.createPositionAt(placeholderView, 0),
        innerText
      );

      return placeholderView;
    }
  }
}
