var collegedb = require('../model/college');

// create and save new college
// exports.create = (req,res)=>{
//     // validate request
//     if(!req.body){
//         res.status(400).send({ message : "Content can not be emtpy!"});
//         return;
//     }

//     // new college
//     const college = new collegedb({
//         collegename : "req.body.collegename",
//         yearfounded: 1234,
//         city : "req.body.city",
//         state : "req.body.state",
//         country : "req.body.country",
//         students: [
//             {
//                 studentName: "req.body.studentName",
//                 studentId: "req.body.studentId",
//                 yearbatch: 2098,
//                 skills: [ "req.body.skills" ]
//             }
//         ],
//         courses: [ "req.body.courses" ]
//     })

//     // save college in the database
//     college
//         .save(college)
//         .then(data => {
//             //res.send(data)
//             res.redirect('/add-college');
//         })
//         .catch(err =>{
//             res.status(500).send({
//                 message : err.message || "Some error occurred while creating a create operation"
//             });
//         });
// }

// retrieve and return all colleges/ retrive and return a single college

exports.find = (req, res)=>{

    console.log(req.query.id);

    if(req.query.id){
        var id = req.query.id;
        collegedb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found college with id "+ id})
                }else{
                    console.log(data.students.length);
                    res.send(data);
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving college with id " + id})
            })

    }else{
        collegedb.find()
            .then(college => {
                console.log('hello');
                res.send(college)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving college information" })
            })
    }

    
}

 exports.getsuggestion = (req,res)=>{
    if(req.query.id){

        var id = req.query.id;
        collegedb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found college with id "+ id})
                }else{
                    console.log(data.courses.length*2/3);  // state already same chosen now prefering atleast 2/3rd courses to be similar

                
                    collegedb.find()
                        .then(college => {
                            console.log('hello');
                            console.log(college.length);
                            const result = college && Object.values(college).filter((obj) => {
                                return obj.state === `${data.state}`
                            });
                    
                            console.log(result.length);
                            const similarColleges = [];
                            
                            for(let i = 0; i < result.length; ++i ){

                                let count = 0;

                                for( let j = 0; j < result[i].courses.length; ++j){

                                    if(data.courses.find(course => course == result[i].courses[j])){
                                        count++;
                                    }
                                    
                                }

                                if(count>data.courses.length*2/3){
                                    similarColleges.push(result[i]);
                                }

                            }

                            console.log(similarColleges.length);
                            res.send(similarColleges); // as of now done on the basis of state and courses

                        })
                        .catch(err => {
                            res.status(500).send({ message : err.message || "Error Occurred while retriving college information" })
                        })
                    }

            })
            .catch(err =>{
                res.status(500).send({ message: "Error retrieving college with id " + id})
            })  

    }

}

// Update a new idetified college by college id
// exports.update = (req, res)=>{
//     if(!req.body){
//         return res
//             .status(400)
//             .send({ message : "Data to update can not be empty"})
//     }

//     const id = req.params.id;
//     collegedb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
//         .then(data => {
//             if(!data){
//                 res.status(404).send({ message : `Cannot Update college with ${id}. Maybe college not found!`})
//             }else{
//                 res.send(data)
//             }
//         })
//         .catch(err =>{
//             res.status(500).send({ message : "Error Update college information"})
//         })
// }

// // Delete a college with specified college id in the request
// exports.delete = (req, res)=>{
//     const id = req.params.id;

//     collegedb.findByIdAndDelete(id)
//         .then(data => {
//             if(!data){
//                 res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
//             }else{
//                 res.send({
//                     message : "college was deleted successfully!"
//                 })
//             }
//         })   
//         .catch(err =>{
//             res.status(500).send({
//                 message: "Could not delete college with id=" + id
//             });
//         });
// }