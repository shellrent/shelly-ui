import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Menu from './Menu';

const meta: Meta<typeof Menu> = {
	tags: ['autodoc'],
	component: Menu,
};

export default meta;
type Story = StoryObj<typeof Menu>;

export const Default: Story = {
	args: {
		title: 'Test',
	},
	render: (args) => {
		const [open, setOpen] = React.useState<int>();

		return <Menu {...args}>
			<Menu.CollapsibleItem title='collapsible 1' open={open === 1} onToggle={(isOpen) => {
				isOpen ? setOpen(1) : null;
			}}>
				<Menu.Item>
					Test 1
				</Menu.Item>

				<Menu.Item>
					Test 2
				</Menu.Item>
			</Menu.CollapsibleItem>
			<Menu.CollapsibleItem title='collapsible 2' open={open === 2} onToggle={(isOpen) => {
				isOpen ? setOpen(2) : null;
			}}>
				<Menu.Item>
					Test 1
				</Menu.Item>

				<Menu.Item>
					Test 2
				</Menu.Item>
			</Menu.CollapsibleItem>
		</Menu>;
	}
};