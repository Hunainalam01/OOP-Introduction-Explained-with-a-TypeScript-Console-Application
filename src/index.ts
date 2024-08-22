#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer"

// STUDENT CLASS
class Student {
    name: string

    constructor(name: string) {
        this.name = name
    }
}

// TEACHER CLASS
class Teacher {
    name: string

    constructor(name: string) {
        this.name = name;
    }
}

// PERSON CLASS
class Person {
    students: Student[] = [];
    teachers: Teacher[] = [];

    // ADD STUDENT METHOD
    addStudent(obj: Student) {
        this.students.push(obj)
    }

    // ADD TEACHER METHOD
    addTeacher(obj: Teacher) {
        this.teachers.push(obj)
    }
}


const persons = new Person()

// CREATE ASYNCE FUNCTION BECAUSE WE USE INQUIRER IN IT:
const startProgram = async (persons: Person) => {
    
    // SET DO WHILE LOOP TO CONTINUE THE PROGRAM TLL THE USER EXIT:
    do {
        console.log(`Welcome ${Student.name}`);
        const ans = await inquirer.prompt({
            name: "select",
            type: "list",
            choices: ["principle", "staff", "teacher", "student", "exit"],
            message: "Whom would you like to interact!",
        })

        // PRINCIPLE 
        if (ans.select == "principle") {
            console.log(`\nYou Reached Principle Office`);
        }

        // STAFF
        else if (ans.select == "staff") {
            console.log(`\nYour Entered in the class room...`);
            console.log(chalk.yellow(`You can interact with anybody`));
        }

        // TEACHER 
        else if (ans.select == "teacher") {
            const ans = await inquirer.prompt({
                name: "teach",
                type: "input",
                message: "Enter the teacher name you want to engage!\n"
            })

            const teacher = persons.teachers.find(val => val.name == ans.teach)
            if (!teacher) {
                const tName = new Teacher(ans.teach)
                persons.addTeacher(tName)
                console.log(chalk.green(`\nHello! I'm ${tName.name}. nice to meet you!`)),
                    console.log(chalk.green(`New teacher Added!`));
                console.log(`current teacher list!`);
                console.log(persons.teachers);
            } else {
                console.log(`\nHello I'm  ${teacher.name}. Nice to see you Again!`);
                console.log(chalk.yellow(`Existing teacher list!`));
                console.log(persons.teachers);
            }

        }

        // STUDENT 
        else if (ans.select == "student") {
            const ans = await inquirer.prompt({
                name: "std",
                type: "input",
                message: chalk.yellow("Enter the student name you want to interact with !!!")
            })
            const student = persons.students.find(val => val.name == ans.std)
            if (!student) {
                const sName = new Student(ans.std);
                persons.addStudent(sName)
                console.log(chalk.green(`\nHello! I'm ${sName.name}, Nice to meet you`));
                console.log(chalk.green(`New student Added!`));
                console.log(chalk.yellow(`curent student list!`));

                console.log(persons.students);
            } else {
                console.log(`\nHello I'm  ${student.name}. Nice to see you Again!`);
                console.log(chalk.yellow(`Existing student list!`));
                console.log(persons.teachers);
            }
        }

        // EXIT 
        else if (ans.select == "exit") {
            console.log(chalk.red.bold(`exiting the program....`));
            process.exit()
        }
    } while (true)

}

// calling the program
startProgram(persons);