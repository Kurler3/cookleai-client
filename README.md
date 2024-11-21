# Cookle AI - Frontend

## Project Overview

Cookle AI is an innovative web application that allows users to create personalized recipes, manage cookbooks, and control permissions for both recipes and cookbooks. Powered by the Gemini API, Cookle AI leverages advanced AI to assist in recipe creation and recommendations.

The frontend is built using React, TypeScript, and Vite for a modern and optimized development experience. The app includes features such as interactive UI components, personalized recipe creation, and flexible cookbook management.

## Features

* AI-Powered Recipe Creation: Create personalized recipes using AI powered by the Gemini API.
* Cookbook Management: Organize recipes into cookbooks, with advanced permission management.
* Permissions Control: Set permissions for both recipes and cookbooks, ensuring only authorized users can access or modify them.
* Responsive Design: The app is fully responsive, ensuring a smooth experience on all devices from mobile to desktop.
* Technologies Used
    * React: JavaScript library for building user interfaces.
    * TypeScript: Superset of JavaScript for better type safety and developer experience.
    * Vite: Fast build tool and development server for React and TypeScript.
    * Gemini API: Used for AI-powered recipe creation and customization.
    * Tailwind CSS: Utility-first CSS framework for custom designs.
    * DaisyUI: Tailwind CSS plugin providing ready-made components.
    * Material UI Icons: For icons such as GitHub.
    * React Router Dom: For client-side routing in the app.
    * React Query: For fetching data.
    * Virtualization: For better performance when leading with lists.
    * Google OAuth: For authentication with google.

## Installation Instructions

1. Clone the Repository.

    Start by cloning the repository to your local machine.

    `git clone https://github.com/Kurler3/cookleai-client.git`

2. Install Dependencies
    Navigate into the project directory and install the necessary dependencies.

    <code>cd cookleai-client <br> 
    npm install</code>

3. Environment Variables
    
    The frontend requires one environment variable for the local backend URL.

    Create a .env file in the root of your project with the following content:

    `REACT_APP_LOCAL_BACKEND_API_URL=http://localhost:3000`

    This is used to communicate with the backend API during development.

4. Run the Development Server

    Now, you can start the local development server using Vite.

    `npm run dev`

    Your app will be available at http://localhost:5173/ (default for Vite).

## Configuration

### Vite Configuration
    
    This project uses Vite as the build tool. The configuration file is located at vite.config.ts. You can modify it as needed for additional plugins or settings.

### Tailwind CSS and DaisyUI
    
    Tailwind CSS is used for styling the application. The custom theme is defined in tailwind.config.js, and DaisyUI components are utilized for easy and consistent UI design.

### Environment Variable
    
    REACT_APP_LOCAL_BACKEND_API_URL: The URL of the local backend API used during development. This points to http://localhost:3000 by default.