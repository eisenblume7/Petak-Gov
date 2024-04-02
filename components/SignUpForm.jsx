import React from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";

function SignUpForm() {
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
            <h2 className="title bold-text">Sign Up</h2>
            <div className="form-group">
                <label htmlFor="name" className="bold-text">Name</label>
                <input
                    id="name"
                    type="text"
                    {...register("name", { required: "Name is required" })}
                    className={`form-control ${errors.name ? "input-error" : ""}`}
                />
                {errors.name && <p className="error-message">{errors.name.message}</p>}
            </div>
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
                    {...register("password", {
                        required: "Password is required",
                        minLength: { value: 8, message: "Password must be at least 8 characters long" }
                    })}
                    className={`form-control ${errors.password ? "input-error" : ""}`}
                />
                {errors.password && <p className="error-message">{errors.password.message}</p>}
            </div>
            <div className="form-group">
                <label htmlFor="confirmPassword" className="bold-text">Confirm Password</label>
                <input
                    id="confirmPassword"
                    type="password"
                    {...register("confirmPassword", {
                        required: "Confirm Password is required",
                        validate: (value) => value === data.password || "Passwords do not match"
                    })}
                    className={`form-control ${errors.confirmPassword ? "input-error" : ""}`}
                />
                {errors.confirmPassword && <p className="error-message">{errors.confirmPassword.message}</p>}
            </div>
            <button type="submit" className="submit-button">
                Sign Up
            </button>
            <p className="signin-link mt-5">
                Already have an account? <a href="/overlay" className="bold-text">Sign In</a>
            </p>
        </form>
    );
}

export default SignUpForm;
