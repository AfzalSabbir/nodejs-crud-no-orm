var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test', { useUnifiedTopology: true });
mongoose.connection.once('open', function (){
    console.log('success mongo')
}).on('error', function(error){
    console.log('error: '+error);
});
