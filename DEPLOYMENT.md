# Project Deployment Guide

This guide provides step-by-step instructions on how to build and deploy this Next.js project to Firebase App Hosting.

## Prerequisites

1.  **Node.js:** Ensure you have Node.js (version 18 or later) installed on your machine.
2.  **Firebase Account:** You need a Firebase account. You can create one for free at [firebase.google.com](https://firebase.google.com).
3.  **Firebase Project:** Your application should be connected to a Firebase project.

## Build and Deployment Steps

The build and deployment process is streamlined using the Firebase CLI (Command Line Interface).

### Step 1: Install the Firebase CLI

If you haven't already installed the Firebase CLI, open your terminal and run the following command. This only needs to be done once.

```bash
npm install -g firebase-tools
```

### Step 2: Log in to Firebase

Next, authenticate your machine with your Firebase account. Run this command and follow the prompts in your web browser:

```bash
firebase login
```

### Step 3: Deploy the Project

Navigate to the root directory of your project in the terminal. Then, run the single command to deploy your application:

```bash
firebase deploy
```

### What Happens During Deployment?

When you run `firebase deploy`, the Firebase CLI automatically handles the entire build and release process:

1.  **Build:** It detects that this is a Next.js project and runs the `npm run build` command. This compiles your TypeScript/React code, optimizes assets (like images and CSS), and prepares the application for production. The output is stored in a hidden `.next` directory.
2.  **Package:** It packages your built application.
3.  **Deploy:** It uploads the package to Firebase App Hosting and releases it to be served on Firebase's global network.

Once the deployment is complete, the terminal will display the live URL where your application can be accessed.

That's it! Your project is configured to make deployment a simple, one-command process.
