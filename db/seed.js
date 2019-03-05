const db = require("../models");

let user_list = [
  {
    name: "John",
    email: "john@gmail.com", // Validate as email
    userName: "john8",
    password: "password1",
    avatarUrl: "#"
  },
  {
    name: "James",
    email: "james@gmail.com", // Validate as email
    userName: "james8",
    password: "password1",
    avatarUrl: "#"
  },
  {
    name: "Joseph",
    email: "joseph@gmail.com", // Validate as email
    userName: "joe8",
    password: "password1",
    avatarUrl: "#"
  }
];

let places_list = [
  {
    name: "San Francisco",
    country: "United States of America",
    imageUrl: "#"
  },
  {
    name: "Cologne",
    country: "Germany",
    imageUrl: "#"
  }
];

let post_list = [
  {
    title: "I love the city",
    content:
      "San Francisco is really cool and really also kinda not super cool",
    date: "July 8 2018",
    user: "James",
    city: "San Francisco"
  },
  {
    title: "I like the city",
    content: "What is this",
    date: "January 14 2019",
    user: "John",
    city: "Cologne"
  }
];

db.User.deleteMany({}, (err, users) => {
  user_list.forEach(userData => {
    let user = new db.User({
      name: userData.name,
      email: userData.email, // Validate as email
      userName: userData.userName,
      password: userData.password,
      avatarUrl: userData.avatarUrl
    });
    user.save((err, savedUser) => {
      if (err) console.error(err);
    });
  });
});

db.City.deleteMany({}, (err, cities) => {
  places_list.forEach(cityData => {
    let city = new db.City({
      name: cityData.name,
      country: cityData.country,
      imageUrl: cityData.imageUrl
    });
    city.save((err, savedCity) => {
      if (err) console.error(err);
    });
  });
});

db.Post.remove({}, (err, posts) => {
  post_list.forEach(postData => {
    let post = new db.Post({
      title: postData.title,
      content: postData.content,
      date: postData.date,
      user: postData.user,
      city: postData.city
    });
    db.User.findOne({ name: postData.user }, (err, foundUser) => {
        if (err) return console.error(err);
        post.user = foundUser;
        post.save((err, savedPost) => {
          if (err) return console.error(err);
          console.log(`Saved ${savedPost.title} by ${foundUser.name}.`);
        });
      });
      db.City.findOne({ name: postData.city }, (err, foundCity) => {
        if (err) return console.error(err);
        post.city = foundCity;
        post.save((err, savedPost) => {
          if (err) return console.error(err);
          console.log(`Saved ${savedPost.title} by ${foundCity.name}.`);
        });
      });
  });
});
