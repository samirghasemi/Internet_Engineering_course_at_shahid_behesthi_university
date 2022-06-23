const db = require("../models");
// const config = require("../config/auth.config");
const Student = db.student;
const Course = db.course;
const Sequelize = db.sequelize;

exports.get = async (req, res) => {
    try {

        const student = await Student.findOne({
            where: {
                student_id: req.params.studentid,
            },
        });
        // console.log(student)
        if(!student){
            return res.status(400).send({error:{message: "this student is not existed"}});
        }

        const courses = await Course.findAll({
                attributes: ['name', ['course_id', 'id'], 'grade'],
                where: {
                    studentId: student.id
                }
            }
        )

        return res.status(200).send({
            studentid: student.student_id,
            average: student.average,
            courses: courses,
            last_updated: student.updatedAt,
            code: 200,
            message: "All courses received successfully!"
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

exports.create = async (req, res) => {
    try {
        // console.log(req.params.studentid)

        const student = await Student.findOne({
            where: {
                student_id: req.params.studentid,
            },
        });
        // console.log(student)

        if (!student) {
            return res.status(400).send({error: {message: "this user is not exist!"}});
        }

        const check_course = await Course.findOne({
            where: {
                studentId: student.id,
                course_id: req.body.id
            },
        });

        if (check_course) {
            return res.status(400).send({error: {message: "this course is already existed!"}});
        }
        const course = await Course.create({
            name: req.body.name,
            course_id: req.body.id,
            grade: req.body.grade,
            // student_id: null,
            studentId: student.id,
        });

        // console.log(course)

        const [results, _metadata] = await db.sequelize.query(
            `
                select avg(grade) as avg
                from courses
                where courses.studentId = ${student.id}
            `);
        let average = results[0].avg
        // console.log(average)

        const temp_student = await Student.update({
                average: average,
            },
            {
                where: {
                    id: student.id,
                }
            });

        return res.status(200).send({
            name: course.name,
            id: course.course_id,
            grade: course.grade,
            code: 200,
            message: "course added successfully!"
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

exports.update = async (req, res) => {
    try {
        const student = await Student.findOne({
            where: {
                student_id: req.params.studentid,
            },
        });

        if(!student){
            return res.status(400).send({error:{message: "this user is not exists!"}});
        }

        const temp_course = await Course.update({
                name: req.body.name,
                grade: req.body.grade,
                course_id: req.body.id
            },
            {
                where: {
                    studentId: student.id,
                    course_id: req.params.courseid
                }
            });
        // console.log(temp_course[0])

        if(temp_course[0] == 0){
            return res.status(400).send({error:{message: "this course is not exists!"}});
        }

        const course = await Course.findOne({
            where: {
                studentId: student.id,
                course_id: req.body.id
            },
        });

        const [results, _metadata] = await db.sequelize.query(
            `
                select avg(grade) as avg
                from courses
                where courses.studentId = ${student.id}
            `);
        let average = results[0].avg
        // console.log(average)

        const temp_student = await Student.update({
                average: average,
            },
            {
                where: {
                    id: student.id,
                }
            });


        return res.status(200).send({
            name: course.name,
            id: course.course_id,
            grade: course.grade,
            code: 200,
            message: "grade updated successfully!"
        });
    } catch (error) {
        res.status(400).send({error:{message: "Bad request!"}});
    }
};

exports.delete = async (req, res) => {
    try {
        const student = await Student.findOne({
            where: {
                student_id: req.params.studentid,
            },
        });

        if(!student){
            return res.status(400).send({error:{message: "this user is not exists!"}});
        }

        const course = await Course.findOne({
            where: {
                studentId: student.id,
                course_id: req.params.courseid
            },
        });

        // console.log(temp_course[0])
        if(!course){
            return res.status(400).send({error:{message: "this course is not exists!"}});
        }
        const deleted_course = await Course.destroy({
            where: {
                studentId: student.id,
                course_id: req.params.courseid
            },
        });

        const [results, _metadata] = await db.sequelize.query(
            `
                select avg(grade) as avg
                from courses
                where courses.studentId = ${student.id}
            `);
        let average = results[0].avg
        // console.log(average)

        const temp_student = await Student.update({
                average: average,
            },
            {
                where: {
                    id: student.id,
                }
            });


        return res.status(200).send({
            name: course.name,
            id: course.course_id,
            grade: course.grade,
            code: 200,
            message: "course deleted successfully!"
        });
    } catch (error) {
        res.status(400).send({error:{message: "Bad request!"}});
    }
};
