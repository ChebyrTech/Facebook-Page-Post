import React, { PropTypes } from 'react';

export default class Photo extends React.Component {
    render() {
        const photo = this.props.photo;
        const src = photo.images[0].source;

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

Photo.propTypes = {
    photo: PropTypes.object.isRequired,
};
