import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  loadAlbumData,
  albumToggleExpandCollapse,
  allToggleExpandCollapse
} from './albumDataActions';
import { Label } from 'semantic-ui-react';
import LoadingComponent from '../common/LoadingComponent';
import AlbumItem from './AlbumItem';
import ExpandCollapseButton from '../common/ExpandCollapseButton';

const mapState = state => ({
  loading: state.album.loading,
  loaded: state.album.loaded,
  albums: state.album.albums,
  allCollapsed: state.album.allCollapsed
});

const actions = {
  loadAlbumData,
  albumToggleExpandCollapse,
  allToggleExpandCollapse
};

const AlbumList = ({
  loadAlbumData,
  albumToggleExpandCollapse,
  allToggleExpandCollapse,
  loading,
  loaded,
  albums,
  allCollapsed
}) => {
  useEffect(() => {
    console.log('loading');
    loadAlbumData();
  }, [loadAlbumData]);

  const toggleExpandCollapse = album => {
    albumToggleExpandCollapse(album);
  };

  const toggleExpandCollapseAll = () => {
    allToggleExpandCollapse();
  };

  return (
    <Fragment>
      <Label basic>
        <b>Albums</b>
      </Label>
      <ExpandCollapseButton
        isCollapsed={allCollapsed}
        tooltipDesc='all'
        onClick={() => toggleExpandCollapseAll()}
      />
      {loading && <LoadingComponent />}
      {!loading && loaded && (
        <ul>
          {albums.map(album => {
            return (
              <AlbumItem
                key={`${album.band}${album.album}`}
                album={album}
                toggleExpandCollapse={toggleExpandCollapse}
              />
            );
          })}
        </ul>
      )}
    </Fragment>
  );
};

export default connect(mapState, actions)(AlbumList);
