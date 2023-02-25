# CqrsDemoFe

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Backend server

Prerequisites: 
 - running docker daemon
 - free 8000 port

Download or `git clone` backend application: https://github.com/maleksandrowicz93/cqrs-demo-apprvd/tree/develop. Next go to project root directory, make sure you are at develop branch, and build docker image by running `docker build -t cqrs-demo-be .`. Then run `docker images`, copy IMAGE ID, and run container with command `docker run -p 8000:8000 <IMAGE_ID>`.

Now, you can test manually frontend application :)

## Backend API

You can explore backend api in user friendly interactive way with swagger. Go to root directory of backend project, and copy content of file `api-spec/student-api.yml`. Then navigate to https://editor.swagger.io and replace content from left side located editor with already copied one. After that you can enjoy reviewing api on the right side located intercative GUI.

## Business functionalities

Business capabilities of frontend application is very similar to backend api. You can perform followmng actions:

 - loading all saved stduents with pagination
 - clearing already loaded students list (it is clearing view, not persistent data)
 - adding new students
 - displaying details of given student
 - editing student's data
 - updating student's password
 - deleting student
 - form validation:
    - add/edit user form:
        - email cannot be blank
        - password cannot be blank
        - password and confirmed password must be the same
    - update password form:
        - password cannot be blank
        - password and confirmed password must be the same