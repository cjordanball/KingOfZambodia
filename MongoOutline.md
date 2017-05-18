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
### Introduction
1. **Mongoose** is an Object Data Manager that allows Mongo support from Express.  It allows:

	a. validation,
        
	b. schemas/models,
        
	c. CRUD operations,
        
	d. use of middleware on the model.
    
### Initial Setup
1. When we use Mongoose, we must do some initial setup. After installing with npm, we will need to import it into our setup file:
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
### Models
1. In the discussion in this section we will use the example of a database that contains a list of **users**, *i.e.*, people using an application.

2. Mongoose is used to create **models**, which represent records in a specific collection. We will create a **user model**, which will represent all the records in our **user collection**.

3. The model will contain an assortment of methods for working with the records in its associated collection. In addition, we will use the model to create single instances, which will be our **documents**.

4. Models have a supeer important property, called the **schema**. The schema defines:

    a. what properties (fields) we expect each record in the collection to have,
    
    b. what type of data we expect in each field.

5. To get started, we will create our model. We will need to require in mongoose and its Schema property, as follows:
    ```javascript
    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;
    ```
6. The Schema is a constructor function, and to create our (very simple) schema, we simply use the *new* keyword, passing in an object containing field names as keys and types as values. For example:
    ```javascript
    const UserSchema = new Schema({
        name: String
    });
    ```
7. As seen above, if there are no other properties, we can simply pass in the **type** as the value for the property. If there are other properties for the field, we will have an object containing a **type** property, as follows:
    ```javascript
    lastName: {
        type: String,
        default: 'Kim'
    }
    ```
8. The data types for the Schema are as follows:

    a. String

    b. Number
    
    c. Date
    
    d. Boolean
    
    e. ObjectId: must specify as follows:
    ```javascript
    var scheme = new Schema({
        ID: Schema.Types.ObjectId,
    })
    ```

    f. Array: This can either be a mixed array, or an array of a specified type. For example:
    ```javascript
    var scheme = new Schema({
        mixArr: [],
        strArr: [String],
        numArr: [Number], //etc.
    });
    ```
    **Note**: These types are off the Javascript global object (with the exception of ObjectId).

9. The schema is important, but only one small part of what is in a mongoose model. So, after creating our schema, we create the **model**, passing in the name of the collection that will be created in Mongo, as well as the schema.  We then assign the returned model to a const:
    ```javascript
    const User = mongoose.model('user', UserSchema);
    ```
   **Note**: User is a **class**, or **model**, and does not represent any particular user, which will be created as an instance of this class.

10. Finally, don't forget to export the User model so that it can be accessed wherever necessary in our project.
    ```javascript
    module.exports = User;
    ```

## Basic CRUD Operations
1. The core of using any database, including Mongo/Mongoose, is the set of four operatinons known as **CRUD**, for **create, **read**, **update**, and **destroy**.


## Testing with Mocha
1. Mocha is a Javascript testing framework, using a "describe/it/expect" pattern. Actually, the **describe** and ""it** are provided by Mocha, but the **expect** gets implemented by an **assertion library**, such as *chai*.

2. Mocha comes packeged with an **asert** library, but it is not installed in global scope with Mocha and must be required in from NodeJS:
    ```javascript
    const assert = require('assert');

    describe('Creating records', () => {
        it('saves a user', () => {
            assert([some statement returning truthy/falsey]);
        });
    });
    ```
3. In our **package.json** file, we need to create the **test script**, as follows:
    ```json
    "scripts": {
        "test": "mocha"
    },
    ```
    
### Automating with Nodemon
1. Mongoose is not always 100%% compatible with Mocha, and therefore, the *--watch* does not always work to well when added to the Mocha command. Therefore, it is more reliable to use **nodemon** to run our tests whenever we update a file. We do this by updating our script to:
    ```json
    "scripts": {
        "test": "nodemon --exec 'mocha -R min'"
    }
    ```
    The **-R min** are formatting options that removes the description, and just shows that tests passed. 

### First Test - Creating a User
1. In order to test whether we are able to successfully create a user, we must import the User model into our testing file:
    ```javascript
    const User = require('../src/user');
    
    describe('Creating records', () => {
        it('saves a user', () => {
            const joe = new User({
                name: 'Joe'
            })
        });
    });
    ```
    **Note**: at this point, we have only created a new instance of our user; we **have not** doen anything to save that instance to the database.

2. To save the instance to the database, we use the **save()** method:
    ```javascript
    describe('Creating records', () => {
        it('saves a user', () => {
            const joe = new User({ name: 'Joe'});
            
            joe.save();
        });
    ```
    As we can see from the above, instances of the User class are more than just the key/value pairs we provide them; for example, we know there is, at the least, a **save()** instance method.

3. An alternative to the use of *new [Model]* and then *save()* is to use the **create()** method. This takes one or more property objects, or an array of property objects, and saves them to the database, returning a promise that resolves with the values saved.

4. The above will save a user to our database collection. However, it will do so every time we call npm run test, so we will keep getting more and more "joes". We are going to want to empty our database after running tests, as we do not want to accumulate all this test data.

5. To accomplish the task of clearing our database before any test is run, we can add a **hook**, a method that is called at a specific time in a cycle. In our *test_helper.js* file, we can add the **beforeEach()** method. We can run as follows:
    ```javascript
    beforeEach(() => {
        mongoose.connection.collections.users.drop();
    });
    ```
    **Note**: We are able to access the users collection, and then use the **drop()** method on it.

5. Remember, every database operation is going to be an async operation, and in order to run our tests, we will need to keep mocha from running out of order. This is taken care of by the **done()** callback that is built-in to mocha.

6. The **drop()** method introduced above takes a callback function as a parameter; in addition, every function that we include in a Mocha beforeEach(), or it(), or describe() method can accept a **done** parameter. Calling **done()** tells Mocha that our operation is complete and we can move on:
    ```javascript
    beforeEach((done) => {
        mongoose.connection.collections.users.drop(() => {
            done();
        });
    });
    ```
7. Next, to test whether our record has been saved successfully, we can make use of a property Mongoose adds to every record **if it has been created but not yet saved.** The property, **isNew**, is true if the record has not yet been saved, so, our test can be as follows:
    ```javascript
    describe('Creating records', () => {
        it('saves a user', (done) => {
            const joe = new User({
                name: 'Joe'
            });
            joe.save()
                .then(() => {
                    //Has joe been saved
                    assert(!joe.isNew);
                    done();
                });
        });
    });
    ```
8. Finally, let's go back to our *test_helper.js* file and examine the connection. In addition to the **beforeEach** hook Mocha also provides a **before()** hook, the callback of which also takes the **done** parameter. The code in the **before()** callback is only run a single time, rather than before every test, so that is where we should include the conection:
    ```javascript
    before((done) => {
        mongoose.connect('mongodb://localhost/users_test');
        mongoose.connection
            .once('open', () => {done();})
            .on('error', (error) => {
                console.warn('Warning:', error);
        });
    });
    ```

### Second Test - Finding a User
1. In order to test whether we are retrieving a user correctly, it will be necessary for us to first save one or more users to our database, which otherwise would be empty. So, we will run a **beforeEach** statement in our *describe* block, meaning this action will take place prior to each *it* statement being run:
    ```javascript
    describe('Reading users out of database', () => {
        let joe;
	
        beforeEach((done) => {
            joe = new User({ name: 'Joe'});
            joe.save()
                .then(() => done());
        });
		
        it('finds all users with name of Joe', () => {
		
        });
    });
    ```
2. There are two primary query methods that we will be using in Mongoose, **find()** and **findOne()**. Both of these are methods of the Class, or collection, to which they belong. Each takes a single object parameter containing the matching criteria. The difference is that **find() returns an array of all matches** and **findOne() returns a single record**.

3. To create a test, let's try finding all the users, then comparing the \_id of the found user with the \_id of the user we created, and see if they are the same. In order for this to work, however, we must take the \_id, which is actually an object, and run **toString()** on it.
    ```javascript
    it('finds all users with name of Joe', (done) => {
        User.find({ name: 'Joe' })
            .then((users) => {
                assert(users[0].id.toString() === joe._id.toString());
                done();
            });
    });
    ```
4. Finally, we can test the **findOne()** method by searching for a particular \_id. Since we created a user and assigned the record to the variable "joe", we can run the following:
    ```javascript
    it('finds a user with a particular id', (done) => {
        User.findOne({ _id: joe._id })
             then((user) => {
                assert(user.name === 'Joe');
                done();
            })
    });
    ```
    Note that we do not need to use the *toString()* method when using \_id in the criteria object.


### Third Test - Deleting a User
1. There are several ways to remove a document from a collection. Three exist as static methods for the Class, and one is an instance method for the document. Assuming we want to remove "joe", which is an instance of User, we could have:

    a. **User.remove()**: Takes a matcher object, and removes all matching entries.
    
    b. **User.findOneAndRemove()**: Takes a matcher object, and removes the first matching entry.
    
    c. **User.findByIdAndRemove()**: Takes an \_id as a parameter.
    
    d. **joe.remove()**: No parameters required, very useful when we have a direct reference to the object we want to remove.

2. The following illustrates each of the four methods:
    ```javascript
    const assert = require('assert');
    const User = require('../src/user');

    describe('Deleting a user', () => {
        let joe;
        beforeEach((done) => {
            joe = new User({ name: 'Joe' });
            joe.save()
                .then(() => done());
            });

        it('model instance remove', (done) => {
            joe.remove()
                .then(() => User.findOne({ name: 'Joe' }))
                .then(user => {
                    assert(user === null);
                    done();
                });
        });

        it('class method remove', (done) => {
            User.remove({ name: 'Joe' })
                .then(() => User.findOne({ name: 'Joe' }))
                .then(user => {
                    assert(user === null);
                    done();
                });
        });
        
        it('class method findOneAndRemove', (done) => {
            User.findOneAndRemove({ name: 'Joe' })
                .then(() => User.findOne({ name: 'Joe' }))
                .then(user => {
                    assert(user === null);
                    done();
                });
        });

        it('class method findByIdAndRemove', (done) => {
            User.findByIdAndRemove(joe._id)
                .then(() => User.findOne({ name: 'Joe' }))
                .then(user => {
                    assert(user === null);
                    done();
                })
        });
    });
    ```
### Fourth Test - Updating a User
1. There are also several ways to update a document from a collection. Three exist as static methods for the Class, and two as an instance method for the document. Assuming we want to update "joe", which is an instance of User, we could have:

    a. **User.update()**: Takes a matcher object, and updates **only the first** of the matching entries. In basic form it takes a selector object as a first parameter, and a  change object as the second parameter. However, there is an option (the third parameter is an options object) of "multi"; if set to true, then all the matching documents will be updated.
    
    b. **User.updateMany()**: Same as above, but performs the update for each matching record.
    
    b. **User.findOneAndUpdate()**: Takes a matcher object, and removes the first matching entry.
    
    c. **User.findByIdAndUpdate()**: Takes an \_id as a parameter.
    
    d. **joe.update()**: Takes a parameter of an object of key/values to update - **cannot add new properties onto the record**.
    
    e. **joe.set() and joe.save()**: **Set** is used to change the value of any property **that already exists**. It cannot be used to add a property to our user instance. Then, we must use **save()** to put it in the database.

2. In the following example test page, notice the *assertName* function we create, to prevent having to repeat the testing code in every *it* block.
    ```javascript
    const assert = require('assert');
    const User = require('../src/user');

    describe('Updating a user', () => {
        let joe;
        beforeEach((done) => {
            joe = new User({ name: 'Joe' });
            joe.save()
                .then(() => done());
        });

        function assertName(operation, done) {
            operation
                .then(() => User.find({}))
                .then(users => {
                    assert(users.length === 1);
                    assert(users[0].name === 'Sue');
                    done();
                })
        };

        it('instance type using set and save', (done) => {
            joe.set('name', 'Sue');
            assertName(joe.save(), done);
        });

        it('an instance update', (done) => {
            assertName(joe.update({name: 'Sue'}), done);
        });

        it('a class update', (done) => {
            assertName (
                User.update({ name: 'Joe' }, { name: 'Sue' }),
                done
            );
        });

        it('class method findOneAndUpdate', (done) => {
            assertName (
                User.findOneAndUpdate({ name: 'Joe' }, { name: 'Sue' }),
                done
            );
        });

        it('class method findByIdAndUpdate', (done) => {
            assertName (
                User.findByIdAndUpdate(joe._id, { name: 'Sue'}),
                done
            )
        });
    });
    ```

### Update Modifiers
1. Note that we did not add any properties to our records. We cannot do that unless we add it to the model's **schema**.

2. Imagine we have created another property for each user that takes an integer, and we wish to increase each users count by 1. We could get all the users on our server, iterate through the list and increase the count, then save the data back in the database.  **Such an approach is very inefficient and should be avoided**. Instead, we can instruct the database to find the users, then update the count per our instruction, as follows:

    a. use the Mongo **increment operator ($inc)**, which allows us to increase, or decrease, each selected record by a given amount:
    ```javascript
    User.update({ name: 'Joe' }, { $inc: { postCount: 2 } });
    ```
    The update command above will find all the records that have a name property of 'Joe', and then will increase the postCount property by 2.

3. There are a variety of such *update operators*, and they are documented in the Mongo documentation, so do not assume we are limited to those discussed herein.


## Validation (Mongoose)
1. Mongoose provides validations features, so that we can confirm that data is in a valid form before sending it off to the database. *Mongo* does have its own support for validation, but that is not covered in this section.

2. The validation will occur in our **Schema** for our collection. In place of the property type, we will include an object with our validation properties. In that object, we must have a *type* property.

3. The most basic validation is to require a field to have a value. That can be accomplished with the key:value pair "required: true". However, the better practice is to make our value an array, with the first element being the **true** requirement and the second element being the error message to display:
    ```javascript
    name: {
        type: String,
        required: [true, 'Name is required.']
    },
    ```
3. Our record (a class instance) will have a method available to it, **validateSync()**, which will return the result of the validation process. There is also a **validate()** method, which is asynchronous and takes a callback. It would be used, for example, if it is necessary to check with a web service to perform the validation. If no I/O is necessary, then we can use *validateSync().*

4. To get access to the error message if a validation fails, we need to get into the object returned by validateSync(). It can be found at:
    ```javascript
    validationResult.errors.[property].message
    ```
    **NOTE**: If the entry passes all validation, then validateSync() will return *undefined*.

5. All Schema types have a **required** validator. Numbers have **min** and **max** validators. Strings have **enum**, **match**, **maxlength** and **minlength** validators.

    a. **enum** takes an array of discrete values that are allowed:
    ```javascript
    enum: {
        ['manager', 'professional', 'labor'],
        message: 'Must be Joe, John, or Jay'
    )
    ```
    b. **match** takes a value of an array, the first element of which is the regular expression to match, and the second element is the error message if there is no match.
    ```javascript
    match: [/^jo\w*|sue$/i, 'Name must start with "jo"'],
    ```

6. Custom validators are constructed using the **validate** property, which should have a property of **validator**, paired with a value of an array, the first element being a function that returns true or false, and the second element being an error message if the function returns false:
    ```javascript
    validate: {
        validator: (name) => name.length > 2,
            message: 'Name must be longer than 2 chars.'
    },
    ```

7. If multiple validators are flunked, the **validateResult.errors** message will be the first one that is tripped upon.

### Default Values
1. One can set default values in the Mongoose Schema. Example:
    ```javascript
    const UserSchema = new Schema({
        . . . 
        created: {
            type: Date,
            default: Date.now()
        }
    )

## Relational Data (Subdocuments)
1. Of course, Mongo is a non-SQL database, so we will want to structure the data storage differently. For example, if we have a tabe of users, and users write blog posts, in a SQL database we can create a table of Users, a table of Posts, and reference the author in each post. In a non-SQL database, we might be better having a single users collection, with a posts field in each user. See Diagram 04 for an illustration of how we would structure this.

2. Remember, *models* represent *collections*, *schema* represent *records*.

3. In our example, we are going to embed a list of posts into each user. In the Mongo lexicon, this embedded items are known as **subdocuments**. To embed our schema for posts into our schema for users, we do the following:

    a. create a new file, *postSchema.js*, in which to create and export our schema:
    ```javascript
    //postSchema.js
    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;

    const PostSchema = new Schema({
        title: String
    });

    module.exports = PostSchema;
    ```

    b. go to our *user.js* file, and inside the UserSchema, insert a new field of *posts*, and give it a value of an array of *PostSchema*, as follows:
    ```javascript
    //user.js
    const UserSchema = new Schema({
        name: {
            type: String,
            required: [true, 'Name is required.'],
            validate: {
                validator: (name) => name.length > 2,
                message: 'Name must be longer than 2 chars.'
            },
        },
	postCount: Number,
	posts: [PostSchema]
    });
    ```

### Adding and Removing Subdocuments
1. To add a subdocument (in our case, a post to the user), we must first add the subdocument, **and then** call *save()* on the updated document. Otherwise, it is very simple. We use the *push()* Array method to add the subdocument, then do a *save()* operation.

2. In deleting a subdocument, the same rules apply - we use standard javascript to modify our subdocuments array inside our parent document, but must then save the parent docuemnt. **HOWEVER**, Mongoose provides a **remove()** method on the subdocument instance. This **only removes** from the record, it **does not** save the removal, as the *remove()* method does when called on the main record instance.

### Virtual Types
1. A **virtual type** is any field on a record that is not explicitly persisted into our Mongo database. Instead, it is inferred or calculated from the data.

2. **Example**: If we have a user collection with each user having an array of posts, it is not necessary to have an actual field called "postCount" being saved in our database and being manually updated every time the user adds or removes a post. Instead, we can simply uze the length of the posts array whenever we need the count.

3. In order to use virtual types in mongoose, we use the **get()** method added by ES6. The property **does not** go into our schema definition. After the schema is created, we use the **virtual** method to name the property, and then define our getter function. Below, we are returning the number of posts a user has saved:
    ```javascript
    //const UserSchema = new Schema . . .
    
    UserSchema.virtual('postCount').get(function() {
        return this.posts.length;
    });
    ```
    **VERY IMPORTANT**: In order to be able to reference our instance as "this", we have to use a traditional function statement, and not an arrow function, which would take the surrounding scope.
    
## Relational Data (Multiple Collections)
1. If we extend the structure we have been discussing above, users who write posts, to also keep track of comments to each post, including who wrote the comments, then our data becomes quite nested and can get difficult to work with generally.

2. For better or worse, Mongo does not allow for techniques such as **joins** to work easily with multiple tables. Trying to copy SQL techniques can lead to trouble pretty quickly.

3. For this section, lets imagine that we have Users who can write posts. In addition, Users can write blogposts, and users can write comments about the blogposts. We will not use subdocuments for this, but will create new models for BlogPosts and Comments.

4. For our BlogPost Schema, we might have something like:
    ```javascript
    const BlogPostSchema = new Schema({
        title: String,
        content: String,
        comments: [{
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }]
    })
    ```
    This has some similarities to, *but is not the same as*, the subdocument. It is a reference to another record in anothor model.

5. The **type** in a case like this will always be the *Schema.Types.ObjectId*, because that is what we are working with, is the Id of another object. The **ref** value will be the name that is passed into the *mongoose.model* as the first argument, **not** the name given the model (watch the case).

6. Note that if we can have multiple referenced items associated with the main item, such as above, where a post can have multiple comments, we must put the object **in an array**. If only a single item will exist (such as only one author for each comment), then the object will **not** be inside an array.

7. To set up an association, we do the following (assume we have a user, "joe", a bllog post, "blogPost", and a comment, "comment").

    a. If there are multiple items allowed, push the associated into the main item's array:
    ```javascript
    joe.blogPosts.push(blogPost)
    ```
    Don't worry - mongoose will automatically insert the ObjectId and not the entire blogPost!
    
    b. If it is a one-to-one relationship, then use assignment to make the association:
    ```javascript
    comment.user = joe;
    ```
    Again, mongoose will, behind-the-scenes, make sure it is joe's id, and not the entire record, that is assigned to comment.user.
    
    
## Query Modification
1. Examining a typical Mongoose query, it may look like this:
    ```javascript
    User.findOne({ name: 'Jordan' }).then( . . . );
    ```
    In the above, *User* designates the **collection** to be queried. The query is then formed, but nothing is actually sent off to the database until *then* is executed. In older versions of Mongoose, using callbacks instead of promises, the method **exec()** is used instead of **then**.

3. Mongoose provides the ability to modify the above query, as follows:
    ```javascript
    User.findOne({ name: 'Joe' }).modifier.then( . . . );
    ```
    There are predefined modifiers provided by Mongoose, and we can also create our own modifiers.

### The Populate Modifier
1. When we send for a record that contains references to records in another collection, what we get are the **id numbers** of the referenced items. If we want the actual item itself, we can use the **populate** modifier method, as follows:
    ```javascript
    User.findOne({ name: Joe }).populate("blogPosts").then( .  . . );
    ```
    In the above, the arguments in the *populate* method are the properties that we want to be expanded past the id numbers.    

2. We can also go deeper to populate references inside the references. Mongoose does not allow this to be done automatically, or else it could get out of control. However, let's examine a case where Users write Blogposts, Blogposts have comments, and each comment has an author. As seen in the above example, we can easily access the Blogpost objects rather than merely the id by using populate. To go deeper, see the following exammple:
    ```javascript
    User.findOne({ name: 'Joe'})
    .populate({
        path: 'blogPosts',
        populate: {
            path: 'comments',
            model: 'comment',
            populate: {
                path: 'author',
                model: 'user'
            }
        }
    })
    ```
    In the above example, at each level we can have a populate property, which has a value of an objec with the path (*i.e.*, the property to expand), the model (*i.e.*, the model where this resides) and, if one wishes to go into the next level, a nested *populate* property. 



## Selectors
1. Similar to the WHERE clause of a SQL statement, Mongo uses a system of selectors to choose which records in a collection is is looking for. The selectors are made of key / value pairs, together with specified keys.

2. Note that in the examples below, we will be using the **find()** method, but it could be any method that requires that we identify one or more records.

### Basic query

1. The basic query is a key / value pair. Note that the value can be a **regular expression**.
    ```javascript
    User.find({name: 'Jay'});
    //or
    User.find({name: /j\w+y/i});
    //would find 'Jay', 'Joy', 'Jeremy'
    ```

2. To create an "and" combination, simply list multiple key-value pairs:
    ```javascript
    User.find({name: 'Jay', age: 51);
    ```
    Alternatively, there is an **$and** operator that will take an array of conditions and be satisfied only if each of the array items is true. For example:
    ```javascript
    User.find({ $and: [name: 'Jay', {age: {$gte: 50}}]});
    ```
3. To create an "or" condition in the sense of matching any of several alternatives in a single field, use an array of alternatives, with the **$in** keyword:
    ```javascript
    User.find({name: {$in:['Jay', 'Thompson']}});

4. To create an "or" condition covering multiple fields, use the **$or** operator:
    ```javascript
    User.find({name: 'Jordan', $or: [{eyes: grey}, {age: 30}]});
    ```
    **NOTE**: The "$or" marker signals that a hit is made if any of the conditions in the array are true. So, the above query finds people who 1. are named "Jordan", and 2. either have grey eyes or are 30 years old.

5.  If the value of a field is an array, a query will match if it matches any value of the array.  For example, if Jay's children: ['Jamie', 'Alec', 'Taylor']:
    ```javascript
    User.find({children: 'Alec'} //will return the record.
    ```
		
### Operators
1. Mongo also offers some operators to assist in searching. There are many of them, and a full listing would make this outline excessively long. A few examples are provided below, but much more information can be found on the MongoDB documentation website:

    a. **$eq / $ne / $gt / $lt / $gte / $lte** (==, !=, >, <, >=, <=): These are used as keys, as in the following examples:
    ```javascript
    User.find({ age: { $gte: 25 } });
    //finds all users who are greater than or equal to 25 years old
    ```
    
    b. **$exist: [boolean]**: This operator tests the presence or absence of a field on a record. For example:
    ```javascript
    User.find({ $and:[{ name: 'Jay' }, { eyes: { $exists: true } }] })
    //finds a user whose name is "Jay" and who has an "eyes" property
    ```

    c. **$not**: This operator selects documents that do not match the subsequent expression, **including** documents that do not include the specified field.
    ```javascript
    User.find({ $and:[{ name: 'Jay' }, {eyes: {$not: { $eq: 'grey' }}}] })
    ```


### Using Skip and Limit
1. If we are performing a *find()* query, we may get back many results, and may not wish to deal with all of them at once. We can get a selected slice of our returned results with the **skip()** and **limit()** modifiers. *Skip* lets us tell where in our returned list we wish to begin, and *limit* allows us to tell how many records we want to have returned.

2. This *skip()* and *limit()* methods are implemented by chaining them onto our queery. Each takes an integer as a parameter, so the following would be a possible query:
    ```javascript
    User.find({}).skip(10).limit(5);
    ```
    The above query would skip the first 10 results, then show 11 - 15.

3. Note, however, that this presupposes that we know what order in which our results are going to return. If order matters, then we need add **sorting** to our query. 

4. We can add a **sort()** method to modify our query. The syntax is to add the **sort()** modifier to the query, with a parameter of an object, the keys of which are the fields upon which to sort, and the values of which are a number: 1 if our sort is **ascending**, -1 if our sort is **descending**. So, our query might be as follows, to sort by lastname, and then by firstname:
    ```javascript
    User.find({}).sort({lastName: 1, firstName: 1 });
    ```
5. Another use of these modifiers is to find extreme values in our data. For example, if we have a collection of people, and each person has an age field entry, we might want to know the age range of our collection. To get that, we do not have a simple **max** or **min** method in Mongo, but can collect all the Users, sort them by age, then get the first one; whetheer max or min depends on our sort direction. 

6. **Important Note**: Remember, that until we hit the ".then" statement, everything is happening inside the database. So, the above approach is much better than finding all the records and then sorting them ourselves after the *find()* promise has been fulfilled. It could be thousands or millions of records, and there is no need to download all that, just to get the maximum or minimum.

### Querying Based on Text Matching
1. Imagine that we have a collection of persons with a single name field, so persons names will be entered as first and last, "Jordan Ball". We can easily do a query to match the input in the name field, but it will only match if we get the entire field correctly matched. For example, if the name field is "Jordan Ball", then "Jordan" or "Ball" or "jor" won't match.

2. Remember, we can use **regular expressions** in our query to match on string fields.

3. Alternatively, we can use MongoDB's **$text** search operator, which allows us to search strings for specific words. In some situations, this is good. It should be very fast, since it **can only search over an indexed field**. However, it only returns matches of complete words; *e.g.*, "Jordan" will give a match against "Jordan Ball", but "jor" will not match.

4. An **index** is a system that the database uses to make very efficient search queries. All collections in MongoDB are indexed on the **\_id** property. 

5. If we go into RoboMongo, we can see, for each collection, an "indexes" folder, which will always have an \_id index file.

6. If we have a field that we want to be able to search very quickly, we can add an index for that field. For example, if user accounts are named by email address, then we can index the e-mail field, as we expect that we will always be searching based on email address.

7. Currently, MongoDB only supports indexing a **single field**, besides the \_id field.

8. Creating an index on a field is done from the command line, as follows:

    a. first, connect to the mongo database server:
    ```
    mongo
    ```
    b. switch to the correct database:
    ```
    use [database name]
    ```
    c. create the index with the following command:
    ```
    db.[collection name].createIndex({ [fiedl name]: "[type of index]" })
    ```
    There are several types of indexes in MongoDB. Text indexes support search of string content in documents.


## Seeding Testing Data
1. In the **UpStar Music** app in the gitHub repo, look at the file "src/seeds.js." This file uses an npm module called "faker" to generate a whole bunch of randomized data to work with.

2. It is not worth going over here, but see the api documentation and the setup in the *src/seeds.js* file to get started. One note: there are constants MIMINUM ARTISTS and ARTISTS_TO_ADD. The first tells faker the number of artist at which it must generate some new data. The second tells how many to generate once it gets to generating.






## THE END
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

			
	g. Mixed: type must be passed in as follows:
	
			var scheme = new Schema({
				mixtye: Schema.Types.Mixed,
			})
	h. Buffer


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

	b. **find**: retrieves multiple documents stored in the same collection.  It takes the Mongo query structure, and has four parameters: a mongo query object, fields to return, options, and a callback with error and array of found objects.  The options are many of the cursor methods.  See the following:
	
			User.find({}, 'username email', {skip: 1, limit: 3}, function(err, users) {}) 	
	
	An alternative means of setting the query is much more like the native Mongo:
	
		User.find({name:/Molly/}).sort({instrument: cello}).limit(4).select({username: 1, _id: 0}).exec(function(err, data{}))
	c. **findOne**: this retrieves only the first matching document using the Mongo findOne() method.  It works similarly to the find() method.
	
			User.findOne({name:/molly/i}, 'name, phone', [callback])

	
	e.  **findOneAndUpdate** Uses the Mongo findAndModify() command to update a single item.  Takes four arguments i) the query, ii) the update items, iii) options (a. boolean: if true, return document as modified, b. boolean: if true, upsert, c. sort order for choosing one of multiple documents);
	
	f. **findByIdAndUpdate()**
	
			User.findByIdAndUpdate(id, {$set: {age: 52}}, function(err, user) {});
			
		
	
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






