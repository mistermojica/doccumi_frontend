import React from 'react';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const CKEditorOM = (props) => {
  const {EditorConfig, onChangeCB} = props;

  console.log('ClassicEditor -> EditorConfig:', EditorConfig);

  return (
    <div className="CKEditorOM">
      <CKEditor
        id={EditorConfig.id}
        name={EditorConfig.name}
        editor={ClassicEditor}
        data={EditorConfig.data}
        readOnly={EditorConfig.readOnly}
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          console.log('Editor is ready to use!', editor);
        }}
        // onChange={(e) => onChangeLocal(e.target)}
        onChange={(event, editor) => {
          const data = editor.getData();
          onChangeCB({name: EditorConfig.id, value: data});
          // console.log({event, editorFieldId, data});
        }}
        onBlur={(event, editor) => {
          console.log('Blur.', editor);
        }}
        onFocus={(event, editor) => {
          console.log('Focus.', editor);
        }}
      />
    </div>
  );
};

export default CKEditorOM;
