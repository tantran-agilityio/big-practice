# (JAVASCRIPT) BIG-PRACTICE
### - Thank you all for taking time visit and review my project ! -
## Description
- Project **"Big-Practice"**: build a to-do list called *"Kanban Todo-list"*. This application will help manage personal's tasks. - using HTML5, CSS3, Javascript, MVC pattern, Local Storage.
    - Link design: [FIGMA](https://www.figma.com/file/R2ipzucZF0E3mZOOOh2nLt/To-Do-List-Kanban-(Community)?node-id=0%3A1&mode=dev)
- Time-line:
	- Estimate: 6 days (September 25, 2023 -- October 02, 2023)
	- Actual: 8 days (September 25, 2023 -- October 04, 2023)

## Overview
- Requirements of Todo-list:

  - A Todo-list with 3 Columns
    - Todo
    - In-Progress
    - Done

  - Allow
    - Read (from Local Storage)
    - Create
    - Update
    - Delete

  - Store
    - Local Storage

  - Each task contains information such as:
    - Title
    - Create Date
    - Update Date
    - Delete button

  - When adding and updating, the corresponding modal will be displayed

  - Sort Tasks based on update date

  - Work fine on Chrome browser latest version

- Targets
  - Apply the javascript knowledge: Using the knowledge about javascript learned in the previous section.

  - Apply MVC architecture: Apply the knowledge about MVC architecture from the MVC practice to complete this practice.

  - Practice analyzing the requirements: Try to analyze the requirements of a project

## Test environments
- Google Chrome - Version 115.0.5790.170 (Official Build) (64-bit)
- Mozilla FireFox - Version 116.0.1 (64-bit)
- Sidekick - Version 114.51.2.35544 (Official Build) stable (64-bit)

## Build environments
1. Visual Studio Code
2. Node.js -- v18.17.1
3. Npm -- v9.6.7

## Folder's structure
```
|- src/

    |- assets/
        |- fonts/
            |- ...
        |- images/
            |- ...
        |- styles/
            |- base/
                |- ...
            |- components/
                |- ...
            |- utils/
                |- ...
            |- main.css

    |- mvc-app/
        |- controllers/
            |- task.controller.js
        |- models/
            |- observable.js
            |- task.model.js
        |- services/
            |- LocalStorageService.js
        |- views/
            |- observer.js
            |- done.view.js
            |- inprogress.view.js
            |- todo.view.js
        |- index.js
    
    |- index.html
|- .editorconfig
|- .eslintrc.js
|- .gitignore
|- package-lock.json
|- package.json
|- README.md
```

## Getting started
- **Step 01: Clone repository with HTTPS :**
~~~
git clone https://github.com/tantran-agilityio/big-practice.git
~~~
- **Step 02: Switch to branch feature/big-practice**
~~~
git checkout feature/big-practice
~~~
- **Step 03: Install npm packages & dependencies**
~~~
npm install
~~~
- **Step 04: Run**
~~~
npm start
~~~
- **Step 05: Open in Browsers**
~~~
run http://localhost:1234 in browser
