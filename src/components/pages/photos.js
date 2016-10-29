import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as P from '../../actions/photos';
import * as G from '../../actions/general';
import Photo from './photos/photo';
import Masonry from 'react-masonry-component';
import Upload from './upload';

class Photos extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filterText: ''
    };
  }

  refresh = (e) => {
    e.preventDefault();
    this.props.dispatch(P.loadPhotos());
  };

  upload = (e) => {
    e.preventDefault();
    this.props.dispatch(G.uploadShow());

  };

  filter = (e) => {
    e.preventDefault();
    this.setState({filterText: this.refs.filter.value})
  };

  componentDidMount() {
    this.props.dispatch(P.loadPhotos());
  }

  renderPhotos() {
    const photos = this.props.photos.filter((photo) => {
      return ! this.state.filterText
        || (photo.name && photo.name.toLowerCase().indexOf(this.state.filterText.toLowerCase()) !== -1);
    });

    if ( ! photos.length) {
      return (<div className="col-xs-12">No photos</div>);
    }

    return photos.map((photo) => {
      return <Photo photo={photo} key={photo.id} />;
    });
  }

  render() {
    return (
      <div>
        <h1>Photos</h1>
        <hr/>
        <div className="row">
          <div className="col-sm-4">
            <a href="#" className="btn btn-default" onClick={this.refresh}>Refresh</a>
          </div>
          <div className="col-sm-4 text-center">
            <div className="form-inline">
              <div className="form-group">
                <div className="input-group">
                  <input type="text" ref="filter" className="form-control" />
                  <span className="input-group-btn">
                <a href="#" className="btn btn-default" onClick={this.filter}>Filter</a>
              </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-4 text-right">
            <a href="#" className="btn btn-primary" onClick={this.upload}>Upload</a>
          </div>
        </div>

        <hr/>
        <Masonry
          className={'row'} // default ''
          disableImagesLoaded={false} // default false
          updateOnEachImageLoad={true} // default false and works only if disableImagesLoaded is false
        >
        {this.renderPhotos()}
        </Masonry>
        <Upload />
      </div>
    );
  }
}

Photos.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    photos: state.photos.photos
  };
}

export default connect(mapStateToProps)(Photos);
