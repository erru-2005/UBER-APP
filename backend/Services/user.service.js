const usermodel = require("../models/user.model")



module.exports.createUser = async ({firstname,lastname,email,password}) => {
    if (!firstname || !email || !password) {
        throw new Error('All fields are required');
    }
    try{
    const user = usermodel.create({
       fullname:{
              firstname,
              lastname
       },
        email,
        password
    });
    return user;
}
catch(err)
{
    throw new Error(err.message);
}

}