# Production
https://react-my-burger-9bc2d.web.app/
## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### Deployment
 `yarn build`
 `firebase deploy`

### Config rules firebase
```
{
  "rules": {
  	"ingredients": {
      ".read": "true",
      ".write": "true",
    },
    "orders": {
      ".read": "auth !== null",
      ".write": "auth !== null",
      ".indexOn": ["userId"]
  	}
  }
}
```
