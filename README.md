# Quiz Test App

A simple quiz app displays a list of questions fetched from a REST API and allows the user to choose the answers. The application is built using Vite, React, TypeScript, TailwindCSS and Shadcn UI. In addition, other libs are used for other purpose

- React-query: to handle request calling to API
- Zustand: small, fast and scalable bearbones state-management solution using simplified flux principles. Has a comfy API based on hooks, isn't boilerplatey or opinionate
- React-router: Implement client-side routing to navigate between the quiz and results pages.
- Unit test with Vitest and coverage with C8

## Demo Webapp Link with mock data

https://demo-quizapp.netlify.app/

## Project Screen Shot(s)

![Quiz App](https://i.imgur.com/8ZsyCle.png)

Unit Test Result
![Unit Test Result](https://i.imgur.com/g2OMhUR.png)

Code Coverage
![Code Coverage](https://i.imgur.com/mRUMH8e.png)

## Installation and Setup Instructions

Clone down this repository. You will need `node` and `npm` installed globally on your machine.

Add local file .env and set API URL same as this example

```
VITE_APP_API_URL=https://5a431354-f52c-4a39-ae1b-a2ae9363e31c.mock.pstmn.io
```

If using token to connect REST API, please add token to localStorage.
This is a simple approach to use of a Bearer token.
For more information, please have a look a file apiHelper.ts

```
export const axiosApiInstance = axios.create({
  baseURL: String(VITE_APP_API_URL),
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
```

Installation:

`npm install`

To run unit test suite:

`npm run test`

To run test coverage:

`npm run coverage`

To start local dev server:

`npm run dev`

To visit app in localhost:

`http://localhost:3333`

To bundle or build project for deployment:

`npm run build`
