# Shelly-UI
![Logo Shelly UI](https://github.com/shellrent/shelly-ui/assets/55100464/6e704b64-b959-4e8e-8f2f-bbd8d75a8d5a)


Shelly-UI is a lightweight and flexible component library developed by Shellret. This library is built entirely in TypeScript and leverages modern web development technologies such as Tailwind CSS, DaisyUI, and Headless UI to provide a powerful and easy-to-use solution for building user interfaces.

## Installation

To install Shelly-UI in your project, run the following command:

```bash
npm install @shellrent/shelly-ui
# or
yarn add @shellrent/shelly-ui
```

### Configuration

1. Make shure you have installed https://tailwindcss.com/
2. Edit the `tailwind.config.js` including shelly-ui files:

```js
/** @type {import('tailwindcss').Config} */

export default {
	content: [
    // ...
		"./node_modules/shelly-ui/dist/**/*.{js,jsx,ts,tsx}"
	],
  // ...
	plugins: [require("daisyui")],
}
```

3. To enable all the features of shelly wrap your application with `ShellyProvider`>

```tsx
import React, { Suspense } from "react";
import { ShellyConfig, ShellyProvider } from '@shellrent/shelly-ui';
import Spinner from "./common/components/Spinner";
import App from "./App";

const config: ShellyConfig = {
	// ...your configuration
};

const Root: React.FC = () => {
	return <>
		<Suspense fallback={<Spinner />}>
			<ShellyProvider config={config}>
				<App/>
			</ShellyProvider>
		</Suspense >
	</>;
};

export default Root;
```

## Usage
Import the desired components into your TypeScript application and start using them:

```tsx
import { Button, Alert } from '@shellrent/shelly-ui';

// Use the components as needed
const MyComponent = () => {
  return (
    <div>
      <Button>Click me</Button>
      <Alert type="success">Operation completed successfully!</Alert>
    </div>
  );
};
```
