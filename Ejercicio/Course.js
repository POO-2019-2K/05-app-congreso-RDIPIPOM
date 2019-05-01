export default class Course{
    constructor(objCourse){
        this._name = objCourse.name;
        this._startDate = objCourse.stringStartDate;
        this._finishDate = objCourse.stringFinishDate;
        this._spaceAvailable = objCourse.spaceAvailable;
        this._duration = objCourse.duration;
    }
}