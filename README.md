# BookManagement 

- It's the BookManagement web based app prepared in .NET v7.0 using InMemory EntityFramework v7.0 (Microsoft.EntityFrameworkCore.InMemory (7.0.20).
- It's frontend is prepared in Angular/Typescript. (Angular material for UI) with Angular version :  17.
- It offers the ability to create/delete/markDone sort of capabilities to the user of this application.


# Steps to run the Frontend appliction

Frontend
- Download/Clone the repository to local file structure.
- Install node version 20.15.1 from https://nodejs.org/en/download/package-manager 
- Open Visual studio code
- navigate to BreadCrumb.BookManagement.Frontend/BreadCrumb.BookManagement and open this folder in Visual Studio code.
- select the terminal option and navigate to BreadCrumb.BookManagement.Frontend/BreadCrumb.BookManagement folder in the Terminal
- run npm install and make sure everything get's setup.
- it should install Angular version  : 17 with agnular CLI 17.
- run ng serve
- browse to pointed URL
- Please open the environments/environment.ts file and locate BooksApi URL.

Backend

- Visual Studio 
- navigate to BreadCrumb.BookManagement.Backend path and open the solution file (i.e. BreadCrumb.BookManagement.Backend/BreadCrumb.BookManagement.sln)
- It should open the entire project in visual studio.
- Resolve all the packages using package manager.
- Navigate to launchSettings and locate 'BreadCrumb.BookManagement.Backend/BreadCrumb.BookManagement/Properties/launchSettings.json' file. Notice there http section under Profiles. Copy the application URL.
- Past the application URL in frontend project within environments/environment.ts file against the BookApi and replace the old one.
- Build and run the backend application.
- Go to the browser and refresh the browser tab opened in http://localhost:4200/ ( this is the default address which angular provides ).
- Refresh the tab and wait for the test data to get loaded in the app


