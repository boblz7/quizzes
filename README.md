## Quick preview

Application uses local file to store quizzes and questions if the api doesn't work. Details description of the app below

## Setup

Create a `.env` file with `BACKEND_ROOT_URL` variable and put a correct url

### Installation

Make sure to install the dependencies

```bash
yarn  install
```

## Application description

### Overview of All Created Quizzes

The app has a page containing a table listing all quizzes created so far (excluding any that have been deleted). Each row in the table displays the quiz name, along with buttons for deleting the quiz and launching a preview. Clicking elsewhere in the row (anywhere other than these two buttons) initiates quiz editing.

In addition to the quiz list table, this page has a button to initiate the creation of a new quiz.

### Creating a New Quiz

A new quiz is created using a form, which is a modal. A quiz as an entity consists of:

```
name
questions
```

All questions are in the same format, with each consisting of a simple text question and a simple text answer. There is no limit on the number of questions. The quiz creation form supports “recycling” questions from previously created quizzes. In this context, recycling means inserting previously written questions into this new quiz.

### Editing a Quiz

Editing a quiz allows changes to its name or the questions it contains. Editing is also done through a form, which can be either in a modal or on a separate page.

### Deleting a Quiz

Deleting a quiz removes it from the system, and it no longer appears in the list of previously created quizzes. The questions that make up the quiz are not deleted but remain in the system for potential recycling later on.

### "Solving" a Quiz

Once a quiz is created, it is "solvable." These quotes around "solving" indicate that it won’t actually be solvable in a traditional sense. The app has a page where users can go through all the quiz questions like a slideshow. Each slide in the slideshow displays a question and a button to reveal the answer (the answers remain hidden until the button is pressed).
