export default class TableMembers {
    constructor(table) {
        this._table = table;
        this._courses = new Array();
    }

    initTable(IDcourse) {
        if (localStorage.getItem('courses') != null) {
            this._courses = JSON.parse(localStorage.getItem('courses'));
        }

        this._courses.forEach((objCourse) => {
            if (objCourse.ID === IDcourse) {
                if (objCourse.members != null) {
                    objCourse.members.forEach((member) => {
                        this._addMember(member);
                    });
                } else {
                    return;
                }
            }
        });
    }

    _addMember(member) {
        let row = this._table.insertRow(-1);
        let cell = row.insertCell(0);
        cell.innerHTML = member.name;
        cell = row.insertCell(1);
        cell.innerHTML = member.email;
        cell = row.insertCell(2);
        cell.innerHTML = member.birthday;
    }

    update(IDcourse) {
        //Remove all rows of the table
        for (let i = this._table.rows.length - 1; i > 1; i--) {
            this._table.deleteRow(i);
        }

        //Fill the table with new members
        this.initTable(IDcourse);
    }
}