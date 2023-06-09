import React from 'react'
import Base from '../core/Base'
import { authenticate, signin } from '../auth/helper/index'
import { Link, useNavigate } from 'react-router-dom'

export default function Signin() {

    const navigate = useNavigate()

    const [value, setValue] = React.useState({
        email: "",
        password: "",
        error: "",
        success: false,
    })
    const [errors, setErrors] = React.useState({
        err:"",
        exists: true
    })

    function handleChange(event) {
        const { name, value } = event.target
        setValue((prev) => {
            return ({
                ...prev,
                [name]: value
            })
        })
    }

    function validation(data) {
        if (data.token) {
            setValue({
                email: '',
                password: '',
                error: '',
                success: true
            })
            setErrors({
                err: "Login Successful"
            })
        }
        else {
            if(value.email === ""){
                setErrors((prev)=>{
                    return ({
                        ...prev,
                        err: "Email cannot be blank"
                    })
                })
            }
            else{
                setErrors((prev)=>{
                    return ({
                        ...prev,
                        err: data.error
                    })
                })
            }
            if(data.exists === 'false'){
                setErrors((prev)=>{
                    return ({
                        ...prev,
                        exists: data.exists
                    })
                })
            }
            // console.log(errors.exists)
        }
    }

    function handleClick(event) {
        setValue({
            ...value,
            error: false
        })
        signin({
            "email": value.email,
            "password": value.password
        })
            .then((data) => {
                console.log("DATA", data)
                if(data.token) {
                    authenticate(data)
                    navigate("/")
                }
                setErrors({
                    err: "",
                    exists: true
                })
                validation(data)
            })
            .catch((err) => console.log(err))
    }

    function signuplink (){
        // console.log(errors.exists)
        if(errors.exists === true){
            return <p className='d-none'></p>
        }else{
            return (
                <Link to='/signup'><p className='container d-inline-block text-center w-auto m-0'>SignUp</p></Link>
            )
        }
    }

    return (
        <Base title='Login' description=''>
            <div className='container w-80 mt-5 mb-5 p-5'>
                <div className='container-fluid m-1 text-center w-auto'>
                    {errors.err && <p className='container d-inline-block text-center m-0 w-auto'>{errors.err}</p>}
                    {signuplink()}
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
                </div>
                <div className='container w-50'>
                    <button className='btn btn-dark btn-block m-2' type='Submit' onClick={handleClick}>Submit</button>
                </div>
            </div>
        </Base>
    )
}