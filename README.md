# GITHUB REPOS APP CHALLENGE

This is a small application to access Github's user repositories and the README.md to these repositories.

In the project directory, you can run:
### `npm start`
Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will reload if you make edits. You will also see any lint errors in the console.

### `npm test`
Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.


# TECHNOLOGIES USED

The technologies used were:-

 - **Create React App**
 - **Redux**
 - **Tailwind**
 - **CSS Modules**
 - **React Testing Library**
 - **React Router**
 - **Localstorage**

## Reasons behind the above choices
I went for **Create React App** because it is easier to get started with. I could have also gone for **Next.js** but the instructions said we create a single page application thus I did not want to tempt myself by using a file-based routing system. For this reason, I used **React Router** for the routing needs of the single page application.

I used **Redux** for state management because some of the data could be shared between components.  

I used **localstorage** for data persistence just in case the user refreshed the app.

I used **Tailwind** since it is close to writing raw **CSS** thus it feels more flexible than **Bootstrap**. I think for large projects it is beneficial as your **CSS** footprint doesn't grow compared to the other tools out there. Secondly, it has the option to turn off the utilities you don't need if you are aggressive with keeping the footprint extra small. I used **Tailwind** for the components I built myself.

I also used  **CSS Modules** to help in styling the HTML from the README.md of the repositories since I could not access these components to style them since they are from a third party.

When it came to testing, I used **React Testing Library**, its philosophy of testing DOM nodes makes sense as you are testing how the user interacts with the application instead of implementation. Also, **Enzyme** seems to be no longer maintained hence this choice.

# Project Structure

I partitioned the application into the following major areas inside the src folder:-

 1. components
 2. pages
 3. store

I will discuss each of the above in the following sections.

## 1. components

Inside this folder, we have primary components which are used in building bigger components.

## 2. pages

Contained here are secondary components which act as a page for the app. They make use of the primary components. Since we are testing DOM elements, then naturally you will find most tests in the pages folder.

## 3. store

Inside this folder, we have **Redux** related stuff. We define the store and slices of the application's state here. 


# Short-comings experienced
1. Async tests felt pretty flaky sometimes
2. The Github API has a short rate limit

But despite the above, I enjoyed this. Thank you for sharing this.

# Demo

The demo to this application is hosted on Vervel.

You can view the demo of the app **[here](https://git-react.vercel.app/)**

Thank you!!
