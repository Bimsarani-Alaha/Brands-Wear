const mongoose = require('mongoose');
const URL = 'mongodb+srv://Bimsarani:Bimsarani2002@brandswear.ok7vo.mongodb.net/'

module.exports = () => {
    return mongoose.connect(URL);
}