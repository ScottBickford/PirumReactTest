import React from 'react';
import AlbumList from './features/album/AlbumList';
import { Container } from 'semantic-ui-react';

function App() {
  return (
    <Container style={{padding:4}}>
      <AlbumList />
    </Container>
  );
}

export default App;
