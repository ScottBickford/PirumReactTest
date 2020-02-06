import React from 'react';
import ExpandCollapseButton from '../common/ExpandCollapseButton';
import SongItem from './SongItem';

const AlbumItem = ({ album, toggleExpandCollapse }) => {
  return (
    <li>
      {album.band} - {album.album}
      <ExpandCollapseButton isCollapsed={album.collapsed} tooltipDesc='album' onClick={(e) => toggleExpandCollapse(album)} />
      {!album.collapsed && (
        <ul>
          {album.songs.map(song => {
            return <SongItem key={song} song={song} />;
          })}
        </ul>
      )}
    </li>
  );
};

export default AlbumItem;
