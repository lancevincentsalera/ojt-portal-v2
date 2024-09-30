import { getCurrentDate } from "../../../../Functions/common";

export const StudentModel = {
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    studentId: "",
    degreeProgramId: 0, 
    designation: "",
    mentorId: 0,
    teacherId: 0,
    division: "",
    startDate: getCurrentDate(), 
    hrsToRender: 0,
    shift: {
        start: "",
        end: "",
        dailyDutyHrs: 0,
        workingDays: "WeekdaysOnly"
    }
};
  
export const SupervisorModel = {
    firstName: "",
    lastName: "",
    email: "",
    companyName: "",
    position: "",
    companyEmail: "",
    companyContact: "",
    companyAddress: "",
    password: "",
};
