const db = require("../models");
// const config = require("../config/auth.config");
const Student = db.student;
const Course = db.course;
const Sequelize = db.sequelize;

exports.get = async (req, res) => {
    try {
        const students = await Student.findAll({
            attributes:[
                         ['student_id','studentid'] , 'average' , ['updatedAt', 'last_updated']
            ],
            include: {
                model: Course,
                attributes: ['name', ['course_id', 'id'], 'grade'],
            }
        });

        return res.status(200).send({
            size: students.length,
            students : students
        });
    } catch (error) {
        res.status(400).send({error:{message: "error has occurred during get student process"}});
    }
};
exports.create = async (req, res) => {
    try {

        const student = await Student.create({
            student_id: req.body.studentid,
        });

        return res.status(200).send({
            studentid: student.student_id,
            average: student.average,
            courses: [],
            last_updated: student.updatedAt,
            code: 200,
            message: "student added successfully!"
        });
    } catch (error) {
        res.status(400).send({error:{message: "error has occurred during create student process"}});
    }
};
exports.update = async (req, res) => {
    try {

        const conflict_student = await Student.findOne({
            where: {
                student_id: req.body.studentid,
            },
        });

        if(conflict_student){
            return res.status(400).send({error:{message: "this user is already exists!"}});
        }

        const temp_student = await Student.update({
                student_id: req.body.studentid,
            },
            {
                where: {
                    student_id: req.params.id,
                }
            });
        if(temp_student[0] == 0){
            return res.status(400).send({error:{message: "this user is not exists!"}});
        }
        const student = await Student.findOne({
            include: {
                model: Course,
                attributes: ['name', ['course_id', 'id'], 'grade'],
            },
            where: {
                student_id: req.body.studentid,
            },
        });

        return res.status(200).send({
            studentid: req.params.id,
            average: student.average,
            courses: student.courses,
            last_updated: student.updatedAt,
            code: 200,
            message: "studentid changed successfully!"
        });
    } catch (error) {
        res.status(400).send(
            {
                error:
                    {
                        message: "Bad request!"
                    }
            }
        );
    }
};
exports.delete = async (req, res) => {
    try {

        const student = await Student.findOne({
            include: {
                model: Course,
                attributes: ['name', ['course_id', 'id'], 'grade'],
            },
            where: {
                student_id: req.params.id,
            },
        });
        if(!student){
            return res.status(400).send({error:{message: "this user is not exists!"}});
        }
        await Student.destroy(
            {
                where: {
                    student_id: req.params.id,
                }
            });
        // console.log(deleted_student)
        await Course.destroy(
            {
                where: {
                    studentId: student.id,
                }
            });
        // console.log(deleted_course)
        return res.status(200).send({
            studentid: student.student_id,
            average: student.average,
            courses: student.courses,
            last_updated: student.updatedAt,
            code: 200,
            message: "student deleted successfully!"
        });
    } catch (error) {
        res.status(400).send(
            {
                error:
                    {
                        message: "Bad request!"
                    }
            }
        );
    }
};
