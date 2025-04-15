import React from 'react';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import SettingsIcon from '@mui/icons-material/Settings';
// import DeleteIcon from '@mui/icons-material/Delete';

function onSettingsClick() {
	alert('clicked settings button');
}

export default function IconButtons() {
	return (
		<Stack direction="row" spacing={1}>
			<IconButton onClick={onSettingsClick} aria-label="settings">
				<SettingsIcon />
			</IconButton>
		</Stack>
	);
}

