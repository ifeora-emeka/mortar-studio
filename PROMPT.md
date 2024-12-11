# Mortar Studio: Context and Features

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

## Core Concepts
Mortar Studio adopts a **component-based architecture**, with key concepts outlined below:

### Pages
Pages are the primary building blocks of your project. These represent individual screens or routes.
- Pages are created directly in the builder, which communicates with the local API to store their data as JSON files.
- Example: `src/pages/<page_id>/page.json`

### Instances
Instances define how and where components or elements are rendered within your project, promoting reusability and flexibility.
- **Component Instances:** They hold information about the component's props, children, and a reference to the component being rendered. This allows a single component to be reused across different parts of the project.
   - Example: `ref::component::<component_id>`
- **Element Instances:** Instances can also point to an element. This enables an element to have multiple instances via the `parent_element` key in each instance object, allowing users to insert components between elements dynamically.

### Components
Components are reusable pieces of UI that can be rendered multiple times across different pages or instances.
- They define the structure of required props and include an array of elements that make up the component.

### Elements
Elements are the smallest unit of a component that can be rendered. They can be text, images, or any other HTML element.
- Elements have an `id`, `index` (for sibling ordering), `parent_id`, and `children`.
- Each element can be targeted via its **element ms-id**, which identifies the component and instance responsible for rendering the element.

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

## Rendering Concepts
1. **Instance:** A reference to a component or element with incoming props that map to the required props. It tells the compiler where to render the component or element using its `index` and `page_id`.
2. **Component:** A reusable piece of UI that holds the structure of its required props and an array of elements that define the component.
   - Each element follows a parent-child relationship, using `parent_id` and `index` to establish their hierarchy.
3. **Elements:** The smallest unit of a component, including text, image, or other HTML elements. Each has properties such as `id`, `index`, `parent_id`, and `children`.
4. **Element ms-id:** A unique identifier for the component and instance responsible for rendering an element. It is also used for targeting elements (e.g., adding a bounding box).

## Features
- **No-Code Builder:** Design apps visually with ease.
- **Code Export:** Generate clean and reusable code for **React (Vite)**, **Next.js**, or **Nuxt.js**.
- **Hosting Options:** Choose between Mortar Studio Cloud or self-hosting.
- **Flexible Development:** Sync builder changes with local development in real-time.
- **Instance Flexibility:** Support for inserting components between elements and rendering multiple instances of an element through the `parent_element` key in instance objects.

Mortar Studio is designed to enhance productivity, streamline the development process, and offer developers unparalleled flexibility in creating modern web applications.

