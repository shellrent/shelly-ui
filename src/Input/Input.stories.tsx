import type { Meta, StoryObj } from '@storybook/react';
import Input from './Input';

const meta: Meta<typeof Input> = {
    tags: ['autodoc'],
    argTypes: {
        placeholder: {
            type: 'string',
            defaultValue: 'Test'
        },
        onValueChange: {
            type: 'function'
        },
        error: {
            type: 'string'
        }
    },
    component: Input,
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
};