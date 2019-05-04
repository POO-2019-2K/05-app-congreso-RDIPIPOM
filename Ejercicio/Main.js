import TableCourses from './TableCourses.js';

export default class Main {
    constructor() {
        let courses = new Array();
        if (localStorage.getItem('courses') != null) {
            courses = JSON.parse(localStorage.getItem('courses'));
        }
        
        let tableCourses = new TableCourses(document.querySelector('#tableCourses'), document.querySelector('#tableMembers'));

        document.querySelector('#btnAdd').addEventListener('click', () => {
            if (document.querySelector('#form').checkValidity()) {
                //Create object
                let objCourse = this._createObjCourse();
                //Add and save in LocalStorange
                courses.push(objCourse);
                localStorage.setItem('courses', JSON.stringify(courses));
                //Show in table
                tableCourses.addCourse(objCourse);
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
            duration: Number(document.querySelector('#duration').value),
            members: new Array()
        }

        return objCourse;
    }
}


let main = new Main();