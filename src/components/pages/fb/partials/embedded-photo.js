import React, { PropTypes } from 'react';

class EmbeddedPhoto extends React.Component
{
    render()
    {
        const photo = this.props.photo;
        const href = 'https://www.facebook.com/${Config.FACEBOOK_PAGE_ID}/photos/${photo.id}';

        return (
            <div className="photo-item col-xs-6 col-md-3">
                <div className="embed-responsive embed-responsive-1by1">
                    <div className="fb-post" data-href={href}></div>
                </div>
            </div>
        );
    }
}

EmbeddedPhoto.propTypes = {
    photo: PropTypes.object.isRequired,
};

export default EmbeddedPhoto;
