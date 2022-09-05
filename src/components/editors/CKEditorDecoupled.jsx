import React from 'react';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import DecoupledEditor from 'ckeditor5om/build/ckeditor';
import LoadingEditor from '@app/components/loadings/LoadingEditor';

const CKEditorOM = (props) => {
  const {EditorConfig, onChangeCB, PlaceHolderFields} = props;

  DecoupledEditor.defaultConfig.placeholderProps.types = PlaceHolderFields;

  return (
    <div
      className="CKEditorOM w-100 p-50 m-50"
      style={{
        // backgroundColor: 'lightgreen',
        width: '100% !important',
        // 'max-width': '100% !important',
        padding: 0,
        margin: 0
      }}
    >
      <div className="container">
        <div className="document-editor">
          <div className="document-editor__toolbar">&nbsp;</div>
          <div className="document-editor__editable-container">
            <div className="document-editor__editable">
              {/* align="center" */}
              {PlaceHolderFields?.length > 0 ? (
                <CKEditor
                  id={EditorConfig.id}
                  name={EditorConfig.name}
                  editor={DecoupledEditor}
                  data={EditorConfig.data}
                  readOnly={EditorConfig.readOnly}
                  onReady={(editorR) => {
                    // console.log('onReady: Editor is ready to use!', editorR);
                    // console.log(
                    //   'editorR.ui.view.toolbar.element:',
                    //   editorR.ui.view.toolbar.element
                    // );

                    const toolbarContainer = document.querySelector(
                      '.document-editor__toolbar'
                    );
                    toolbarContainer.innerHTML = '';

                    toolbarContainer.appendChild(
                      editorR.ui.view.toolbar.element
                    );

                    if (EditorConfig.readOnly.toLowerCase() === 'true') {
                      editorR.isReadOnly = true;
                    } else {
                      editorR.isReadOnly = false;
                    }
                  }}
                  onError={(error, {willEditorRestart}) => {
                    // console.log('error:', error);
                    if (willEditorRestart) {
                      // window.editor.ui.view.toolbar.element.remove();
                    }
                  }}
                  onChange={(event, editorC) => {
                    const data = editorC.getData();
                    onChangeCB({
                      name: EditorConfig.id,
                      value: data
                    });
                  }}
                />
              ) : (
                <LoadingEditor />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CKEditorOM;
