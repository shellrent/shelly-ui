import type { Meta, StoryObj } from '@storybook/react';
import Tooltip from './Tooltip';
import Button from '../Button';
import React from 'react';

const meta: Meta<typeof Tooltip> = {
	tags: ['autodoc'],
	component: Tooltip,
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
	args: {
		title: 'Test',
		orientation: 'bottom',
		forceOpen: true
	},
	render: (args) => {
		return <Tooltip {...args}>
			<Button>
				Test
			</Button>
		</Tooltip>;
	}
};