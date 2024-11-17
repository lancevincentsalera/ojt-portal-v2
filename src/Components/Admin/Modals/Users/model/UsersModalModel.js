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
    studentId: "",
    degreeProgramId: 0,
    teacherId: 0,
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
