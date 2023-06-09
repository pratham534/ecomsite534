import React from 'react'
import Base from '../core/Base'
import { signup } from '../auth/helper/index'
import { Link } from 'react-router-dom'

export default function Signup() {

    // function redirectLogin(event){
    //     return ({ component: () => <Navigate to="/signin" replace={true}/> })
    // }

    const [value, setValue] = React.useState({
        name: "",
        email: "",
        password: "",
        cpassword: "",
        error: "",
        success: false,
    })
    const [errors, setErrors] = React.useState({
        name_err: "",
        email_err: "",
        password_err: ""
    })

    function handleChange(event) {
        const { name, value } = event.target
        setValue((prev) => {
            return ({
                ...prev,
                [name]: value
            })
        })
        setErrors({
            name_err: "",
            email_err: "",
            password_err: ""
        })
    }

    function validation(data){
        if(data.is_active){
            setValue({
                name: '',
                email: '',
                password: '',
                cpassword: '',
                error: '',
                success: true
            })
        }
        else if(data.name){
            setErrors({
                ...errors,
                name_err: data.name[0]
            })
        }
        else if(data.email){
            setErrors({
                ...errors,
                name_err: "",
                email_err: data.email[0]
            })
        }
        else if(data.password){
            setErrors({
                ...errors,
                email_err: "",
                password_err: data.password[0]
            })
        }
    }

    function handleClick(event) {
        if((value.cpassword).localeCompare(value.password) === 0){
            setValue({
                ...value,
                error: false
            })
            signup({
                "name": value.name,
                "email": value.email,
                "password": value.password
            })
                .then((data) => {
                    console.log("DATA", data, typeof(data))
                    setErrors({
                        name_err: "",
                        email_err: "",
                        password_err: ""
                    })
                    validation(data)
                })
                .catch((err) => console.log(err))
        }else{
            setErrors({
                ...errors,
                password_err: "Passwords doesn't match"
            })
        }
    }

    return (
        <Base title='SignUp' description=''>
            <div className='container w-80 mt-5 mb-5 p-5'>
                <div className='container w-100 text-center'>
                    {value.success && <p className='container m-0'>SignUp successful {<Link to="/signin" className='d-inline-block text-decoration-none'>Login Now</Link>}</p>}
                </div>
                <div className='container w-50'>
                    <input
                        className='w-100 m-2 p-1'
                        name='name'
                        type='text'
                        placeholder='Name'
                        value={value.name}
                        onChange={handleChange}
                    />
                    <p className='container m-0'>{errors.name_err}</p>
                </div>
                <div className='container w-50'>
                    <input
                        className='w-100 m-2 p-1'
                        name='email'
                        type='text'
                        placeholder='Email'
                        value={value.email}
                        onChange={handleChange}
                    />
                    <p className='container m-0'>{errors.email_err}</p>
                </div>
                <div className='container w-50'>
                    <input
                        className='w-100 m-2 p-1'
                        name='password'
                        type='password'
                        placeholder='Password'
                        value={value.password}
                        onChange={handleChange}
                    />
                    <p className='container m-0'>{errors.password_err}</p>
                </div>
                <div className='container w-50'>
                    <input
                        className='w-100 m-2 p-1'
                        name='cpassword'
                        type='password'
                        placeholder='Confirm Password'
                        value={value.cpassword}
                        onChange={handleChange}
                    />
                </div>
                <div className='container w-50'>
                    <button className='btn btn-dark btn-block m-2' type='Submit' onClick={handleClick}>Submit</button>
                </div>
            </div>
            {/* <div className='text-center'>
                {JSON.stringify(value)}
            </div> */}
        </Base>
    )
}