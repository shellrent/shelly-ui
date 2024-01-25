import type { Meta, StoryObj } from '@storybook/react';
import FileUpload from './FileUpload';


const meta: Meta<typeof FileUpload> = {
    tags: ['autodocs'],
    component: FileUpload,
    argTypes: {
        error: {
            type: 'string'
        }
    }
};

export default meta;
type Story = StoryObj<typeof FileUpload>;

export const Default: Story = {
    
};