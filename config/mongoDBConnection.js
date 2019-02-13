const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://eliastwo:eliastwo1@ds119085.mlab.com:19085/userauthproject3', {
	useMongoClient: true
});
let db = mongoose.connect;