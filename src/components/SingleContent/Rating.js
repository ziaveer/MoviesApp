import React from 'react';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';

import StarRateIcon from "@material-ui/icons/StarRate";

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);

export default function Rating(props) {
  return (
    
      <StyledBadge badgeContent={props.rating} color="secondary">
      <StarRateIcon />    
      </StyledBadge>
    
  );
}