# Light Messages Frontend

A web application frontend designed to serve [Light Messages Backend](https://github.com/abdelslam1997/light_messages_backend).

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Configuration](#environment-configuration)
- [Development](#development)
- [Production Build](#production-build)
- [License](#license)

## Prerequisites

Before you begin, ensure you have installed:
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/abdelslam1997/light_messages_frontend.git
    cd light_messages_frontend
    npm install
    ```

## Environment Configuration

Create a `.env` file in the project root and configure:
```bash
REACT_APP_API_BASE_URL=http://light-messages.local/api/v1
REACT_APP_WEBSOCKET_URL=ws://light-messages.local/ws
```
> Note: Replace `light-messages.local` with your backend URL

## Development

Start the development server:
```bash
npm run dev
```
Access the application at `http://localhost:5173`

## Production Build

Create a production build:
```bash
npm run build
```

## License

This project is licensed under the [MIT License](LICENSE).
