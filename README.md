# Krishna Hingu [online payment] integration demos

 This sample demonstrates how you can replace the sensitive data fields (credit card number) on your checkout form with a field (Flex Microform) hosted entirely on CyberSource servers. This field will accept and tokenize the customer's credit card information directly from their browser on a resource hosted by CyberSource, replacing that data with a secure PCI-compliant token. This can then be sent to your server along with the other non-PCI order data. This can help achieve PCI-DSS SAQ A level compliance for your application as even your client-side code does not contain a mechanism to handle the credit card information.


## Supported Integrations

**React + Node.js + Express** demos of the following client-side integrations are currently available in this repository:

## Requirements

Node.js 8.0+

## Installation

1. Clone this repo:

```
git clone https://github.com/
```

2. Navigate to the root directory and install dependencies:

```
yarn install
```

## Usage

1. Create a `./.env` file with your [API key](https://ebc2test.cybersource.com/ebc2/), [Client Key](https://ebc2test.cybersource.com/ebc2/) - Remember to add `http://localhost:8080` as an origin for client key, and merchant account name (all credentials are in string format):

```
MerchantId = 'testrest';
MerchantKeyId = '08c94330-f618-42a3-b09d-e1e43be5efda';
MerchantSecretKey = 'yBJxy6LjM2TmcPGu+GaJrHtkke25fPpUX+UY6/L/1tE=';

```

2. Build & Start the server:

This will create a React production build and start the express server

```
yarn run server
```

## Contributing

We commit all our new features directly into our GitHub repository. Feel free to request or suggest new features or code changes yourself as well!

## License

MIT license. For more information, see the **LICENSE** file in the root directory.

## Notice

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## Available Scripts

In the project directory, you can run:

### `npm run server-dev`

Runs the Express app in the development mode.<br />
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

The server will reload if you make edits.<br />

### `npm start`

Runs the React client side app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode for React client side.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm build`

Builds the React client side app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

### `npm eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
