## Project Overview
This is a quiz web-application that allows users to take and create quizzes and get a score based on their answers.  
There are 3 types of users:
1. Admin - can edit and delete all resources, create and play quizzes
2. Registered User - can edit and delete only their own resources, create and play quizzes
3. Anonymous - can only enter the site, no access to any resources, can't create and play quizzes

Users can register and login to the application.
JWT tokens are used to authenticate users and allow them to access resources
The application is built using Vue.js for the frontend, Pinia for state management, Axios for HTTP requests and Bootstrap (and CSS) for styling.
The application follows an Atomic Design pattern for the components.
The application has all necessary info pages like About, Contact, Privacy Policy, Imprint and FAQ.
