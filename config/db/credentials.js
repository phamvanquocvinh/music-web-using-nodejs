const mongoose = require('mongoose');
const start = async () => {
    try {
      await mongoose.connect(
        "mongodb+srv://vinh:abc123456@cluster0.kdazost.mongodb.net/nodejs_final?retryWrites=true&w=majority",{
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      );
      console.log("Connected...");
    } catch (error) {
      console.log(error);
      console.log("Connection failed");
    }
};
mongoose.set('strictQuery', true);

module.exports = { start };