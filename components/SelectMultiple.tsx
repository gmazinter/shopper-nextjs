import React from 'react';
import { Select, Input, Chip, MenuItem } from '@material-ui/core';
import styled from 'styled-components';
import { space, SpaceProps } from 'styled-system';
import { useAppState } from '../AppState';
import { countries } from '../consts';
import _ from 'lodash';

type Country = {
	name: string;
	alpha2Code: string;
};

type SelectMultipleProps = {
	className?: string;
} & SpaceProps;

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

const SelectMultiple: React.FC<SelectMultipleProps> = ({ className }) => {
	const {
		state: { selectedCountries },
		dispatch,
	} = useAppState();

	return (
		<Select
			className={className}
			id='multiple-country-select'
			multiple
			value={selectedCountries}
			onChange={e =>
				dispatch({
					type: 'setSelectedCountries',
					payload: e.target.value,
				})
			}
			input={<Input id='select-multiple-chip' />}
			renderValue={selectedCountries => (
				<div>
					{countries
						.filter(item =>
							_.includes(
								selectedCountries as string[],
								item.alpha2Code
							)
						)
						.map(country => (
							<Chip
								key={country.alpha2Code}
								label={country.name}
							/>
						))}
				</div>
			)}
			MenuProps={MenuProps}
		>
			{countries.map(country => {
				const { name, alpha2Code } = country;
				return (
					<MenuItem key={alpha2Code} value={alpha2Code}>
						{name}
					</MenuItem>
				);
			})}
		</Select>
	);
};

export default styled(SelectMultiple)`
	${space}
`;
