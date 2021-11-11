# SEI Project 3 - 

![](https://github.com/theobrooke009/project-three-frontend/blob/main/readme-images/project-3-readme-img-2.png) 

## Overview

This was my third project for the General Assembly Software Engineering course and was my first attempt at building a full stack app.

This was a group project, built over 8 days with 2 other classmates, Tomas Hedberg and Kyle Egglehoefer.

## Goal & Timeframe

For Project 3 we were tasked with building a full stack MERN app with CRUD functionality and consuming an external API, over a 9 day period and using React.js for the front end and MongoDB for the back end.

- Technologies Used
- React.js
- Express
- MongoDB
- Mongoose
- React-router-dom
- Nodemon
- JSON Web Token
- Uikit



## Planning

For this project we began by discussing what app we wanted to make, mainly focused on solving problems which we’d had in our own lives. We finally settled on a clone of Netflix which is focussed on film runtime, which allows you to pick a film to watch based on how much time you had available.

While discussing this we also came up with an additional, complementary feature allowing users to plan movie nights by creating their own movie marathons and saving them. With this decision, we moved on to the planning and work division phase.

We began by sketching out a wireframe for the main pages of our app (the main index page, the individual film page, the marathon creation page and the user profile page) as well as the page to page flow:

![](https://github.com/theobrooke009/project-three-frontend/blob/main/readme-images/project-3-readme-img-1.png)

With the front end planned, we then began to decide on our models we would need in the back end, settling on 3; individual films, marathons and users.

We divided the work up between front and back end development and created a schedule for the week in Trello, as well as agreeing to a daily morning meeting to discuss any progress, blockers or help we may need, along with communicating daily via Zoom and Slack.

At the time, I wanted to try out what we’d recently been learning and build the backend myself, before joining the other guys working on the front end.

## Back End Development

### Models

The first thing to do was to build the model we had decided on as a group. The movie and marathon models were relatively straightforward, consisting mostly of strings and numbers. However, in order to add a review/comment feature to movies, we needed to embed the comment schema within the movie schema:

```javascript
const commentSchema = new mongoose.Schema({
  comment: { type: String, required: true, maxlength: 500 },
  rating: { type: Number, required: true, min: 0, max: 10 },
  addedBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
}, {
  timestamps: true,
})

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true, trim: true },
  year: { type: String, required: true },
  rated: { type: String, required: true },
  released: { type: String, required: true },
  actors: { type: String, required: true },
  runtime: { type: Number, required: true },
  genre: { type: String, required: true },
  director: { type: String, required: true },
  writer: { type: String, required: true },
  plot: { type: String, maxlength: 500, trim: true },
  poster: { type: String, required: true },
  language: { type: String, required: false },
  country: { type: String, required: false },
  awards: { type: String, required: false },
  metascore: { type: Number, required: false },
  imdbrating: { type: Number, required: false },
  comments: [commentSchema],
})

```

The users schema was by far the most difficult to set up however, as this required the use of Mongoose Unique Validator and bcrypt to hash the password. To do this, we need to encrypt the password before the model goes through the ‘save’ stage by using some control flow which hashes the password when the user either creates an account or changes their password.

``javascript
userSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
  }
  next()
})
```

Then, as we would now need to validate a hashed password, we needed to create our own method on the User Schema, in which we can pass the user’s plain text password (provided by the user at the point of account creation or password change) as an argument. Bcrypt has a compare sync method which allows us to compare that plain text password with the hashed password:

```javascript
userSchema.methods.passwordValidate = function(password) {
  return bcrypt.compareSync(password, this.password)
}
```

With the schemas set up, I moved on to the controllers & routes.

### Controllers & Router

To build the controllers, I divided requests across the three models we had just decided to build (films, marathons & users) and set them in their own separate files so they were easier to keep track of. The film and marathon requests would be relatively simple as they consisted of only get requests, however the users controller would prove more complex as this would be where we implemented our CRUD functionality, with users being able to create and delete their own film marathons.

Additionally we would also use JSON Web Token and a custom error class (Unauthorised) for authorisation our auth controllers:

```javascript
async function userLogin(req, res, next) {
  try {
    const userToLogin = await User.findOne({ email: req.body.email })
    if (!userToLogin || !userToLogin.passwordValidate(req.body.password)) {
      throw new Unauthorized()
    }

    const token = jwt.sign({ sub: userToLogin._id }, secret, { expiresIn: '2 days' })
    return res.status(202).json({
      message: `welcome back ${userToLogin.username}`,
      token: token,

    })
  } catch (err) {
    next(err)
  }
}
```

With the controllers set up, I set up the router using express before testing the requests in Insomnia.

### Connecting the Database

With the schemas, controllers and router set up, I began to connect the database using Mongoose.

To do this I wrote a function in helpers.js to connect to the database using the database URI I’d previously set up in the environment file:

```javascript
export function connectDB() {
  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
  return mongoose.connect(dbURI, opts)
}
```

Then I imported this function into the index file as part of the start server function:

```javascript
async function startServer() {
  try {
    await connectDB()
    console.log('Mongoose DB is conncted')
    app.listen(port, () => console.log(`Listening on Port: ${port}`))
  } catch (err) {
    console.log('something went wrong')
  }
}
startServer()
```


### Connecting the Frontend

Connecting to the front end was a relatively straightforward procedure as we had tested our requests previously in Insomnia. It was a case of being careful when moving between the front and back end files to make sure that we had used consistency in our models as well as naming our requests and urls to ensure that they would link up correctly.

## Front End Development

### Recently Added & Recommended sidebars

After completing work on the backend I moved onto the front end to build on the work of my group. As the other group members worked on the login and main pages, I worked on the top 10 and recommended sidebars that were going to go on the left hand side of the main pages.

For the recently added sidebar, I made a get all request to the back end, then wrote a function which would return the last 5 objects in the database before setting them into an array:

```javascript
  function getMostRecent() {
    if (movies) {
      const firstIndex = movies.data.length - 1
      const firstFilm = movies.data[firstIndex]
      const secondFilm = movies.data[firstIndex - 1]
      const thirdFilm = movies.data[firstIndex - 2]
      const fourthFilm = movies.data[firstIndex - 3]
      const fifthFilm = movies.data[firstIndex - 4]
      console.log(firstIndex)
      const recentlyAdded = [firstFilm, secondFilm, thirdFilm, fourthFilm, fifthFilm]

      return recentlyAdded
    }
  }
```

The top 10s were slightly more complex, as I wanted to do them by a randomly selected genre which would change when the page reloads. I began by setting 2 random genres outside of the main function. I did this by setting all of the genres into an array of objects, and two functions which generated 2 random genres and set them into state inside the main function. I set the 2 functions outside of the main function because I didn’t want them to update every time the page changed.

Then, inside the main function I made a get all request to the back end and wrote 2 more functions that filtered the get all request based on the 2 random genre state values:

```javascript
  function filteredMovies() {
    const newMovies = movies.data.filter(movie => {
      return movie.genre.includes(genre)
    })
    return newMovies
  }

  function filteredMoviesTwo() {
    const newMovies = movies.data.filter(movie => {
      return movie.genre.includes(genreTwo)
    })
    return newMovies
  }
```

Finally, I wrote 2 functions to only return the five highest rated movies of those genres:

```javascript
  function topFiveListOne() {
    if (movies && genre) {
      const topFive = filteredMovies()
      topFive.sort((a, b) => b.imdbRating - a.imdbRating)
      return topFive.slice(0, 5)
    }
  }
 
  function topFiveListTwo(){
    if (movies && genre) {
      const topFiveTwo = filteredMoviesTwo()
      topFiveTwo.sort((a, b) => b.imdbRating - a.imdbRating)
      return topFiveTwo.slice(0, 5)
    }
  }
```


## Challenges

This was definitely the most challenging project of the course. It was the first time we had built a full stack application, and having to take into account consistency or connectivity across the front and back end definitely took a while to get my head around.

## Wins

On the plus side, I learned an absolute ton in a very short time - both in terms of MongoDB & React and in terms of building something with other people. I think that we communicated and worked well together, and whilst things didn’t exactly pan out how we’d hoped, this was down to our inexperience at the time, which is something rectified by working at it more.

## Known Bugs

- The generated marathons are created as objects with number indexes and this makes them impossible to map, therefore the saving and naming marathons feature does not work at present.
- As of now, secure routing isn’t working as intended.

## Key Learnings

The most significant things I learned on this project were the importance of communication and testing.

By far and away the most important part of the project was keeping the lines of communication with my team open at all times, making sure we’re all on the same page and that we know where we are, what we’re all doing and where we’re heading, as well as what the current to-do list is (in terms of which features are finished and which features still need work). This is particularly important when it comes to deciding how long we’re going to spend working on a problem before asking for help, or if we need to think of a new way of doing something after the initial idea hasn’t worked as intended.
 
The most important thing I learned from a technical perspective is that all front & back end requests need to be tested extensively before I consider them finished, as they form the backbone of the entire app. Most of the significant problems we ran into related to front and back end requests being out of sync, and therefore not working. As with anything, the key to overcoming this is to proceed cautiously and test all edge cases.

## Future Features
- Allow users to leave reviews of different films.
- Allow users to add new films.
- Add user ratings to films.











