"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import CustomSelect from "@/components/CustomSelect/CustomSelect";
import { options } from "../../../Utils/FakeData/ReactSelectFake";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import CustomInput from "@/components/InputFields/CustomInput";
import Select from "react-select";
import Button from "@/components/Button/Button";
import { Auth } from "@/store/Auth";

const LoginPage = () => {
  const bears = Auth((state: any) => state.bears);

  const router = useRouter();
  const [error, setError] = useState("");
  const SignInSchema = Yup.object().shape({
    username: Yup.string().max(50, "Too Long!").required("Required"),
    password: Yup.string().max(50, "Too Long!").required("Required"),
    selectedOption: Yup.object().required("Please select an option"),
  });

  // console.log(bears);

  const customStyles = "w-full text-sm text-opacity-70 ";
  const customInputStyle =
    "border-solid border-2 border-borderColor rounded-md  w-full focus:outline-none min-h-[38px] p-1";

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      selectedOption: null,
    },
    validationSchema: SignInSchema,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      alert(JSON.stringify(values, null, 2));

      const handleLogin = async () => {
        const result = await signIn("credentials", {
          username: values.username,
          password: values.password,
          redirect: false,
          // You can provide any additional data or options here
        });

        console.log({ result });

        if (result?.ok) {
          alert("LoggedIn Successful");
          router.push("/");
        } else {
          alert(result?.error);
          setError("Incorrect username or password");
        }
      };
      handleLogin();
    },
  });

  return (
    <div className='h-screen flex justify-center items-center	'>
      <div className='flex m-2'>
        <div className='hidden md:block'>
          <Image src='/LoginImg.png' alt='me' width='420' height='64' />
        </div>
        <div className='p-[3rem] bg-white lg:w-[640px] rounded-tr-lg rounded-br-lg'>
          <div className='flex gap-2 items-center mb-10'>
            <Image src='/Logo.png' alt='me' width='20' height='20' />
            <h2 className='font-semibold text-md text-main'>Whiteboard.Apollonia</h2>
          </div>
          <div className='mb-[32px]'>
            <h1 className='text-lg font-medium'>Login to your account</h1>
            <p className='text-sm text-subText'>Please enter your email & password to log in</p>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className='mb-[32px]'>
              <p className='text-sm text-subText mb-1'>Clinic</p>
              <CustomSelect
                options={options}
                name='selectedOption'
                value={formik.values.selectedOption}
                onChange={(selectedOption: any) =>
                  formik.setFieldValue("selectedOption", selectedOption)
                }
                placeholder='Select a clinic'
                onBlur={formik.handleBlur}
                styles={customStyles}
              />
              {formik.errors.selectedOption && formik.touched.selectedOption ? (
                <div>
                  <p className='text-error text-xs'>{formik.errors.selectedOption}</p>
                </div>
              ) : null}
            </div>
            <div className='mb-[32px]'>
              <p className='text-sm text-subText mb-1'>Username</p>
              <CustomInput
                name='username'
                className={customInputStyle}
                type='text'
                onChange={formik.handleChange}
                value={formik.values.username}
              />
              {formik.errors.username && formik.touched.username ? (
                <div>
                  <p className='text-error text-xs'>{formik.errors.username}</p>
                </div>
              ) : null}
            </div>

            <div className='mb-[32px]'>
              <p className='text-sm text-subText mb-1'>Password</p>
              <CustomInput
                name='password'
                className={customInputStyle}
                type='text'
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              {formik.errors.password && formik.touched.password ? (
                <div>
                  <p className='text-error text-xs'>{formik.errors.password}</p>
                </div>
              ) : null}
            </div>
            {error ? <p className='text-error text-xs mb-5'>{error}</p> : ""}
            <Button
              type='submit'
              className='bg-primary text-white flex items-center px-5 py-2 rounded-md gap-2'
              onClick={() => console.log("clicked")}
            >
              <p>Login</p>

              <Image src='/Arrow.png' alt='me' width='20' height='20' />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
