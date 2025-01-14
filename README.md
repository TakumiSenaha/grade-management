# Grade Management

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). It has been extended to support desktop deployment using [NW.js](https://nwjs.io/).

## Getting Started

### Development Mode

To run the application in development mode:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

You can edit the page by modifying files in the `src` directory. The application auto-updates as you edit the files.

### Database Initialization

Before running the application, initialize the SQLite database:

```bash
npm run setup-db
```

This will create the necessary database structure and populate initial data.

### API

[API routes](https://nextjs.org/docs/api-routes/introduction) are used for database interactions. The main API endpoint is accessible at:

- [http://localhost:3000/api/classes](http://localhost:3000/api/classes)

This endpoint supports querying class data.

## Desktop Deployment

This application has been converted into a desktop application using NW.js. Follow these steps to build and run the desktop version:

1. Build the application:

   ```bash
   npm run build
   ```

2. Start the NW.js application:

   ```bash
   npm start
   ```

   This will start both the local API server and the NW.js application.

### NW.js Advantages

Using NW.js provides several benefits compared to other frameworks like Electron:

- **Integrated Web and Node.js Context**: NW.js allows direct integration of Node.js modules within the browser context, enabling seamless communication between the frontend and backend.
- **Simplified Setup**: NW.js requires less boilerplate compared to Electron, making it easier to set up and maintain.
- **Lightweight**: Applications built with NW.js are generally smaller in size compared to Electron-based apps.
- **Native Windowing Support**: NW.js leverages Chromium's native windowing system, ensuring consistent UI behavior across platforms.
- **Single Codebase**: Existing web applications can be converted to desktop apps without major changes to the project structure.

## Learn More

To learn more about Next.js and NW.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and APIs.
- [NW.js Documentation](https://docs.nwjs.io/) - Learn how to develop and configure NW.js applications.

## Deployment on Vercel

Although this application is optimized for desktop use, it can also be deployed as a web application. The easiest way to deploy is by using the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Commands Overview

### Development and Setup

- **Install dependencies**: `npm install`
- **Initialize database**: `npm run setup-db`
- **Start development mode**: `npm run dev`

### Build and Deploy

- **Build static files**: `npm run build`
- **Run the application**: `npm start`

### SQLite Commands

- **List tables**: `.tables`
- **View data**: `SELECT * FROM <table_name> LIMIT <n>;`

Replace `<table_name>` with the name of your table and `<n>` with the number of rows to view.
