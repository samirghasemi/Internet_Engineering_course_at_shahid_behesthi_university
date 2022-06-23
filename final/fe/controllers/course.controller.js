const db = require("../models");
const Student = db.student;
const Course = db.course;

exports.get = async (req, res) => {
    try {
        const student = await Student.findOne({
            where: {
                student_id: req.params.studentid,
            },
            include: {
                model: Course,
                attributes: ['name', ['course_id', 'id'], 'grade'],
            }
        });
        if(!student){
            return res.status(400).send({error:{message: "this student is not existed"}});
        }
        return res.status(200).send({
            studentid: student.student_id,
            average: student.average,
            courses: student.courses,
            last_updated: student.updatedAt,
            code: 200,
            message: "All courses received successfully!"
        });
    } catch (error) {
        res.status(400).send({error:{message: "error has occurred during get course"}});
    }
};

exports.create = async (req, res) => {
    try {

        const student = await Student.findOne({
            where: {
                student_id: req.params.studentid,
            },
        });

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
            studentId: student.id,
        });

        let average = await calculate_average(student.id);

        const temp_student = await Student.update({
                average: average,
            },
            {
                where: {
                    id: student.id,
                }
            });

        if(temp_student[0] == 0){
            return res.status(400).send({error:{message: "error has occurred during update student average"}});
        }

        return res.status(200).send({
            name: course.name,
            id: course.course_id,
            grade: course.grade,
            code: 200,
            message: "course added successfully!"
        });
    } catch (error) {
        res.status(400).send({error:{message: "error has occurred during create course"}});
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

        if(temp_course[0] == 0){
            return res.status(400).send({error:{message: "this course is not exists!"}});
        }

        const course = await Course.findOne({
            where: {
                studentId: student.id,
                course_id: req.body.id
            },
        });

        let average = await calculate_average(student.id);

        const temp_student = await Student.update({
                average: average,
            },
            {
                where: {
                    id: student.id,
                }
            });

        if(temp_student[0] == 0){
            return res.status(400).send({error:{message: "error has occurred during update student average"}});
        }

        return res.status(200).send({
            name: course.name,
            id: course.course_id,
            grade: course.grade,
            code: 200,
            message: "grade updated successfully!"
        });

    } catch (error) {
        res.status(400).send({error:{message: "error has occurred during update course"}});
    }
};

async function calculate_average(student) {
    const [results, _metadata] = await db.sequelize.query(
        `
            select IFNULL(avg(grade), 0) as avg
            from courses
            where courses.studentId = ${student}
        `);
    return results[0].avg;
}

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

        if(deleted_course==0){
                return res.status(400).send({error:{message: "this course is not exists!"}});
        }

        let average = await calculate_average(student.id);

        const temp_student = await Student.update({
                average: average,
            },
            {
                where: {
                    id: student.id,
                }
            });

        if(temp_student[0] == 0){
            return res.status(400).send({error:{message: "error has occurred during update student average"}});
        }

        return res.status(200).send({
            name: course.name,
            id: course.course_id,
            grade: course.grade,
            code: 200,
            message: "course deleted successfully!"
        });
    } catch (error) {
        res.status(400).send({error:{message: "error has occurred during delete course"}});
    }
};
