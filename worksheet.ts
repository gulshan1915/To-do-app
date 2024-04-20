#! /usr/bin/env node

import inquirer from "inquirer";

let todo: string[] = [];

async function main() {
  try {
    await askAction();
  } catch (error) {
    console.error('Error:', error);
  }
}

async function askAction() {
  const action = await inquirer.prompt({
    name: "action",
    type: "list",
    message: "What would you like to do?",
    choices: ["Add", "Read", "Update", "Delete", "Exit"]
  });
  switch (action.action) {
    case "Add":
      await addTodo();
      break;
      case "Read":
        await readTodo();
        break;
      case "Update":
        await updateTodo();
        break;
      case "Delete":
        await deleteTodo();
        break;
      case "Exit":
        console.log("Exiting...");
        break;
      default:
        console.log("Invalid action");
        break;
    }
  }
  async function addTodo() {
    const todoQuestion = await inquirer.prompt({
      name: "todoItem",
      type: "input",
      message: "Enter the todo item:"
    });
    todo.push(todoQuestion.todoItem);
    console.log("Todo item added successfully!");
    await askAction();
  }
  
  async function readTodo() {
    if (todo.length === 0) {
      console.log("No todo items available.");
    } else {
      console.log("Todo items:");
      todo.forEach((item, index) => {
        console.log(`${index + 1}. ${item}`);
      });
      const readQuestion = await inquirer.prompt({
        name: "read",
        type: "list",
        message: "Select a book to read:",
      choices: todo
    });
    console.log(`Successfully read ${readQuestion.read}!`);
  }
  await askAction();
}

async function updateTodo() {
  const indexToUpdate = await selectTodoIndex("Select the todo item to update:");
  const updatedTodo = await inquirer.prompt({
    name: "updatedTodoItem",
    type: "input",
    message: "Enter the updated todo item:"
  });
  todo[indexToUpdate] = updatedTodo.updatedTodoItem;
  console.log("Todo item updated successfully!");
  await askAction();
}

async function deleteTodo() {
  const indexToDelete = await selectTodoIndex("Select the todo item to delete:");
  todo.splice(indexToDelete, 1);
  console.log("Todo item deleted successfully!");
  await askAction();
}

async function selectTodoIndex(message: string): Promise<number> {
  if (todo.length === 0) {
    console.log("No todo items available.");
    await askAction();
  }
  const choices = todo.map((_, index) => `${index + 1}.`);
  const todoIndex = await inquirer.prompt({
    name: "index",
    type: "list",
    message: message,
    choices: choices
  });
  return parseInt(todoIndex.index) - 1;
}

main();

