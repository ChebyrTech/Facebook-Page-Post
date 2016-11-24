import React, { PropTypes } from 'react';

class EmbeddedPhoto extends React.Component {
  render() {
    const photo = this.props.photo;
    const href = `https://www.facebook.com/${Config.FACEBOOK_PAGE_ID}/photos/${photo.id}`;
    const src = 'https://www.facebook.com/plugins/post.php?href=' + encodeURIComponent(href) + '&width=500';

    return (
      <div className="photo-item col-xs-6 col-md-3">
        <iframe src={src} width="262" height="262" style={{border: 'none', overflow: 'hidden'}} scrolling="no" frameborder="0" allowTransparency="true"></iframe>
      </div>
    );
  }
}

EmbeddedPhoto.propTypes = {
  photo: PropTypes.object.isRequired,
};

export default EmbeddedPhoto;
