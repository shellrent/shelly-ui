import type { Meta, StoryObj } from '@storybook/react';
import Tabs, { TabConfig } from './Tabs';
import React, { useMemo } from 'react';

const meta: Meta<typeof Tabs> = {
	tags: ['autodoc'],
	component: Tabs,
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
	render: (args) => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const tabs: TabConfig[] = useMemo(() => [
			{
				title: 'Tab 1',
				content: 'Tab 1 content'
			},
			{
				title: 'Tab 2',
				content: 'Tab 2 content'
			},
			{
				title: 'Tab 3',
				titleElement: <span className="text-error">Tab 3 element</span>,
				content: 'Tab 3 content'
			}
		], []);

		return <Tabs tabs={tabs}></Tabs>;
	}
};