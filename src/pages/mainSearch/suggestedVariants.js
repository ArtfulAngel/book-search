import React from 'react';
import { MenuItem } from 'material-ui/Menu';

export default function SuggestedVariants(params) {
  const {
    suggestion,
    index,
    itemProps,
    highlightedIndex,
    selectedItem,
  } = params;
  const isHighlighted = highlightedIndex === index;
  const isSelected = selectedItem === suggestion.title;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.title}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
    >
      {suggestion.title}
    </MenuItem>
  );
}
