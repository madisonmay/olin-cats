var mongoose = require("mongoose");
/*
 * GET cats listing.
 */
var db = mongoose.connection;

Array.prototype.sortByProp = function(p){
 return this.sort(function(a,b){
  return (a[p] > b[p]) ? 1 : (a[p] < b[p]) ? -1 : 0;
 });
}

var catSchema = mongoose.Schema({
    name: String,
    colors: Array(),
    age: Number
});

exports.list = function(req, res){
  var Cat = mongoose.model('Cat', catSchema);
  Cat.find({}, function (err, db_cats) {
    if(err) {console.log("Error")}
    console.log(db_cats);
    db_cats.sortByProp('age');
    res.render('cats', {
      cats: db_cats, 
      title: 'Cat Directory'
    });
  });
};

exports.list_by_color = function(req, res){
  var Cat = mongoose.model('Cat', catSchema);
  Cat.find({colors:req.params.color}, function (err, db_cats) {
    if(err) {console.log("Error")}
    console.log(db_cats);
    db_cats.sortByProp('age');
    res.render('cats', {
      cats: db_cats, 
      title: 'Sort by color: ' + req.params.color
    });
  });
};

exports.delete_old = function(req, res){
  var Cat = mongoose.model('Cat', catSchema);
  Cat.find({}, function (err, db_cats) {
    if(err) {console.log("Error")}
    db_cats.sortByProp('age');
    old_cat = db_cats.pop();
    Cat.remove({name:old_cat.name, age:old_cat.age}, function(err) {
      console.log(old_cat.name);
      if (err)
        console.log("Error");
    });
    res.render('cats', {
      cats: [old_cat], 
      title: 'An old cat has died.  The world is now a better place.'
    });
  });
};

exports.new = function(req, res) {
	var Cat = mongoose.model('Cat', catSchema);
  	var new_cat = new Cat({name: 'bob', age: '12', colors:['black', 'green']});
		new_cat.save(function (err) {
		if (err) 
	    	console.log("error", err);
	    res.send("You cat is being created... be warned that this may take up to 2 months.");
  		});
};

