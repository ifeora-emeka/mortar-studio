# AI Context

## About
**Mortar Studio** is a no-code **Tailwind TypeScript app builder** that empowers developers and web designers to create websites and applications efficiently. With Mortar Studio, you can:

- Build projects locally using the `mortar-studio` npm package.
- Use the Mortar Studio **Cloud Platform** for hosting and collaborative development.
- Self-host projects on your preferred cloud provider.
- Export project code to **React (Vite)**, **Next.js**, or **Nuxt.js**, providing flexibility and an optimized development process.

## Packages
1. **`mortar-studio`**  
   The core npm package powering every Mortar Studio project. It provides APIs that the designer utilizes to create and organize project data into structured JSON files, such as pages, components, variables, and more.

2. **`mortar-studio-cli`**  
   A Command Line Interface (CLI) tool that allows developers to create Mortar Studio projects effortlessly via their terminal. Run the command `npx create-mortar-app` to generate a project scaffold.

## Concepts
Mortar Studio adopts a **component-based architecture**, with key concepts outlined below:

1. **Pages**  
   Pages are the primary building blocks of your project. These represent individual screens or routes.
   - Pages are created directly in the builder, which communicates with the local API to store their data as JSON files.
   - Example: `src/pages/<page_id>/page.json`

2. **Instances**  
   Instances define how and where components are rendered within your project.
   - They hold information about the component's props, children, and a reference to the component being rendered.
   - Example: `ref::component::<component_id>`

## Anatomy of a Mortar Studio Project
A Mortar Studio project adheres to a structured directory and file format as follows:

### Project Root
- **`src`**  
  Contains all source files for your project.

### Key Directories and Files
1. **`src/pages`**  
   Directory holding all pages in the project.
   - Each page has its own directory containing relevant data files.
   - Example: `src/pages/<page_id>/instances.json`

2. **`src/components`**  
   Directory containing all reusable components for your project.

3. **`src/variables`**  
   Directory for global variables used across the project.

4. **`src/instances`**  
   Directory managing instance definitions.

5. **`./mortar-studio.config.json`**  
   The main configuration file for the project. This file contains metadata and project settings.

## Features
- **No-Code Builder:** Design apps visually with ease.
- **Code Export:** Generate clean and reusable code for **React (Vite)**, **Next.js**, or **Nuxt.js**.
- **Hosting Options:** Choose between Mortar Studio Cloud or self-hosting.
- **Flexible Development:** Sync builder changes with local development in real-time.

Mortar Studio is designed to enhance productivity, streamline the development process, and offer developers unparalleled flexibility in creating modern web applications.