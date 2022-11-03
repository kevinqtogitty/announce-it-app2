import mongoose from 'mongoose';

const connectToMongo = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://test_user:ethereum6767@cluster0.e2f3zw7.mongodb.net/?retryWrites=true&w=majority'
    );

    console.log('success');
  } catch (error) {
    console.log(error);
  }
};

export default connectToMongo;
