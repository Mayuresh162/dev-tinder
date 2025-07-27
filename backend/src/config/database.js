const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://mayuresh:DShPynkSgQlctSps@cluster0.8krg2ia.mongodb.net/devTinder?retryWrites=true&w=majority&appName=Cluster0")
}

module.exports = connectDB;
