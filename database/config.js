const mongoose = require('mongoose');

const dbConection = async() => {
  try {
    await mongoose.connect(process.env.MONGO_CNN, {
      socketTimeoutMS: 4500000
    })
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // // useCreateIndex: true,
      // // useFindAndModify: false
    
  } catch (error) {
    console.log(error);
    throw new Error('no se puede iniciar la base de datos')
  }
}

module.exports = {
  dbConection
}