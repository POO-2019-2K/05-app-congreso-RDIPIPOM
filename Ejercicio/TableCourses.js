export default class TableCourses{
    constructor(table){
        //localStorage.removeItem('courses');
        this._table = table;
        this._courses = new Array();
        this._initTable();
    }

    _initTable(){
        //Fill array courses
        if(localStorage.getItem('courses') != null){
            this._courses = JSON.parse(localStorage.getItem('courses'));
        }
        console.log(this._courses);
        //Add to table
        this._courses.forEach((objCourse) => {
            this.addCourse(objCourse);
        });
    }

    addCourse(objCourse){
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
        cell.innerHTML = objCourse.duration;
        this._addBtnAddMember(row, objCourse);
    }

    _addBtnAddMember(row, course) {
        let btnAddMember = document.createElement("input");
        btnAddMember.type = "button";
        btnAddMember.value = 'Añadir Participante';
        btnAddMember.className = 'btn btn-primary';
        btnAddMember.addEventListener('click', () => {
          alert('Funcionalidad en producción, no disponible');
        });

        row.insertCell(6);
        row.cells[6].appendChild(btnAddMember);
      }
}