import * as Yup from "yup";

export const loginValidationSchema = Yup.object({
  username: Yup.string().min(3, "Too short").required("Required"),
  password: Yup.string().min(4, "Too short").required("Required"),
});
