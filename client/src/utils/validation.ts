import * as yup from "yup";

export const userRegisterValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Yêu cầu nhập tên")
    .matches(
      /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/,
      "Nhập tên hợp lệ"
    ),
  email: yup
    .string()
    .required("Yêu cầu nhập địa chỉ email")
    .email("Địa chỉ email không hợp lệ"),
  phone: yup
    .string()
    .required("Yêu cầu nhập số điện thoại")
    .matches(/^\d{10}$/, "Nhập số điện thoại hợp lệ"),
  password: yup
    .string()
    .required("Yêu cầu nhập mật khẩu")
    .min(6, "Mật khẩu cần có ít nhất 6 kí tự"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Mật khẩu không trùng khớp"),
});

export const userLoginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required("Yêu cầu nhập địa chỉ email")
    .email("Địa chỉ email không hợp lệ"),
  password: yup
    .string()
    .required("Yêu cầu nhập mật khẩu")
    .min(6, "Mật khẩu cần có ít nhất 6 kí tự"),
});

export const cofounderRegisterValidationSchema = yup.object().shape({
  companyName: yup
    .string()
    .required("Yêu cầu nhập tên")
    .matches(/^[a-zA-Z][a-zA-Z ]+[a-zA-Z]*$/, "Nhập tên hợp lệ"),
  email: yup
    .string()
    .required("Yêu cầu nhập địa chỉ email")
    .email("Địa chỉ email không hợp lệ"),
  // industry: yup.string().required("Industry is required"),
  location: yup.string().required("Yêu cầu nhập địa chỉ"),
  password: yup
    .string()
    .required("Yêu cầu nhập mật khẩu")
    .min(6, "Mật khẩu cần có ít nhất 6 kí tự"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Mật khẩu không trùng khớp"),
});

export const jobUpdateValidationSchema = yup.object().shape({
  title: yup.string().required("Yêu cầu tên dự án"),
  topic: yup.string().required("Yêu cầu chủ đề"),
  role: yup.string().required("Yêu cầu vai trò"),
  education: yup.string().required("Yêu cầu trình độ"),

  description: yup.string().required("Yêu cầu mô tả dự án"),
  location: yup.string().required("Yêu cầu địa chỉ"),
  // employmentType: yup.string().required("Employment Type is required"),
  requirements: yup
    .mixed()
    .test(
      "isArrayOrString",
      "Requirements must be an array or a string",
      function (value) {
        const { createError, path } = this;
        if (Array.isArray(value) || typeof value === "string") {
          return true;
        }
        return createError({
          path,
          message: "Requirements must be an array or a string",
        });
      }
    )
    .required("At least one requirement is required"),
  responsibilities: yup
    .mixed()
    .test(
      "isArrayOrString",
      "Responsibilities must be an array or a string",
      function (value) {
        const { createError, path } = this;
        if (Array.isArray(value) || typeof value === "string") {
          return true;
        }
        return createError({
          path,
          message: "Responsibilities must be an array or a string",
        });
      }
    )
    .required("At least one responsibility is required"),
  // salary: yup
  //   .number()
  //   .required("Salary is required")
  //   .positive("Salary must be a positive number"),
  openings: yup
    .number()
    .required("Openings is required")
    .integer("Openings must be an integer")
    .positive("Openings must be a positive number"),
});

export const jobCreationValidationSchema = yup.object().shape({
  title: yup.string().required("Yêu cầu tên dự án"),
  topic: yup.string().required("Yêu cầu chủ đề"),
  role: yup.string().required("Yêu cầu vai trò"),
  joined: yup.string().required("Yêu cầu tham gia"),
  education: yup.string().required("Yêu cầu trình độ"),
  workplace: yup.string().required("Yêu cầu phương thức"),

  description: yup.string().required("Yêu cầu mô tả dự án"),
  location: yup.string().required("Yêu cầu địa chỉ"),
  language: yup.string().required("Yêu cầu ngôn ngữ"),
  // experience: yup.string().required("Yêu cầu kinh nghiệm"),

  timetable: yup.string().required("Yêu cầu thời gian"),

  // employmentType: yup.string().required("Employment Type is required"),
  requirements: yup
    .mixed()
    .test(
      "isArrayOrString",
      "Requirements must be an array or a string",
      function (value) {
        const { createError, path } = this;
        if (Array.isArray(value) || typeof value === "string") {
          return true;
        }
        return createError({
          path,
          message: "Requirements must be an array or a string",
        });
      }
    )
    .required("At least one requirement is required"),
  responsibilities: yup
    .mixed()
    .test(
      "isArrayOrString",
      "Responsibilities must be an array or a string",
      function (value) {
        const { createError, path } = this;
        if (Array.isArray(value) || typeof value === "string") {
          return true;
        }
        return createError({
          path,
          message: "Responsibilities must be an array or a string",
        });
      }
    )
    .required("At least one responsibility is required"),
  // salary: yup
  //   .number()
  //   .required("Salary is required")
  //   .positive("Salary must be a positive number"),
  openings: yup
    .number()
    .required("Openings is required")
    .integer("Openings must be an integer")
    .positive("Openings must be a positive number"),
  experience: yup
    .number()
    .required("Experience is required")
    .integer("Experience must be an integer")
    .positive("Experience must be a positive number"),
});
