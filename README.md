# CS-465 Full Stack Development

## Travlr Getaways Full Stack Web Application

This repository contains my final project for CS-465 Full Stack Development at Southern New Hampshire University. Throughout this course, I developed the Travlr Getaways application into a full-stack web application with both a customer-facing website and an administrative single-page application. The project gave me hands-on experience connecting frontend and backend technologies, working with a NoSQL database, developing RESTful API endpoints, creating reusable components, and adding authentication and security to protect administrative functions.

## Architecture

During this project, I worked with several approaches to frontend development, including Express HTML, JavaScript, and a single-page application (SPA). The customer-facing portion of Travlr Getaways used Express with HTML templates to display information to users. This approach works well when the server is responsible for preparing content and returning complete pages to the browser. JavaScript added interactivity and allowed the application to perform tasks beyond displaying static HTML.

The administrative side of the application used an Angular SPA. The SPA provided a more dynamic experience because users could interact with different parts of the application without reloading an entire page after every action. Angular also made it possible to divide the interface into reusable components and services. Compared with the traditional Express approach, the SPA separated the frontend more clearly from the backend and communicated with the server through API requests.

The backend used MongoDB, which is a NoSQL database. MongoDB was a good choice for this application because the trip information could be stored as flexible document-based data that closely matches the JSON objects used throughout the application. Instead of requiring information to fit into rows and columns like a relational database, MongoDB stores documents that can be retrieved and converted easily for use by the API and frontend. This made it practical for storing and managing the travel data used by Travlr Getaways.

## Functionality

One concept that became much clearer to me during this course was the difference between JavaScript and JSON. JavaScript is a programming language that contains logic, variables, functions, objects, and other features used to make an application work. JSON is a text-based format used to represent and exchange structured data. Although JSON looks similar to a JavaScript object, JSON itself does not contain application logic.

JSON played an important role in connecting the frontend and backend of Travlr Getaways. The frontend could send requests to API endpoints, and the backend could respond with trip information formatted as JSON. The Angular application could then take that information and display it through its components. This helped me understand how separate parts of a full-stack application can communicate even though they perform different responsibilities.

As I developed the project, I also refactored parts of the application instead of repeating the same code in multiple locations. A good example was the use of reusable Angular components for displaying and managing trip information. Rather than creating separate interface code every time the same type of information was needed, components could be reused and supplied with the appropriate data. Services also helped centralize communication with the backend instead of placing API logic throughout different components.

Refactoring the application this way made the code easier to read, maintain, and update. Reusable UI components also help keep the appearance and behavior of an application consistent. If a change is needed later, it can often be made in one component or service rather than in several different places.

## Testing

Testing the full-stack application required me to understand how the frontend, API, database, and authentication system worked together. API endpoints use different HTTP methods depending on the action being performed. GET requests retrieve information, POST requests create or submit information, PUT requests update existing information, and DELETE requests remove information. Testing these methods helped confirm that requests were reaching the correct endpoints and that the application returned the expected responses.

Testing became more complicated after security was added because not every endpoint should be available to every user. Administrative operations need to verify that the person making the request has been authenticated. This means testing involves more than checking whether an endpoint returns data. I also had to consider whether a request contained valid authentication information and whether protected operations correctly rejected unauthorized requests.

Adding authentication showed me why security must be considered throughout the entire application. A frontend interface alone cannot protect sensitive operations because someone could attempt to access an API endpoint directly. The backend must validate protected requests before allowing changes to application data. Testing both successful and unsuccessful requests helped me better understand how authentication and API security work together in a full-stack application.

## Reflection

CS-465 helped me connect many programming concepts that I had previously learned separately. Before working through this project, frontend development, backend development, databases, APIs, and security could sometimes feel like individual topics. Building Travlr Getaways showed me how those pieces come together to create one complete application.

One of the most valuable skills I developed was understanding how data moves through a full-stack system. I gained more experience working with JavaScript, Express, Angular, RESTful APIs, MongoDB, JSON, reusable components, and authentication. I also became more comfortable troubleshooting problems between different layers of an application. When something did not work correctly, I learned to determine whether the problem was coming from the frontend, an API route, the server, the database, or another part of the application.

This course also helped me become more confident in developing applications that are organized and maintainable instead of simply trying to make the code work. I now have a better understanding of separation of concerns, reusable code, API design, database integration, and application security. These are skills that I can continue building on as I work toward a career in software development and other technology roles.

Completing this project gave me something practical that I can include in my professional portfolio. More importantly, it showed me that I can work through the different stages of building a full-stack application and understand how the pieces connect. I believe the experience from CS-465 has made me a stronger and more marketable candidate because I can discuss not only the technologies I used, but also how and why they were used together to solve a real application development problem.

## Technologies Used

* Node.js
* Express.js
* JavaScript
* HTML/CSS
* Angular
* TypeScript
* MongoDB
* RESTful APIs
* JSON
* Authentication and application security

## Repository Structure

The repository documents the development of the Travlr Getaways application throughout CS-465. The final project includes the customer-facing application, administrative Angular SPA, backend server and API functionality, database integration, and authentication/security functionality developed during the course.
