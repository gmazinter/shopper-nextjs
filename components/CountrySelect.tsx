import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from './TextField';
import { countries as countriesFull } from '../consts';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { useAppState } from '../AppState';

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;
const countries = countriesFull.map(country => ({
	name: country.name,
	alpha2Code: country.alpha2Code,
}));

export default () => {
	const {
		state: { selectedCountries },
		dispatch,
	} = useAppState();

	return (
		<Autocomplete
			disablePortal
			value={selectedCountries}
			multiple={true}
			id='countries-multiple-select'
			options={countries}
			disableCloseOnSelect
			getOptionLabel={option => option.name}
			renderOption={(option, { selected }) => (
				<>
					<Checkbox
						icon={icon}
						checkedIcon={checkedIcon}
						style={{ marginRight: 8 }}
						checked={selected}
					/>
					{option.name}
				</>
			)}
			renderInput={params => (
				<TextField
					{...params}
					variant='outlined'
					// label='Select Countries'
					placeholder='search'
				/>
			)}
			onChange={(event: any, newValue: any) => {
				dispatch({
					type: 'setSelectedCountries',
					payload: newValue,
				});
			}}
		/>
	);
};
