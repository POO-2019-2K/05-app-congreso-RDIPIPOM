export default class TableMembers {
    constructor(table, tableCourses) {
        this._table = table;
        this._tableCourses = tableCourses;
        this._courses = new Array();
    }

    _updateArrayCourses() {
        if (localStorage.getItem('courses') != null) {
            this._courses = JSON.parse(localStorage.getItem('courses'));
        }
    }

    initTable(IDcourse) {
        //Update Array Courses
        this._updateArrayCourses();
        //Found the course and show in the table
        this._courses.forEach((objCourse) => {
            if (objCourse.ID === IDcourse) {
                if (objCourse.members != null) {
                    objCourse.members.forEach((member) => {
                        this._addMember(objCourse.ID, member);
                    });
                } else {
                    return;
                }
            }
        });
    }

    _addMember(IDcourse, member) {
        //Create button to delete the member
        let btnDeleteMember = document.createElement("input");
        btnDeleteMember.type = "button";
        btnDeleteMember.value = 'Eliminar';
        btnDeleteMember.className = 'btn btn-danger';

        //Show information in the table
        let row = this._table.insertRow(-1);
        let cell = row.insertCell(0);
        cell.innerHTML = member.name;
        cell = row.insertCell(1);
        cell.innerHTML = member.email;
        cell = row.insertCell(2);
        cell.innerHTML = member.birthday;
        cell = row.insertCell(3);
        cell.appendChild(btnDeleteMember);

        //Add listenners
        btnDeleteMember.addEventListener('click', () => {
            //To delete the member the key primary will be his email
            this._deleteMember(IDcourse, member.email);
        });
    }

    _deleteMember(IDcourse, email) {
        //Update array courses
        this._updateArrayCourses();
        //Index of the member
        let indexMember = -1;
        //Find the course
        this._courses.forEach((objCourse, indexCourse) => {
            if (objCourse.ID === IDcourse) {
                //Found the member with his email
                objCourse.members.forEach((objMember, index) => {
                    if (objMember.email === email) {
                        indexMember = index;
                        return;
                    }
                });
                //Delete member
                objCourse.registeredMembers--;
                objCourse.members.splice(indexMember, 1);
                //Update Array courses
                this._courses.splice(indexCourse, 1, objCourse);
                return;
            }
        });
        //Save courses
        localStorage.setItem('courses', JSON.stringify(this._courses));
        //Update the table
        //this._update(IDcourse);
        this._tableCourses._update(IDcourse);
    }

    _update(IDcourse) {
        //Remove all rows of the table
        for (let i = this._table.rows.length - 1; i > 1; i--) {
            this._table.deleteRow(i);
        }

        //Fill the table with new members
        this.initTable(IDcourse);
    }
}