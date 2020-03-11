let express = require('express');
let bodyParser = require('body-parser');
let router = express.Router();
let cors = require('cors');
let app = express();
app.use(cors());

// all of our routes will be prefixed with /api
app.use('/api', bodyParser.json(), router);   //[use json]
app.use('/api', bodyParser.urlencoded({ extended: false }), router);

let students = [  { 'no': 0, 'id': "5935512001", 'name': "Nadat" ,'surname':"Kugimiya" ,'Major':"CoE", 'GPA':3.32},
                  { 'no': 1, 'id': "5831512018", 'name': "Yaya",'surname':"Urassaya"  ,'Major':"FHT",'GPA':3.90}
               ];
router.route('/students')
    // get all students
    .get((req, res) => res.json(students))
    // insert a new student
    .post((req, res) => {
    var student = {};
    student.no = students.length > 0 ? students[students.length - 1].no + 1 : 0;
    student.name = req.body.name
    student.surname = req.body.surname
    student.id = req.body.id
    student.Major = req.body.Major
    student.GPA = req.body.GPA
    students.push(student);
    res.json({ message: 'students created!' })
    })
router.route('/students/:student_no')
    .get((req, res) => {
        let no = req.params.student_no
        let index = students.findIndex(student => (student.no === +no))
        res.json(students[index])                   // get a student
    })
    .put((req, res) => {                               // Update a bear
        let no = req.params.student_no
        let index = students.findIndex(student => (student.no === +no))
        students[index].name = req.body.name;
        students[index].surname = req.body.surname;
        students[index].id = req.body.id;
        students[index].Major = req.body.Major;
        students[index].GPA = req.body.GPA;
        res.json({ message: 'student updated!' + req.params.student_no });
    })
    .delete((req, res) => {                   // Delete a bear
        let no = req.params.student_no
        let index = students.findIndex(student => student.no === +no)
        students.splice(index, 1)
        res.json({ message: 'student deleted: ' + req.params.student_no });
    })


app.use("*", (req, res) => res.status(404).send('404 Not found'));
app.listen(80, () => console.log("Server is running"));