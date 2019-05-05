import TableMembers from './TableMembers.js';

export default class TableCourses {
    constructor(tableCourses, tableMembers) {
        //localStorage.removeItem('courseActive');
        this._table = tableCourses;
        this._courses = new Array();
        this._tableMembers = new TableMembers(tableMembers);
        this._initTable();        
        //Listenner of the form modal
        document.querySelector('#btnRegister').addEventListener('click', () => {
            this.addMember();
        })
    }

    _update() {
        //Remove all rows of the table
        for (let i = this._table.rows.length - 1; i > 1; i--) {
            this._table.deleteRow(i);
        }

        //Fill the table with new members
        this._initTable();
    }

    _updateArrayCourses() {
        if (localStorage.getItem('courses') != null) {
            this._courses = JSON.parse(localStorage.getItem('courses'));
        }
    }

    _initTable() {
        //Fill array courses
        this._updateArrayCourses();
        //Add to table
        this._courses.forEach((objCourse) => {
            this.addCourse(objCourse);
        });
    }

    addCourse(objCourse) {
        let row = this._table.insertRow(-1);
        let cell = row.insertCell(0);
        cell.innerHTML = objCourse.ID;
        cell = row.insertCell(1);
        cell.innerHTML = objCourse.name;
        cell = row.insertCell(2);
        cell.innerHTML = objCourse.stringStartDate;
        cell = row.insertCell(3);
        cell.innerHTML = objCourse.stringFinishDate;
        cell = row.insertCell(4);
        cell.innerHTML = objCourse.spaceAvailable;
        cell = row.insertCell(5);
        cell.innerHTML = objCourse.registeredMembers;
        cell = row.insertCell(6);
        cell.innerHTML = objCourse.duration;
        this._addBtnAddMemberAndBtnViewMembers(row, objCourse);
    }

    _addBtnAddMemberAndBtnViewMembers(row, course) {
        //Create buttons       
        let btnAddMember = document.createElement("input");
        btnAddMember.type = "button";
        btnAddMember.value = 'Añadir Participante';
        btnAddMember.className = 'btn btn-primary';
        btnAddMember.setAttribute('data-toggle', 'modal');
        btnAddMember.setAttribute('data-target', '#dialogo1');


        let btnViewMembers = document.createElement("input");
        btnViewMembers.type = "button";
        btnViewMembers.value = 'Ver participantes';
        btnViewMembers.className = 'btn btn-primary';

        //Add listenners
        btnAddMember.addEventListener('click', () => {
            localStorage.setItem('courseActive', course.ID);
        });

        btnViewMembers.addEventListener('click', () => {
            this._tableMembers._update(course.ID);
        });

        //Add to HTML
        row.insertCell(7);
        row.cells[7].appendChild(btnAddMember);
        row.insertCell(8);
        row.cells[8].appendChild(btnViewMembers);
    }

    addMember() {
        if (document.querySelector('#formMember').checkValidity()) {
            //Update Array courses
            this._updateArrayCourses();
            //Get ID of the course active
            let ID = Number(localStorage.getItem('courseActive'));
            if (this._isSpaceAvailable(ID)) {
                //Create object Member
                let objMember = {
                    name: document.querySelector('#name').value,
                    email: document.querySelector('#email').value,
                    birthday: document.querySelector('#birthday').value
                };

                //Found course in order to edit
                let course;
                this._courses.forEach((objCourse) => {
                    if (objCourse.ID === ID) {
                        course = objCourse;
                    }
                });

                //Fill array with all members of this course and put the new
                let arrayMembers = new Array();
                arrayMembers = course.members;
                arrayMembers.push(objMember);
                course.members = arrayMembers;

                //Add one member to the attribute RegisteredMembers
                course.registeredMembers++;

                //Update all courses
                this._courses.forEach((objCourse) => {
                    if (objCourse.ID === course.ID) {
                        objCourse = course;
                        return;
                    }
                });

                localStorage.setItem('courses', JSON.stringify(this._courses));

                //Update tables
                this._update();
                this._tableMembers._update(course.ID);
            } else {
                swal.fire({
                    type: 'warning',
                    title: 'Advertencia',
                    text: 'No existe suficiente espacio en este curso para registrar a una nueva persona'
                })
            }
        }
        else {
            swal.fire({
                type: 'warning',
                title: 'Advertencia',
                text: 'Datos incompletos'
            })
        }
    }

    _isSpaceAvailable(IDcourse) {
        let isSpaceAvailable = false;
        this._courses.forEach((objCourse) => {
            if (Number(objCourse.ID) == IDcourse && objCourse.spaceAvailable > objCourse.registeredMembers) {           
                isSpaceAvailable = true;
                return;
            }
        });        
        return isSpaceAvailable;
    }
}