import React from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";

function SignInForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form">
            <Link href={"/"}>
                <button type="button" className="close-button" onClick={() => {
                    // Add code here to close the form
                }}>
                    &times;
                </button>
            </Link>

            <h2 className="title bold-text">Sign In</h2>
            <div className="form-group">
                <label htmlFor="email" className="bold-text">Email</label>
                <input
                    id="email"
                    type="email"
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address"
                        }
                    })}
                    className={`form-control ${errors.email ? "input-error" : ""}`}
                />
                {errors.email && <p className="error-message">{errors.email.message}</p>}
            </div>
            <div className="form-group">
                <label htmlFor="password" className="bold-text">Password</label>
                <input
                    id="password"
                    type="password"
                    {...register("password", { required: "Password is required" })}
                    className={`form-control ${errors.password ? "input-error" : ""}`}
                />
                {errors.password && <p className="error-message">{errors.password.message}</p>}
            </div>
            <button type="submit" className="submit-button">
                Sign In
            </button>
            <p className="signup-link">
                Don't have an account? <a href="/overlay2" className="bold-text">Sign Up</a>
            </p>
        </form>
    );
}

export default SignInForm;
