import { Link } from "react-router-dom";

import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import toast from "react-hot-toast";




const Register = () => {
    const { createUser } = useContext(AuthContext)



    const {
        register,
        handleSubmit,

        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        

        createUser(data.email, data.password)
            .then(res => {
                const user = res.user;
                toast.success('User created successfully')
                console.log(user)
                
            })
            .catch(err => {
                console.log(err.message)
                toast.error(err.message)
            })
    }


    // const handleRegister = (e) => {
    //     e.preventDefault();
    //     const form = e.target;
    //     const name = form.name.value;
    //     const email = form.email.value;
    //     const password = form.password.value;
    //     const newUser = { name, email, password }
    //     console.log(newUser)
    // }



    return (
        <>
            <Helmet>
                <title>
                    Bistro | Register
                </title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">


                <div className="hero-content flex-col md:flex">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)}
                            className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">name</span>
                                </label>
                                <input type="text" {...register("name", { required: true })} name="name" placeholder="your name" className="input input-bordered" />
                                {errors.name && <span className="text-red-600">This field is required</span>}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" />
                                {errors.email && <span className="text-red-600">This field is required</span>}
                            </div>




                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 20,
                                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,

                                })} name="password" placeholder="password" className="input input-bordered" required />
                                {errors.password?.type === "required" && (
                                    <p className="text-red-600">password is required</p>
                                )}
                                {errors.password?.type === "minLength" && (
                                    <p className="text-red-600">password must be 6 characters</p>
                                )}
                                {errors.password?.type === "maxLength" && (
                                    <p className="text-red-600">password maxLength shold  be 20 characters</p>
                                )}
                                {errors.password?.type === "maxLength" && (
                                    <p className="text-red-600">password maxLength less than  be 20 characters</p>
                                )}
                                {errors.password?.type === "pattern" && (
                                    <p className="text-red-600">password uppercase lowercase characters</p>
                                )}

                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>




                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="REGISTER" />
                            </div>
                            <p className='text-orange-400 text-center mt-2 font-semibold'>Already registered? <Link to={'/login'}>Go to log in</Link></p>

                            <p className="mt-2 font-semibold text-center">Or sign up with</p>

                            <div className="flex gap-4 justify-center items-center">
                                <FaFacebookF className="text-4xl border-2 rounded-full py-2 border-black" />
                                <FaGithub className="text-4xl border-2 rounded-full py-2 border-black" />
                                <FaGoogle className="text-4xl border-2 rounded-full py-2 border-black" />



                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;