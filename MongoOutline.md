# Mongo Outline
[toc]

## First Things First
1. To start up the MongoDB server, type at the command line:
    ```
    ~mongod
    ```

2. To use mongoDB, we must set up a directory in which it can store data. We have to manually make this directory with the following command:
    ```
    ~sudo mkdir -p /data/db
    ```

3. We will then need to take ownership of this directory, so identify our username with
    ```
    ~whoami
    ```
    then change ownership with the following:
    ```
    ~sudo chown -Rv cjordanball /data/db
    ```

4. One alternative to starting mongoDB from the terminal with "mongod" is to start it with the command:
    ```
    ~brew services start mongo
    ```
    which will cause the mongoDB server to run whenever the computer is turned on. 

5. Once the server has been started, we can create a Mongo instance, with the following command
    ```
    > mongo  //this will connect to 'test' database
    ```
    
6. To show what databases are available:
    ```
    > show dbs
    ```
		
7. To switch to a new database:
    ```
    > use [database name]  // need not exist previously
    ```
		
8. To see what collections are in the current database:
    ```
    > show collections
    ```
	
9.  To delete a collection:
    ```
    > [databaseName].[collectionName].drop()
    ```
		
10. To delete a database:
    ```
    > use [otherDatabaseName];
    > [databaseName].dropDatabase();
    ```
		
11. To see what indexes there are and what fields are included in the index:
    ```
    > [databaseName].systems.indexes.find()
    ```

## Introduction
1. **Mongo**, or mongoDB, is a database which we use to persist data in our applications. As such, it is contacted by our back-end server, when necessary to obtain information for our client. The server acts as a protection for the data, validating that the client is authorized to make any changes, and validating any input before allowing it to modify our data.

2. We will also be using **Mongoose**, which is an **object relational mapper(ORM)**, which is simply an interface to allow us to work from our Node server to the back end more efficiently.

3. We can create multiple databases within a single Mongo instance. But note that we will normally use just one database in a single application.

4. Inside a database, we have **collections**. A *collection* is the core unit for storing data inside a Mongo database.

5. In summery at the top is a **mongoDB instance**.  This can contain zero or more **databases**.  A **database** can contain zero or more **collections** (similar to a SQL table).  A **collection** can contain zero or more **documents** (similar to a SQL row).  A **document** can have one or more **fields** (similar to a SQL column).

## Mongoose
1. **Mongoose** is an Object Data Manager that allows Mongo support from Express.  It allows:

	a. validation,
        
	b. schemas/models,
        
	c. CRUD operations,
        
	d. use of middleware on the model.

2. When we use Mongoose, we must do some initial setup. After installing with npm, we will need to import it into our setup file:
    ```
    const mongoose = require('mongoose');
    ```

3. Then, we must run the **mongoose.connect()** method. This takes one parameter, a string identifying where the mongoDB database is located:
    ```javascript
        mongoose.connect('mongodb://localhost/[name of database]');
    ```
    If we were using a remote Mongo server, we would have the IP address and port instead of *localhost*.
    
    **Note**: The database need not pre-exist. Mongoose will create it if it is not yet in existence.

4. Finally, we set up event listeners as follows:
    ```javascript
    mongoose.connection
        .once('open', () => console.log('Good to go!'))
        .on('error', (error) => {
            console.warn('Warning:', error);
    });
    ```
    
## Basic CRUD Operations
1. The core of using any database, including Mongo/Mongoose, is the set of four operatinons known as **CRUD**, for **create, **read**, **update**, and **destroy**.


::: danger
material below here is not reliable
:::






#####Create

1.  To **create** a new document, use **insert**:

		> db.clients.insert({firstName: 'Jay', lastName: 'Ball',
			age: 51, children: [Jamie, Taylor, Alec]});
			
#####Find

1. To **read** (find) the documents, use **find**:

		> db.clients.find(); //return a list of all client objects.
		
	The find() method has an optional parameter called **projection**.  This is an object of kv pairs, the key being the field name, and the value being a 1 if we want it to appear in the result, and a 0 if we don't want it to appear.  The 0 is only necessary for the id field, which defaults to appearing. Example:
	
		> db.clients.find({name: "Jay"}, {name: 1, _id: 0});

2. Remember that find returns a **cursor**; i.e., a pointer to the documents satisfying the query.  Other methods can be applied to the cursor.  For a full list, see the Mongo reference.  Some good ones are:

	a. **cursor.count()** //returns the total number of documents in cursor
	b. **cursor.sort()** //returns results ordered as specified. Sort() takes an object parameter of kv pairs, with the keys being the sort fields and the value being 1 for ascending results and -1 for descending results.
	c. **cursor.limit(n)** //limits the size of of the cursor's result set to n.  Most useful after sort() has been run.
	d. **cursor.skip(n)** //returns a new cursor that points to the results after skipping n documents.
	
		Ex:  db.clients.find().sort({sales: 1}).limit(10).skip(5)
		
		//Would find the 6th through 15th biggest customers. 
	
	
#####Update
		
3. To **update** one or more documents, use **update** (covered in more detail later).

4.  To **delete** a document, use **remove**.

		> db.clients.remove(); //removes all client documents, but does not drop the collection 'clients'. 

5. To get a count of the number of items that match, use **count**.

####Selectors

1. Similar to the WHERE clause of a SQL statement.  The basic query is a key:value pair.  Note that the values can be regular expressions.

		> db.clients.find({name: 'Jay'});
		or >db.clients.find({name: /j.+y/i}); //would find 'Jay', 'Joy'

2. To create an "and" condition, simply list multiple key-value pairs:

		>db.clients.find({name: 'Jay', age: 51);

		
3.  To create an "or" condition in the sense of matching any of several alternatives, simply use an array of alternatives, with the **$in** keyword:

		>db.clients.find({name: {$in:['Jay', 'Thompson']}});
		
4. To create an "or" condition covering multiple fields, use the **$or** operator:

		>db.clients.find({gender: 'f', $or: [{name: /^jay/i}, {eyes: 'blue'}]}) //finds a female client named Jayme, or a blue-eyed female client of any name.

5.  If the value of a field is an array, a query will match if it matches any value of the array.  For example, if Jay's children: ['Jamie', 'Alec', 'Taylor']:

		>db.clients.find({children: 'Alec'} //will return the record.
		
####Operators

		$ne: not equal to
		$lt: less than
		$gt: greater than
		$gte: greater than or equal to
		$lte: less than or equal to
		$exists: [boolean] //tests presence or absence of a field


####Updating

1.  Update takes three parameters, each of them objects:
	a. selector,
	b. the new values,
	c. options

2.  If we make a simple update request as follows:

		db.clients.update({name: 'Jay'}, {age: 55});

	all the information in the Jay document will be replaced with the age: 55 data.  Even the name will be removed.  To update only the specified fields, we must use the **$set** operator.
	
		db.clients.update({name: 'Jay'}, {$set: {age: 55}});
3. **Upsert** option: If this option is selected, then the update command updates the item if it is found, and inserts it if it is not found.  To use, just mark the upsert option as true:

		>db.clients.update({name: 'Jay'}, {$inc: {purchases: 1}}, {upsert: true});
	
4. **Multi** option: If this option is set to true, then the update command updates all matching documents.  If not, only the first document is updated.


####Update Operators

		$set: identifies fields to update
		$inc: used to increment a field by a given amount
			>db.clients.update({name: 'Jay'}, {$inc: {age: 2}});
		$push: add an item to an array
		$pop: remove an item from the end of an array 


	 
###Mongoose

	
2. After setting up Mongoose through NPM, set up the connection to the database in the environment configuration files.  For dev, go to the dev config folder and add to the module.exports object:

		db: 'mongodb://localhost/[database name]'
		
3.  Then add a mongoose.js folder to the configuration folder.  It should require in mongoose, then export out the database, which is returned by the mongoose.connect method.

		var config = require('./config'), //get the dev or production variable
			mongoose = require('mongoose');
			
			module.exports = function() {
				var db = mongoose.connect(config.db);
				
				return db;
			}
4. Finally, add lines into the app.js(server.js, whatever), to get an instance of the database going.

		var mongoose = require('./config/mongoose'),
		
		var db = mongoose();

####Schema

1. Mongoose allows creation of a **Schema** object to define properties for the document list, to impose some order on the whole mess.

2.  Once a Schema is created, a **Model** constructor function will be defined to create instances of Mongo documents.

#####Creating a Schema
1. We will have a **models** folder in the app directory.

2. First step is to create a .js file to contain the schema, which should begin:

		var mongoose = require('mongoose'); //require in the dependency
		var Schema = mongoose.Schema
		
		//Create a new instance of Schema:
		
		var TacoSchema = new Schema({
			firstName: String,
			lastName: String,
			//etc.
			})

		//MOST IMPORTANT - define our model (in this case, "User")
		
		mongoose.model('User', TacoSchema)

3.  Finally, to allow the db access to our model, we must include the following in the mongoose.js configuration file:

		require('[path to the new model file]');
		
	**Question**: Why isn't there any exports object in the model file to allow access?
	
4.  Don't forget that any page containing controllers working with our models will need to require in the model, for example:

		var User = require('mongoose').model('User');
		
	Then, when we need to create a new User document, we simply write:
	
		var userA = new User([parameters, often from req.body])

5. The data types for the Schema are as follows:

	a. String
	b. Number
	c. Date
	d. Boolean
	e. ObjectId: must specify as follows:
	
			var scheme = new Schema({
				ID: Schema.Types.ObjectId,
			})
	f. Array: can either be a mixed array, or an array of a specified type.  Examples:
	
			var scheme = new Schema({
				mixArr: [],
				strArr: [String],
				numArr: [Number], //etc.
			})
	
			
	g. Mixed: type must be passed in as follows:
	
			var scheme = new Schema({
				mixtye: Schema.Types.Mixed,
			})
	h. Buffer

6. **Default Values**: One can set default values in the Mongoose Schema.  Example:

		var UserSchema = new Schema( {
			. . . 
			created: {
				type: Date,
				default: Date.now()
			}
		)
7. **Modifiers**: This is a feature that allows one to change a field's value before saving the document to the database, or to represent it differently at query time.
	a. Some modifiers are predefined and included with Mongoose, such as "trim," "lowercase," and "uppercase."  Example:
	
			var UserSchema = new Schema ({
				firstName: String,
				lastName: {
					type: String,
					trim: true
				},
				password: String
			)
	b. A custom modifier is created by using the keyword "set", and assigning it a function that returns a value to store.
	
			var UserSchema = new Schema( {
			 . . .
			 	website: {
			 		type: String,
			 		set: function(url) {
			 	 	. . .
				 	return url;
			 	 	}
			 	}
			)

	c.  A getter modifer operates on data that is already stored, before it is output as a result of a query.  It operates just like a set operator, but uses the keyword 'get'.  Also, one needs to configure the schema using .set().  Example:
	
			UserSchema.set('toJSON', {getters: true});
	
	d. **Virtual Attributes**: These are properties that are generated dynamically, and are not actual document properties.  Follow the following example, which generates a virtual field, "fullName", by concatenating the firstName and lastName fields:
	
			UserSchema.virtual('fullName').get(function() {
				return this.firstName + ' ' + this.lastName;
			});
			
			// then configure schema to include virtual attributes
			// when converting to JSON representation:
			
			UserSchema.set('toJSON', {getters: true, virtuals: true})
	Virtual attributes can also have setters to help save documents in a preferred manner:
	
			UserSchema.virtual('fullName').set(function(fullName) {
				var splitName = fullName.split(' ');
				this.firstName = splitName[0] || '';
				this.lastName = splitName[1] || '';
			});
			
####Indexes
1. The **unique: true** instruction in the Schema will create a unique index on the attribute for which it is included.  Also, to create a **secondary index** (to optimize querying in the designated field), include the k:v pair **index: true**.
			 
####Methods		
		
5.  Document Methods:
	a. **save**: saves the document to the database.  Will have a callback with error and the saved object as pararmeters.
	b. **find**: retrieves multiple documents stored in the same collection.  It takes the Mongo query structure, and has four parameters: a mongo query object, fields to return, options, and a callback with error and array of found objects.  The options are many of the cursor methods.  See the following:
	
			User.find({}, 'username email', {skip: 1, limit: 3}, function(err, users) {}) 	
	
	An alternative means of setting the query is much more like the native Mongo:
	
		User.find({name:/Molly/}).sort({instrument: cello}).limit(4).select({username: 1, _id: 0}).exec(function(err, data{}))
	c. **findOne**: this retrieves only the first matching document using the Mongo findOne() method.  It works similarly to the find() method.
	
			User.findOne({name:/molly/i}, 'name, phone', [callback])

	d.	**update()**
	
	e.  **findOneAndUpdate** Uses the Mongo findAndModify() command to update a single item.  Takes four arguments i) the query, ii) the update items, iii) options (a. boolean: if true, return document as modified, b. boolean: if true, upsert, c. sort order for choosing one of multiple documents);
	
	f. **findByIdAndUpdate()**
	
			User.findByIdAndUpdate(id, {$set: {age: 52}}, function(err, user) {});
			
	g. **remove()**
	
	h. **findOneAndRemove()**
	
	i. **findByIdAndRemove()**	
	
####Custom Model Methods

1. Mongoose allows the creation of both static and instance custom methods.  Static methods are those defined on the **model**.  Instance methods are those defined on a **document**.

	a. To define a static method, declare it as a member of the schema's *statics* property.
	
			UserSchema.statics.findOneByUsername =
			function (username, callback) {
				this.findOne({userName: new RegExp(username, 'i')}, callback);
				
			//to call this method, simply call on the User model:
			
			User.findOneByUsername('wildcat', function(err, user) {
				. . .
			})

	b. To add an instance property, declare it as a member of the schema's **methods** property.
	
			UserSchema.methods.authenticate = function(password) {
				return this.password === password;
			};
			//Then, to use the authenticate method:
			
			user.authenticate('password');


####Validation

1.  Most basic validation is to require a field to be entered.  That is accomplished with the k:v pair "required: true".

2.  Predefined validators for **strings**:

		//match: takes a string or regex.  For example, for an email:
		match: /.+\@.+\..+/, 
		
		//enum: takes an array of discrete values that are allowed:
		enum: ['manager', 'professional', 'labor'],


3. Custom validators are constructed using the **validate** property, which should have a value of a two element array, the first element being a function that returns true or false, and the second element being an error message if the function returns false.

####Middleware
1. Middleware in Mongoose can either be **pre** or **post**.  Pre middleware is executed before the operation with which it is associated, whereas post middleware is executed after.  Compare the two examples:

		 UserSchema.pre('save', function(next) {
		 	if (. . .) {
		 		next()
		 	} else {
		 		next(new Error ('An Error'));
		 	}
		 });
		 
		 UserSchema.post('save', function(next) {
		 	if(this.isNew) {
		 		console.log('New user!');
		 	} else {
		 		console.log('Update!');
		 	}
		 });
		 
####DBRef
1.  MongoDB does not support joins.  However, it does support the reference of a document to another document using the DBRef convention.  Mongoose supports DBRefs by the ObjectID schema type and the ref property.






