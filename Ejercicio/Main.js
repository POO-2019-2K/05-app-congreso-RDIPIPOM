import TableCourses from './TableCourses.js';

export default class Main {
    constructor() {
        this._courses = new Array();
        if (localStorage.getItem('courses') != null) {
            this._courses = JSON.parse(localStorage.getItem('courses'));
        }

        let tableCourses = new TableCourses(document.querySelector('#tableCourses'), document.querySelector('#tableMembers'), null);

        document.querySelector('#btnAdd').addEventListener('click', () => {
            if (document.querySelector('#form').checkValidity()) {
                //Update the table
                tableCourses._update();
                //The ID already exist?                
                if (!(this._isIDRegister(Number(document.querySelector('#IDcourse').value)))) {
                    //Create object
                    let objCourse = this._createObjCourse();
                    //Add and save in LocalStorange
                    this._courses.push(objCourse);
                    localStorage.setItem('courses', JSON.stringify(this._courses));
                    //Show in table
                    tableCourses.addCourse(objCourse);
                } else {
                    swal.fire({
                        type: 'warning',
                        title: 'Advertencia',
                        text: 'Este ID ya ha sido registrado anteriormente, por favor modifíquelo'
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
        });
    }

    _createObjCourse() {
        //Format dates
        let stringStartDate = new Date(document.querySelector('#startDate').value);
        stringStartDate = (stringStartDate.getDate() + 1) + '/' + (stringStartDate.getMonth() + 1) + '/' + stringStartDate.getFullYear();

        let stringFinishDate = new Date(document.querySelector('#finishDate').value);
        stringFinishDate = (stringFinishDate.getDate() + 1) + '/' + (stringFinishDate.getMonth() + 1) + '/' + stringFinishDate.getFullYear();

        //Create object
        let objCourse = {
            ID: Number(document.querySelector('#IDcourse').value),
            name: document.querySelector('#courseName').value,
            stringStartDate: stringStartDate,
            stringFinishDate: stringFinishDate,
            spaceAvailable: Number(document.querySelector('#spaceAvailable').value),
            registeredMembers: 0,
            duration: Number(document.querySelector('#duration').value),
            members: new Array()
        }

        return objCourse;
    }

    _isIDRegister(ID) {
        let IsIDRegister = false;
        this._courses.forEach((objCourse) => {
            if (Number(objCourse.ID) == ID) {
                IsIDRegister = true;
                return;
            }
        });
        return IsIDRegister;
    }
}


let main = new Main();