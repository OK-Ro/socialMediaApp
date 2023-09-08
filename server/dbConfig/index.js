import mongoose from 'mongoose';

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('DB connected successfully');
  } catch (error) {
    console.error('Sorry, we are currently experiencing technical difficulties. Please try again later.');
    console.error('Error details:', error.message);
    throw error; 
  }
};

export default dbConnection;
