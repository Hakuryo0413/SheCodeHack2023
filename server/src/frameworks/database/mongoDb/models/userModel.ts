import {Schema, model} from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Vui lòng nhập đầy đủ tên"]
    },
    email: {
        type: String,
        required: [true, "Vui lòng nhập email"]
    }, 
    phone: {
        type : Number,
        required: false
    }, 
    password: {
        type: String
    },
    gender: {
        type: String
    },
    birthday: {
        type: Date
    }, 
    address: {
        type: String
    },
    image: {
        type: String,
    },
    about: {
        type: String,
    },
    experience: {
        type: String
    },
    profession: {
        type: String
    },
    resume: {
        type: Object
    },
    education: {
        type: String
    },
    page2q1: {
        type: Boolean
    },
    page2q2: {
        type: Boolean
    },
    page2q3: {
        type: String
    },
    page2q4: {
        type: String
    },
    page2q5: {
        type: String
    },
    page2q6: {
        type: String
    },
    page2q7: {
        type: String
    },
    page2q8: {
        type: String
    },
    page2q9: {
        type: String
    },

    page3q1: {
        type: Boolean
    },
    page3q2: {
        type: Boolean
    },
    page3q3: {
        type: String
    },
    page3q4: {
        type: String
    },
    type: {
        type: String,
        default: "user"
    },
})

export const User = model("User", userSchema, "users")
export type UserModel = typeof User;