import type { Meta, StoryObj } from '@storybook/react';
import Modal from './Modal';
import { useModal } from './useModal';
import Button from '../Button';
import React from 'react';

const meta: Meta<typeof Modal> = {
	tags: ['autodocs'],
	component: Modal,
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
	render: () => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const modal = useModal();
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const modal2 = useModal();

		return <div>
			<Button onClick={() => modal.open()}>Open</Button>
			<Modal modal={modal}>
				<Modal.Title>Test</Modal.Title>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
					molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
					numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
					optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
					obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
					nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
					tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
					quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos 
					sapiente officiis modi at sunt excepturi expedita sint?

					Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
					molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
					numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
					optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
					obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
					nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
					tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
					quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos 
					sapiente officiis modi at sunt excepturi expedita sint?
				</p>                
				<Modal.Actions>
					<Button onClick={ () => modal2.open() }> Open2 </Button>
					<Button onClick={() => modal.close()}>Close</Button>
				</Modal.Actions>
			</Modal>

			<Modal modal={modal2}>
				<Modal.Title>
					TEst2
				</Modal.Title>
				<Modal.Actions>
					<Button onClick={() => modal2.close()}> Close </Button>
				</Modal.Actions>
			</Modal>
		</div>;
	}
};