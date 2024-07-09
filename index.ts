#! /usr/bin/env node
import inquirer from "inquirer";
//Define the student class
class Student{
  static counter= 10000;
  Id: number;
  name: string;
  courses: string[];
  balance:  number;

constructor(name:string){
  this.Id = Student.counter++;
  this.name = name;
  this.courses=[];// initializer an array for  empty courses
  this.balance= 100;

}
enroll_course(course:string){
this.courses.push(course);

}
view_balance(){
  console.log(`Balance for ${this.name}:  ${this.balance} `);
}
pay_fees(amount:number){
  this.balance -= amount;
  console.log(`$${amount} fees paid succcessfully  for ${this.name}`);
  console.log(`REmaining  Balance: $${this.balance}`);

}
show_status(){
  console.log(`ID: ${this.Id}`);
  console.log(`Name: ${this.name}`);
  console.log(`Courses: ${this.courses}`);
  console.log(`Balance: ${this.balance}`);
}
}
class Student_manager{
  students: Student[]

  constructor(){
    this.students=[];
  }

  add_student(name:string){
    let student=new Student(name);
    this.students.push(student);
    console.log(`Student: ${name }added  successfully.Student ID: ${student.Id}`);
  }

  enroll_student(student_id: number, course:string){
    let student=this.students.find(std=>std.Id===student_id);
    if(student){
      student.enroll_course(course);
      console.log(`${student.name}enrolled  incourse ${course} successsfully`);

    }
  }
  view_student_balance(student_id:number){
    let student=this.find_student(student_id);
    if (student){
      student.view_balance();
     }
    else{
      console.log("student not found.please enter  a coreect student ID")
    }
  }
  pay_student_fees(student_id:number,amount:number){
    let student=this.find_student(student_id);
    if (student){
      student.pay_fees(amount);
    }
    else{
      console.log("student not found.please enter a correct student ID")
    }
  }
  show_student_status(student_id:number){
    let student=this.find_student(student_id);
    if (student){
      student.show_status();
    }
  }
  find_student(student_id:number){
    return  this.students.find(std=> std.Id=== student_id);
  }

}
async function main() {
  console.log("welcome to Student Management System");
  console.log("-".repeat(50));

  let student_manager  = new Student_manager();
  while(true){
    let choice =  await inquirer.prompt([{
      name:"choice",
      type: "list",
      message:  "select an option",
      choices:[
      "ADD Student",
      "Enroll Student",
      "View Student Balance",
      "Pay Fees",
      "Show Status",
      "Exit"
      ]
    }]);
    switch (choice.choice){
    case  "ADD Student":
    let  name_input=await  inquirer.prompt([
      {
        name: "name",
        type:"input",
        message:"Enter a  student name",
      }
    ]);
    student_manager.add_student(name_input.name);
    break;


case "Enroll Student":
  let  course_input=await  inquirer.prompt([
    {
      name: "student_id",
      type:"number",
      message:"Enter student id",
    },
        {
          name: "course",
          type:"input",
          message:"Enter a course name",
        }
      ]);
  student_manager.enroll_student(course_input.student_id,course_input.course);
  break;
  case "View Student Balance":
  let  balance_input= await  inquirer.prompt([
    {
      name: "student_id",
      type:"number",
      message:"Enter student id",
    }
  ]);
  student_manager.view_student_balance(balance_input.student_id);
  break;

  case "Pay Fees":
    let  fees_input=await  inquirer.prompt([
      {
        name: "student_id",
        type:"number",
        message:"Enter student id",
      },
          {
            name: "amount",
            type:"number",
            message:"Enter the  amount to pay",
          }
        ]);
        student_manager.pay_student_fees(fees_input.student_id,fees_input.amount);
  break;

  case "Show Status":
    let  status_input=await  inquirer.prompt([
      {
        name: "student_id",
        type:"number",
        message:"Enter student id",
 } ]);
 student_manager.show_student_status(status_input.student_id);
 break;

 case "Exit":
  console.log("existing...");
  process.exit();
        
  }
  }
  
}
main();