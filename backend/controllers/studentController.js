import Student from "../models/student.js";

export function getStudents(req, res) {
    Student.find().then(
        (data) => {
            res.json(data);
        }
    ).catch(
        (err) => {
            res.json(err);
        }
    )
};

export function saveStudent(req,res){
    console.log(req.body);

     const student = new Student({
        name: req.body.name,
        age: req.body.age
    });

    student.save().then(() => {
        res.json({ message: "Student saved successfully" });
    }).catch((err) => {
        res.json({ message: "Error saving student", error: err });
    });
};