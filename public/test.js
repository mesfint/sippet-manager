/*
If the difference between the grade and the next multiple of 5 is less than 3, round  up to the next multiple of 5.
If the value of grade is less than ,38 no rounding occurs as the result will still be a failing grade.
*/
//iterate through the array and find the grade
// and the next multiple of 5 and compare the difference  to less than 3
// if true round up to the next multiple of 5  if not return the grade   if grade is less than 38 return grade
function gradingStudents(grades) {
  for (let i = 0; i < grades.length; i++) {
    if (grades[i] < 38) {
      continue;
    }
    if (grades[i] % 5 < 3) {
      grades[i] = grades[i] + (5 - (grades[i] % 5));
    }
    return grades;
  }
}

console.log(gradingStudents([4, 73, 67, 38, 33]));

// function getGrade(grade) {
//   let newGrade;
//   for (let j = grade[0]; j <= 100; j++) {
//     if (grade[j] > 38) {
//       let nextNo = grade[j] % 5;
//       if (nextNo[j] == 0 && nextNo[j] - grade[j] < 3) {
//          newGrade = grade[j] + (nextNo[j] - grade[j]);
//         return newGrade;
//       } else if (nextNo[j] - grade[j] > 3) {
//         return grade
//     }
//     return grade;
//   }
// }

// console.log(getGrade([4, 73, 67, 38, 33]));

// function gradingStudents(grades) {
//   // Write your code here

//   if (grades > 33) {
//     for (i = grades; i < 100; i++) {
//       let nextNum = grades[i] % 5 == 0;
//       if (nextNum && grades[i] - grades < 3) {
//         return grader[i];
//       }
//     }
//   }
//   return grades;
// }
// console.log(gradingStudents([4, 73, 67, 38, 33]));
