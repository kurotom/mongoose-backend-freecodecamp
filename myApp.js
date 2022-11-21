const mongo = require('mongoose');
const { Schema } = mongo;
require('dotenv').config();


const uriMONGO = process.env.MONGO_URI;
mongo.connect(uriMONGO, { useNewUrlParser: true, useUnifiedTopology: true }).then(
	()=>{
		console.log("conectado");
	})
	.catch((error) => {
		console.log(error);
	})


const personSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	age: {
		type: Number
	},
	favoriteFoods: [String]
});

let Person;
Person = mongo.model("Person", personSchema);


const createAndSavePerson = (done) => {
	let nameP = new Person({
		name: "Tomás",
		age: 30,
		favoriteFoods: ['completo', 'barros luco']
	});

	console.log(nameP);

//	nameP.save()
//		.then((save) => {
//			console.log("saved!");
//			console.log(save);
//		})
//		.catch((error) => {
//			console.log(error);
//		})

	nameP.save((err, data) => {
		if (err) {
			done(err);
		}
		done(null, data);
	});

};

let arrayOfPeople = [
  {name: "Frankie", age: 74, favoriteFoods: ["Del Taco"]},
  {name: "Sol", age: 76, favoriteFoods: ["roast chicken"]},
  {name: "Robert", age: 78, favoriteFoods: ["wine"]}
];

const createManyPeople = (arrayOfPeople, done) => {
	Person.create(arrayOfPeople, (error, people) => {
		if (error) {
			return console.log(error);
		}
		done(null, people);
	});

//	Person.create(arrayOfPeople)
//		.then((save) => {
//			console.log(save)
//			console.log("save!");
//		})
//		.catch((error) => {
//			console.log(error)
//		})
};

const findPeopleByName = (personName, done) => {
	Person.find({name: personName}, (error, coincidencias) => {
		if (error) {
			return console.log(error);
		}
		done(null, coincidencias);
	})
};

const findOneByFood = (food, done) => {
	Person.findOne({favoriteFoods: food}, (error, coincidencias) => {
		if (error) {
			return console.log(error);
		}
		done(null, coincidencias);
	})
};

const findPersonById = (personId, done) => {
	Person.findById({_id: personId}, (error, coincidencias) => {
		if (error) {
			return console.log(error);
		}
		done(null, coincidencias);
	})};

const findEditThenSave = (personId, done) => {
	const foodToAdd = "hamburger";
	Person.findById({_id: personId}, (error, match) => {
		if (error) {
			return console.log(error)
		}
		match.favoriteFoods.push(foodToAdd);
		match.save((error, save) => {
			if (error) {
				return console.log(error)
			}
			done(null, save);
		});
	})
	
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
	Person.findOneAndUpdate({name: personName}, {age: ageToSet}, (error, res) => {
		if (error) {
			return console.log(error);
		}
		done(null, res);
	})
};

const removeById = (personId, done) => {
	Person.findByIdAndRemove({_id: personId}, (error, res) => {
		if (error) {
			return console.log(error);
		}
		done(null, res);
	});
};

const removeManyPeople = (done) => {
	const nameToRemove = "Mary";
	Person.remove({name: nameToRemove}, (error, res) => {
		if (error) {
			console.log(error)
		}
		done(null, res);
	})
};

const queryChain = (done) => {
	const foodToSearch = "burrito";

	Person.find({favoriteFoods: foodToSearch})
		.sort({name: 'asc'})
		.limit(2)
		.select('-age')
		.exec((error, people) => {
			if (error) {
				console.log(error);
				return console.log(error);
			}
			console.log(people);
			done(null, people);
		})
 };

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
