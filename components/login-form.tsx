import { Formik, Field, Form, FormikHelpers } from 'formik';
import styles from './login-form.module.css'
import axios from 'axios';
import Router from 'next/router'
import Swal from 'sweetalert2'


interface Values {
    email: string;
    password: string;
}

export default function LoginForm() {
    return (
      <div className={styles.login_box + ' p-3'}>
        <h1 className="display-6 mb-3">Login</h1>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}

          onSubmit={(
            values: Values,
            { setSubmitting }: FormikHelpers<Values>
          ) => {
            axios.get('https://run.mocky.io/v3/7a7353bd-974e-4b9f-89c9-3defd93cd70b').then(response => {
            console.log(response.data.data);     
            const result = response.data.data.filter((xx:any)=>
            xx.email == values.email
            )
            console.log(result)
            if(result.length>0){
              console.log("User correct")
              const resultpassword = result.filter((xx:any)=>
              xx.first_name == values.password
            )
            console.log(resultpassword)
            if(resultpassword.length>0){
              console.log("password is correct")
              Swal.fire(
                'Success',
                'Login Success',
                'success'
              )
              Router.push("/main")
            }else{
              Swal.fire({
                icon: 'error',
                title: 'Incorrect Password',
                text: '',
                footer: '<a href="">Why do I have this issue?</a>'
              })
              console.log("incorrect password")
            }
            }else{
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                footer: '<a href="">Why do I have this issue?</a>'
              })
              console.log("Login failed")
            }}); 
            setSubmitting(false);
          }}

        >
          <Form>
            <div className="mb-3">
              <Field className="form-control" id="email" name="email" placeholder="Email" aria-describedby="usernameHelp" />
            </div>
  
            <div className="mb-3">
              <Field className="form-control" id="password" name="password" placeholder="Password" type="password" />
            </div>

            <button type="submit" className="btn btn-primary">Login</button>
          </Form>
        </Formik>
      </div>
    );
  };