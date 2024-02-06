// ====================================
const students = [];
// ====================================
// Functions for input validation purposes.
function validateEmptyInput(input, category, suffix = "") {
  if (input === null)
    return null;
  else if (input.trim().length === 0) {
    alert(`The ${category} field cannot be empty${suffix}. Please try again once it is filled.`);
    return null;
  }

  return input;
}

function printEmptySchoolMessage(actionTypeMessage) {
  alert("There are currently no students in this school. Unable to " + actionTypeMessage + ". Please add at least 1 student first.");
}
// ====================================
// Functions for student manipulation. (E.g. Add/View/Modify/Remove/Sort/Duplicate Detection + Removal/etc.)
function addStudent() {
  const name = prompt("Enter new student's name:");
  if (validateEmptyInput(name, "new student's name") === null)
    return;

  const className = prompt("Enter new student's class name:");
  if (validateEmptyInput(className, "new student's class name") === null)
    return;

  let grade = prompt("Enter new student's grade:");
  if (validateEmptyInput(grade, "new student's grades") === null)
    return;

  grade = parseInt(grade);
  if (isNaN(grade)) {
    alert("The student's new grades input is not a valid number. Please try again.");
    return;
  }

  const student = {
    name: name,
    className: className,
    grade: grade
  };

  students.push(student);
  alert(`New Student Added! Welcome, ${student.name}.`);
}

function viewStudents() {
  if (students.length > 0) {
    let studentList = "List of students:\n\n";

    for (const student of students)
      studentList += `${student.name} from ${student.className}: ${student.grade}\n`;

    alert(studentList);
  }
  else
    return printEmptySchoolMessage("view student info");
}

function modifyStudent() {
  if (students.length == 0)
    return printEmptySchoolMessage("modify student info");

  const studentName = prompt("Which student info would you like to modify?");
  if (validateEmptyInput(studentName, "student's name (To Modify)") === null)
    return;

  const studentIndex = students.findIndex((student) => student.name === studentName);
  if (studentIndex === -1) {
    alert(`(${studentName}) is not a student in this school. Please try again.`);
    return;
  }

  const newStudentName = prompt("Enter the student's new name: ");
  if (validateEmptyInput(newStudentName, "student's new name") === null)
    return;

  const newClassName = prompt("Enter student's new class name:");
  if (validateEmptyInput(newClassName, "student's new class name") === null)
    return;

  let newGrade = prompt("Enter student's new grade:");
  if (newGrade === null)
    return;

  newGrade = parseInt(newGrade);
  if (isNaN(newGrade)) {
    alert("The student's new grade input is not a valid number. Please try again.");
    return;
  }

  students[studentIndex].name = newStudentName;
  students[studentIndex].className = newClassName;
  students[studentIndex].grade = newGrade;

  alert(`${studentName}'s info has been successfully modified. (New Name: ${newStudentName})!`);
}

function removeStudent() {
  if (students.length == 0)
    return printEmptySchoolMessage("remove any student");

  const studentName = prompt("Which student would you like to remove from this school?");
  if (validateEmptyInput(studentName, "student's name (To Remove)") === null)
    return;

  const studentIndex = students.findIndex((student) => student.name === studentName);
  if (studentIndex === -1) {
    alert(`(${studentName}) is not a student in this school. Please try again.`);
    return;
  }

  students.splice(studentIndex, 1);
  alert(`${studentName} has been successfully removed from this school!`);
}

function sortAlphabeticallyNameAsc() {
  if (students.length == 0)
    return printEmptySchoolMessage("sort (Ascending Order - Grade)");

  // Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare
  // For characters in strings comparisons.
  students.sort((a, b) => a.name.localeCompare(b.name));
  alert("Successfully sorted students in an alphabetically ascending order by their names.");
}

function sortAlphabeticallyNameDesc() {
  if (students.length == 0)
    return printEmptySchoolMessage("sort (Descending Order - Name)");

  // Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare
  // For characters in strings comparisons.
  students.sort((a, b) => b.name.localeCompare(a.name));
  alert("Successfully sorted students in an alphabetically descending order by their names.");
}

function sortAlphabeticallyGradeAsc() {
  if (students.length == 0)
    return printEmptySchoolMessage("sort (Ascending Order - Grade)");

  // Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare
  // For characters in strings comparisons.
  students.sort((a, b) => a.grade - b.grade);
  alert("Successfully sorted students in an alphabetically ascending order by their grades.");
}

function sortAlphabeticallyGradeDesc() {
  if (students.length == 0)
    return printEmptySchoolMessage("sort (Descending Order - Grade)");

  // Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare
  // For characters in strings comparisons.
  students.sort((a, b) => b.grade - a.grade);
  alert("Successfully sorted students in an alphabetically descending order by their grades.");
}

function removeDuplicates() {
  if (students.length == 0)
    return printEmptySchoolMessage("remove duplicates");

  const uniqueStudents = [];
  const uniqueStudentsRepeatCountList = [];

  for (let i = 0; i < students.length; ++i) {
    const student = students[i];
    let elementIndex = uniqueStudents.findIndex((uniqueStudent) => student.name === uniqueStudent.name & student.className === uniqueStudent.className);

    if (elementIndex === -1) {
      uniqueStudents.push(student);
      uniqueStudentsRepeatCountList.push(0);
    }
    else {
      students.splice(i, 1);

      ++uniqueStudentsRepeatCountList[elementIndex];
      --i;
    }
  }

  var foundDuplicates = false;
  let successfulDisplayMessage = "Successfully removed duplicate student entries.\n\n";
  uniqueStudents.forEach((element, iter) => {
    if (uniqueStudentsRepeatCountList[iter] == 0)
      return;

    successfulDisplayMessage += `${element.name} from ${element.className}: ${uniqueStudentsRepeatCountList[iter]} time(s).\n`;
    if (foundDuplicates === false)
      foundDuplicates = true;
  });

  let zeroRepetitionDisplayMessage = "There were no duplicate student entries.";

  alert(foundDuplicates ? successfulDisplayMessage : zeroRepetitionDisplayMessage);
}
// ====================================