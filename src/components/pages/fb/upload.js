import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import FacebookActions from 'store/actions/facebook';
import { Modal, Button, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Upload extends React.Component
{
    upload()
    {
        const file = ReactDOM.findDOMNode(this.refs.photo).files[0];
        const description = ReactDOM.findDOMNode(this.refs.description).value || '';
        if (file)
        {
            const reader = new FileReader();
            reader.onload = (e) =>
            {
                const contents = e.target.result;
                // Fire Action
                FacebookActions.fbUploadPhoto({
                    image: new Blob([contents], { type: file.type }),
                    description,
                });
            };
            reader.readAsArrayBuffer(file);
        }
    }

    render()
    {
        return (
            <Modal show={this.props.show} onHide={FacebookActions.fbUploadHide() }>
                <Modal.Header>
                    <Modal.Title>New Photo</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <FormGroup controlId="formControlsPhoto">
                        <ControlLabel>Photo</ControlLabel>
                        <FormControl type="file" ref="photo" inputRef={ref => { this.input = ref; } } />
                        <HelpBlock>Selet a photo</HelpBlock>
                    </FormGroup>
                    <FormGroup controlId="formControlsTextarea">
                        <ControlLabel>Description</ControlLabel>
                        <FormControl componentClass="textarea" ref="description" />
                    </FormGroup>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={FacebookActions.fbUploadHide() }>Close</Button>
                    <Button bsStyle="primary" onClick={this.upload}>Upload</Button>
                </Modal.Footer>

            </Modal>
        );
    }
}

Upload.propTypes = {
    dispatch: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
};

function mapStateToProps(state)
{
    return {};
}

function mapActionCreatorsToProps(dispatch)
{
    return bindActionCreators(FacebookActions, dispatch);
}

export default connect(mapStateToProps, mapActionCreatorsToProps)(Upload);
