import React from 'react';
import PropTypes from 'prop-types';

const AlbumCover = props => {
  const { albumId, albumImg } = props;
  return (
    <div className="AlbumCover" data-id={albumId}>
      <img src={albumImg} alt="" />
    </div>
  );
};

AlbumCover.propTypes = {
  albumId: PropTypes.string,
  albumImg: PropTypes.string,
};

AlbumCover.defaultProps = {
  albumId: 0,
  albumImg: '/public/img/defaultalbum.jpg',
};

export default AlbumCover;
