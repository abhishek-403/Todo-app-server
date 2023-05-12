const mongoose = require('mongoose');
const mongoUrl = "mongodb+srv://abhishek79009:CyyjejubGN6PiL5U@cluster0.yqwxw4e.mongodb.net/?retryWrites=true&w=majority"
async function connecting(){
    try {
    
        mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
                console.log(`MongoDB connected`);
            })
    
    } catch (e) {
        console.log(e);
        process.exit(1);
    }

}


module.exports= connecting;