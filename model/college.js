const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    studentName : {
        type : String,
        required: true
    },
    studentId : {
        type : String,
        required: true
    },
    yearbatch : {
        type : Number,
        required: true
    },
    skills : [String]
})

const collegeSchema = new mongoose.Schema({
    collegename : { 
        type : String,
        required: true
    },
    yearfounded : {
        type : Number,
        required: true
    },
    city : {
        type : String,
        required: true
    },
    state : {
        type : String,
        required: true 
    },
    country : {
        type : String,
        required: true 
    },
    students : [ studentSchema ],
    courses : [ String ]
})

const collegedb = mongoose.model('collegedb', collegeSchema);

module.exports = collegedb;

// To generate random data
// [
//     '{{repeat(1, 2)}}',
//     {
//       collegename: 'College {{integer(100, 999)}} {{state()}}',
//       yearfounded: '{{integer(1950, 2014)}}',
//       city: '{{city()}}',
//       state: '{{state()}}',
//       country: 'India',
//       students: [
//         '{{repeat(9, 10)}}',
//         {
//           studentName: '{{firstName()}} {{surname()}}',
//           studentId: '1901CS{{integer(1, 100)}}',
//           yearbatch: '{{integer(1999, 2020)}}',
//           skills: '{{lorem(1, "words")}}'
//         }
//       ],
//       courses: [
//         '{{repeat(7)}}',
//         '{{lorem(1, "words")}}'
//       ]
//     }
//   ]

//   https://www.json-generator.com/#
