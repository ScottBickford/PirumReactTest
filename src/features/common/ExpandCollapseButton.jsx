import React from 'react';
import { Button } from 'semantic-ui-react';

const ExpandCollapseButton = ({isCollapsed, onClick, tooltipDesc}) => {
  return (
    <Button
      className='expand-collapse'
      icon= {isCollapsed ? 'plus' : 'minus'}
      color={isCollapsed ? 'green' : 'red'}
      size='mini'
      title={`${isCollapsed ? 'Expand' : 'Collapse'} ${tooltipDesc}`}
      circular
      onClick={onClick}
    />
  );
};

export default ExpandCollapseButton;
