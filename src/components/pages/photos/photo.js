import React from 'react';

export default class Photo extends React.Component {
  render() {
    var photo = this.props.photo;

    var src = photo.images[0].source;

    return (
      <div className="photo-item col-xs-6 col-md-3">
        <div className="thumbnail">
          <img src={src} alt="" />
          {photo.name ? <div className="caption">{photo.name}</div> : ''}
        </div>
      </div>
    );
  }
}
