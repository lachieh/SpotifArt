import React from 'react';
import PropTypes from 'prop-types';
import TimeBar from './TimeBar';

function AlbumMeta(props) {
  const { title, album, artist, current, length } = props;
  return (
    <div>
      <h2>{title}</h2>
      <h3>{album}</h3>
      <h3>{artist}</h3>
      <TimeBar current={current} total={length} />
    </div>
  );
}

AlbumMeta.propTypes = {
  title: PropTypes.string.isRequired,
  album: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  current: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired,
};

export default AlbumMeta;
