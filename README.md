# Student Management System - Frontend

This repository contains the frontend code for an interactive web application I designed to manage music student records, lesson scheduling, and payment tracking.

## Table of Contents

- [Project Overview](#project-overview)
- [Project Screenshots](#screenshots)
- [Setup](#setup)
- [Usage](#usage)
- [Technologies and Languages Used](#technologies-and-languages-used)
- [Architecture Diagram](#architecture-diagram)
- [Project Structure](#project-structure)

## Project Overview

The Student Management System frontend provides a user-friendly interface for managing student information. With navigation and interactive components, users can easily access and manipulate student records, update lesson schedules, and track payment details.

## Project Screenshots

### Student Records Page:
![HomePage](https://github.com/stephen3m/student-management-ui/assets/96703864/5c352ebe-650b-42ea-9f32-d12b2e04f33a)

### Lesson Scheduling Page:
![LessonSchedulingPage (1)](https://github.com/stephen3m/student-management-ui/assets/96703864/635af162-24a9-4c11-b7c5-143746741c2e)

### Payment Tracker Page:
![PaymentTrackerPage](https://github.com/stephen3m/student-management-ui/assets/96703864/8eeeb4e8-8f63-4dcd-bf18-00703bdda75f)

## Setup

Follow these steps to set up and run the frontend of the Student Management System:

1. Clone this repository to your local machine:

   ```
   git clone git@github.com:stephen3m/student-management-ui.git
   ```

2. Navigate to the project directory:

   ```
   cd student-management-ui
   ```
   
3. Install the required dependencies:

   ```
   npm install
   ```
   
4. Start the development server:

   ```
   npm start
   ```
   
5. Open your web browser and visit http://localhost:3000 to access the application.

For setting up the backend part of this project, refer to https://github.com/stephen3m/student-management-service for instructions.

## Usage
The Student Management System frontend provides the following main features:

* View and manage student records 
* Schedule lessons, view, and delete lessons on calendar display (includes daily, week, month, and agenda view)
* Add payment entries and track payment history

## Technologies and Languages Used
* React JS: A JavaScript library for building user interfaces
* JavaScript: Usage of asynchronous functions and the Fetch API to send HTTP requests
* CSS: Styling and layout enhancements

## Architecture Diagram
![SMS (1)](https://github.com/stephen3m/student-management-ui/assets/96703864/be11345f-4dfc-4454-926b-ffa920a40aa4)

## Project Structure
The project directory is organized as follows:
* /src: Contains the source code of the frontend application
  * /components: Includes reusable React components that are used throughout the application
  * /pages: Houses the main pages of the application
  * /testing: Holds configuration and setup files for testing the application
  * /utils: Contains utility functions and API-related files
* /public: Contains public assets and the HTML entry point
