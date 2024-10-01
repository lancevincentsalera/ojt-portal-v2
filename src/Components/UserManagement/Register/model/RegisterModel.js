import { getCurrentDate } from "../../../../Functions/common";

export const StudentModel = {
    email: null,
    firstName: null,
    lastName: null,
    password: null,
    studentId: null,
    degreeProgramId: null, 
    designation: "",
    mentorId: null,
    teacherId: null,
    division: "",
    startDate: null, 
    hrsToRender: 0,
    shift: {
        start: null,
        end: null,
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
