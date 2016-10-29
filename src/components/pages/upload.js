import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as G from '../../actions/general';
import * as P from '../../actions/photos';
import { Modal, Button, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

class Upload extends React.Component {

  hide = () => {
    this.props.dispatch(G.uploadHide());
  };

  upload = () => {
    const file = ReactDOM.findDOMNode(this.refs.photo).files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        var contents = e.target.result;
        // Fire Action
        this.props.dispatch(P.upload({
          image: new Blob([contents], { type: file.type }),
          description: ReactDOM.findDOMNode(this.refs.description).value || '',
        }));

      }.bind(this);
      reader.readAsArrayBuffer(file);
    }
  };

  render() {
    return (
      <Modal show={this.props.show} onHide={this.hide}>
        <Modal.Header>
          <Modal.Title>New Photo</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <FormGroup controlId="formControlsPhoto">
            <ControlLabel>Photo</ControlLabel>
            <FormControl type="file" ref="photo" inputRef={ref => { this.input = ref; }} />
            <HelpBlock>Selet a photo</HelpBlock>
          </FormGroup>
          <FormGroup controlId="formControlsTextarea">
            <ControlLabel>Description</ControlLabel>
            <FormControl componentClass="textarea" ref="description" />
          </FormGroup>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.hide}>Close</Button>
          <Button bsStyle="primary" onClick={this.upload}>Upload</Button>
        </Modal.Footer>

      </Modal>
    );
  }
}


Upload.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    show: state.general.uploadShow,
  };
}

export default connect(mapStateToProps)(Upload);
