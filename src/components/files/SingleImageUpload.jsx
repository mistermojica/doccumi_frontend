/* eslint-disable no-console */

import React, {Component} from 'react';

export default class SingleImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null
    };
    this.uploadSingleFile = this.uploadSingleFile.bind(this);
    this.upload = this.upload.bind(this);
  }

  uploadSingleFile(e) {
    this.setState({
      file: URL.createObjectURL(e.target.files[0])
    });
  }

  upload(e) {
    e.preventDefault();
    const {file} = this.state;
    // console.log(file);
  }

  render() {
    let imgPreview;
    const {file} = this.state;
    if (file) {
      imgPreview = <img src={file} alt="" />;
    }
    return (
      <form>
        <div className="form-group preview">{imgPreview}</div>

        <div className="form-group">
          <input
            type="file"
            className="form-control"
            onChange={this.uploadSingleFile}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary btn-block"
          onClick={this.upload}
        >
          Upload
        </button>
      </form>
    );
  }
}
