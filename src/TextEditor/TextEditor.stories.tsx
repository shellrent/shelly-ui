import type { Meta, StoryObj } from '@storybook/react';
import TextEditor from './TextEditor';

const meta: Meta<typeof TextEditor> = {
	component: TextEditor,
};

export default meta;
type Story = StoryObj<typeof TextEditor>;

export const Default: Story = {
};