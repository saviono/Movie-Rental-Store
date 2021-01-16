
const mongoose =  require('mongoose'); 

module.exports = function () {
    mongoose.connect('mongodb+srv://savion:nF5ppBlDLVh80XuN@cluster0.wvdzb.mongodb.net/<dbname>?retryWrites=true&w=majority')
.then(() => console.log('Connected to MongoDB...'))
.catch((err) => console.log('Could not connect to MongoDB...', err));
}