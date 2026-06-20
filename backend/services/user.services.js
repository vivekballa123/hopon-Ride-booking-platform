import userModel from "../models/user.model.js"

export default {
    createUser: async (firstname, lastname, email, password)=>{
        console.log(firstname, lastname, email, password);
        if(!email || !password || !firstname){
            throw new Error('All fields are required')
        }
        const user = userModel.create({
            fullname: {
                firstname,
                lastname
            },
            email,
            password: password,
        })
        return user;
    }}