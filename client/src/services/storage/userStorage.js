import { v4 } from "uuid";

export const createUser = () => {
  const H_U_I_1 = v4();
  localStorage.setItem("H_U_I_1", H_U_I_1);  
  return H_U_I_1;
};

export const loadUser = () => {
  let H_U_I_1 = localStorage.getItem("H_U_I_1");
  if (!H_U_I_1) {
    H_U_I_1 = createUser();
  }
  return H_U_I_1;
};
