import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import Heading from "@ckeditor/ckeditor5-heading/src/heading";
import List from "@ckeditor/ckeditor5-list/src/list";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough';
import Code from '@ckeditor/ckeditor5-basic-styles/src/code';
import Subscript from '@ckeditor/ckeditor5-basic-styles/src/subscript';
import Superscript from '@ckeditor/ckeditor5-basic-styles/src/superscript';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import PageBreak from '@ckeditor/ckeditor5-page-break/src/pagebreak';
import Undo from "@ckeditor/ckeditor5-undo/src/undo";
import Redo from "@ckeditor/ckeditor5-undo/src/redocommand";
import Font from "@ckeditor/ckeditor5-font/src/font";
import Clipboard from "@ckeditor/ckeditor5-clipboard/src/clipboard";
import FindAndReplace from '@ckeditor/ckeditor5-find-and-replace/src/findandreplace';
import HorizontalLine from '@ckeditor/ckeditor5-horizontal-line/src/horizontalline';
import CodeBlock from '@ckeditor/ckeditor5-code-block/src/codeblock';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import Indent from '@ckeditor/ckeditor5-indent/src/indent';
import IndentBlock from '@ckeditor/ckeditor5-indent/src/indentblock';
import Highlight from '@ckeditor/ckeditor5-highlight/src/highlight';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import ImageBlock from '@ckeditor/ckeditor5-image/src/imageblock';
import ImageInsert from '@ckeditor/ckeditor5-image/src/imageinsert';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import TableProperties from '@ckeditor/ckeditor5-table/src/tableproperties';
import TableCellProperties from '@ckeditor/ckeditor5-table/src/tablecellproperties';
import TableCaption from '@ckeditor/ckeditor5-table/src/tablecaption';

import Placeholder from "ckeditor5-placeholder";

import "../styles/index.css";

const placeHolderFields = [
  "No. de Registro y Placa", "Chasis", "Status del Vehículo", "Tipo de Emisión",
  "Tipo de Vehículo", "Año de Fabricación", "Marca", "Modelo", "Color", "Precio", "Costo",
  "Cédula o Pasaporte", "Nombre Completo", "Dirección", "Ciudad", "Sector", "País", "Nacionalidad",
].sort();

const customColorPalette = [
  {color: '#000000', label: 'Black'},
  {color: '#434343', label: 'Dark Gray 4'},
  {color: '#666666', label: 'Dark Gray 3'},
  {color: '#999999', label: 'Dark Gray 2'},
  {color: '#b7b7b7', label: 'Dark Gray 1'},
  {color: '#cccccc', label: 'Gray'},
  {color: '#d9d9d9', label: 'Light Gray 1'},
  {color: '#efefef', label: 'Light Gray 2'},
  {color: '#f3f3f3', label: 'Light Gray 3'},
  {color: '#ffffff', label: 'White'},
  {color: '#980000', label: 'Red Berry'},
  {color: '#ff0000', label: 'Red'},
  {color: '#ff9900', label: 'Orange'},
  {color: '#ffff00', label: 'Yellow'},
  {color: '#00ff00', label: 'Green'},
  {color: '#00ffff', label: 'Cyan'},
  {color: '#4a86e8', label: 'Cornflower Blue'},
  {color: '#0000ff', label: 'Blue'},
  {color: '#9900ff', label: 'Purple'},
  {color: '#ff00ff', label: 'Magenta'},
  {color: '#e6b8af', label: 'Light Red Berry 3'},
  {color: '#f4cccc', label: 'Light Red 3'},
  {color: '#fce5cd', label: 'Light Orange 3'},
  {color: '#fff2cc', label: 'Light Yellow 3'},
  {color: '#d9ead3', label: 'Light Green 3'},
  {color: '#d0e0e3', label: 'Light Cyan 3'},
  {color: '#c9daf8', label: 'Light Cornflower Blue 3'},
  {color: '#cfe2f3', label: 'Light Blue 3'},
  {color: '#d9d2e9', label: 'Light Purple 3'},
  {color: '#ead1dc', label: 'Light Magenta 3'},
  {color: '#dd7e6b', label: 'Light Red Berry 2'},
  {color: '#ea9999', label: 'Light Red 2'},
  {color: '#f9cb9c', label: 'Light Orange 2'},
  {color: '#ffe599', label: 'Light Yellow 2'},
  {color: '#b6d7a8', label: 'Light Green 2'},
  {color: '#a2c4c9', label: 'Light Cyan 2'},
  {color: '#a4c2f4', label: 'Light Cornflower Blue 2'},
  {color: '#9fc5e8', label: 'Light Blue 2'},
  {color: '#b4a7d6', label: 'Light Purple 2'},
  {color: '#d5a6bd', label: 'Light Magenta 2'},
  {color: '#cc4125', label: 'Light Red Berry 1'},
  {color: '#e06666', label: 'Light Red 1'},
  {color: '#f6b26b', label: 'Light Orange 1'},
  {color: '#ffd966', label: 'Light Yellow 1'},
  {color: '#93c47d', label: 'Light Green 1'},
  {color: '#76a5af', label: 'Light Cyan 1'},
  {color: '#6d9eeb', label: 'Light Cornflower Blue 1'},
  {color: '#6fa8dc', label: 'Light Blue 1'},
  {color: '#8e7cc3', label: 'Light Purple 1'},
  {color: '#c27ba0', label: 'Light Magenta 1'},
  {color: '#a61c00', label: 'Dark Red Berry 1'},
  {color: '#cc0000', label: 'Dark Red 1'},
  {color: '#e69138', label: 'Dark Orange 1'},
  {color: '#f1c232', label: 'Dark Yellow 1'},
  {color: '#6aa84f', label: 'Dark Green 1'},
  {color: '#45818e', label: 'Dark Cyan 1'},
  {color: '#3c78d8', label: 'Dark Cornflower Blue 1'},
  {color: '#3d85c6', label: 'Dark Blue 1'},
  {color: '#674ea7', label: 'Dark Purple 1'},
  {color: '#a64d79', label: 'Dark Magenta 1'},
  {color: '#85200c', label: 'Dark Red Berry 2'},
  {color: '#990000', label: 'Dark Red 2'},
  {color: '#b45f06', label: 'Dark Orange 2'},
  {color: '#bf9000', label: 'Dark Yellow 2'},
  {color: '#38761d', label: 'Dark Green 2'},
  {color: '#134f5c', label: 'Dark Cyan 2'},
  {color: '#1155cc', label: 'Dark Cornflower Blue 2'},
  {color: '#0b5394', label: 'Dark Blue 2'},
  {color: '#351c75', label: 'Dark Purple 2'},
  {color: '#741b47', label: 'Dark Magenta 2'},
  {color: '#5b0f00', label: 'Dark Red Berry 3'},
  {color: '#660000', label: 'Dark Red 3'},
  {color: '#783f04', label: 'Dark Orange 3'},
  {color: '#7f6000', label: 'Dark Yellow 3'},
  {color: '#274e13', label: 'Dark Green 3'},
  {color: '#0c343d', label: 'Dark Cyan 3'},
  {color: '#1c4587', label: 'Dark Cornflower Blue 3'},
  {color: '#073763', label: 'Dark Blue 3'},
  {color: '#20124d', label: 'Dark Purple 3'},
  {color: '#4c1130', label: 'Dark Magenta 3'}
]

ClassicEditor.create(document.querySelector("#editor"), {
  plugins: [
    Essentials, Paragraph, Heading, List, Bold, Italic, 
    Alignment, PageBreak, Undo, Redo,
    Font, Clipboard, FindAndReplace, HorizontalLine, 
    Underline, Strikethrough, 
    Code, CodeBlock, BlockQuote, Highlight, 
    Subscript, Superscript, Indent, IndentBlock, 
    Autoformat, ImageBlock, ImageInsert,
    Table, TableToolbar, TableProperties, TableCellProperties, TableCaption, 
    Placeholder
  ],
  toolbar: {
    items: [
      "placeholder", "heading", "bold", "italic", "alignment", 'underline', 
      'strikethrough', 
      'code', 
      'subscript', 'superscript',
      "numberedList", "bulletedList",
      '|',
      'pageBreak',
      '|',
      'insertTable', 'undo', 'redo', 'clipboard',
      '|',
      'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor',
      '|',
      'findAndReplace', 'horizontalLine', 'codeBlock', 'blockQuote', 'outdent', 'indent', 
      'highlight', 'insertImage'
    ],
    shouldNotGroupWhenFull: true
  },
  placeholderProps: {
    types: placeHolderFields,
  },
  placeholderBrackets: {
    open: "{",
    close: "}",
  },
  fontFamily: {
    supportAllValues: true
  },
  fontSize: {
    options: [
        9, 11, 13, 'default', 17, 19, 21, 23, 25
    ],
    supportAllValues: true
  },
  codeBlock: {
    languages: [
      { language: 'plaintext', label: 'Plain text' }, // The default language.
      { language: 'c', label: 'C' },
      { language: 'cs', label: 'C#' },
      { language: 'cpp', label: 'C++' },
      { language: 'css', label: 'CSS' },
      { language: 'diff', label: 'Diff' },
      { language: 'html', label: 'HTML' },
      { language: 'java', label: 'Java' },
      { language: 'javascript', label: 'JavaScript', class: 'js javascript js-code' },
      { language: 'php', label: 'PHP', class: 'php-code' },
      { language: 'python', label: 'Python' },
      { language: 'ruby', label: 'Ruby' },
      { language: 'typescript', label: 'TypeScript' },
      { language: 'xml', label: 'XML' }
    ]
  },
  highlight: { 
    options: [
      { model: 'yellowMarker', class: 'marker-yellow', title: 'Yellow Marker', color: 'var(--ck-highlight-marker-yellow)', type: 'marker' },
      { model: 'greenMarker', class: 'marker-green', title: 'Green marker', color: 'var(--ck-highlight-marker-green)', type: 'marker' },
      { model: 'pinkMarker', class: 'marker-pink', title: 'Pink marker', color: 'var(--ck-highlight-marker-pink)', type: 'marker' },
      { model: 'blueMarker', class: 'marker-blue', title: 'Blue marker', color: 'var(--ck-highlight-marker-blue)', type: 'marker' },
      { model: 'redPen', class: 'pen-red', title: 'Red pen', color: 'var(--ck-highlight-pen-red)', type: 'pen' },
      { model: 'greenPen', class: 'pen-green', title: 'Green pen', color: 'var(--ck-highlight-pen-green)', type: 'pen' }
    ]
  },
  table: {
    contentToolbar: [
      'tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties', 'toggleTableCaption'
    ],
    tableProperties: {
      borderColors: customColorPalette,
      backgroundColors: customColorPalette
    },
    tableCellProperties: {
        borderColors: customColorPalette,
        backgroundColors: customColorPalette
    }
  },
  // exportWord: {
  //   tokenUrl: 'https://example.com/cs-token-endpoint',
  //   fileName: 'my-file.docx',
  //   converterOptions: {
  //       format: 'A4', // Default value, you don't need to specify it explicitly for A4.
  //       margin_top: '20mm',
  //       margin_bottom: '20mm',
  //       margin_right: '12mm',
  //       margin_left: '12mm'
  //   }
  // }
})
  .then(editor => {
    console.log("Editor was initialized", editor);
  })
  .catch(error => {
    console.error(error.stack);
  });
