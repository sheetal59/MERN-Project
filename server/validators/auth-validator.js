const { z } = require("zod");

//creating an object schema

const signupSchema = z.object({
    username: z
    .string({required_error: "name is required" })
    .trim()
    .min(3, {message: "name must be at least of 3 chars." })
    .max(255, { message: "name must not be more than 255 characters" }),

    email: z
    .string({required_error: "Email is required" })
    .trim()
    .email({message:"Invalid email address"})
    .min(3,{message:"Email must be at least of 3 chars"})
    .max(255,{message:"email must not be more than 255 chars"}),

    phone: z
    .string({ required_error: "Phone is required"})
    .trim()
    .min(10,{ message: "Phone must be at least 10 chars"})
    .max(20, {message:"Phone must not be more than 20 chars"}),

    password: z 
    .string({ required_error:"Password is required" })
    .min(7, {message:"Password must be at least of 6 characters"})
    .max(1024, "Password cant be greater than 1024"),

});

const loginSchema = z.object({


    email: z
    .string({required_error: "Email is required" })
    .trim()
    .email({message:"Invalid email address"})
    .min(3,{message:"Email must be at least of 3 chars"})
    .max(255,{message:"email must not be more than 255 chars"}),


    password: z 
    .string({ required_error:"Password is required" })
    .min(7, {message:"Password must be at least of 6 characters"})
    .max(1024, "Password cant be greater than 1024"),

});

const contactSchema = z.object({

    username: z
    .string({required_error: "name is required" })
    .trim()
    .min(3, {message: "name must be at least of 3 chars." })
    .max(255, { message: "name must not be more than 255 characters" }),

    email: z
    .string({required_error: "Email is required" })
    .trim()
    .email({message:"Invalid email address"})
    .min(3,{message:"Email must be at least of 3 chars"})
    .max(255,{message:"email must not be more than 255 chars"}),


    message: z 
    .string({ required_error:"Message is reqquired" })
    .min(10, {message:"message must be at least of 10 characters"})
    .max(5000, "message cant be greater than 5000 chars"),

});

module.exports = {signupSchema, loginSchema, contactSchema };
