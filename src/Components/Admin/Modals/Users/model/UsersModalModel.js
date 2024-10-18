export const UsersModalModel = () => {
  const adminFields = {
    email: "",
    firstName: "",
    lastName: "",
  };
  const chairFields = {
    email: "",
    firstName: "",
    lastName: "",
    departmentCode: "",
    designation: "",
  };

  const mentorFields = {
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    company: {
      companyName: "",
      contactNo: "",
      contactEmail: "",
      address: {
        street: "",
        city: "",
        state: "",
        country: "",
      },
    },
    department: "",
    designation: "",
  };

  const internFields = {
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
    startDate: "",
    hrsToRender: 0,
    shift: {
      start: "",
      end: "",
      dailyDutyHrs: 0,
      workingDays: "",
      includePublicPhHolidays: true,
    },
  };

  const teacherFields = {
    email: "",
    firstName: "",
    lastName: "",
    departmentCode: "",
    designation: "",
  };

  return {
    internFields,
    teacherFields,
    mentorFields,
    chairFields,
    adminFields,
  };
};
