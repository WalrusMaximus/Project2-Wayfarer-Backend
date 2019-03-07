const db = require("../models");
const bcrypt = require("bcrypt");

// LIST OF DUMMY USERS

let user_list = [
  {
    name: "John",
    email: "john@gmail.com",
    userName: "john8",
    password: "password1",
    avatarUrl: "#"
  },
  {
    name: "James",
    email: "james@gmail.com",
    userName: "james8",
    password: "password1",
    avatarUrl: "#"
  },
  {
    name: "Joseph",
    email: "joseph@gmail.com",
    userName: "joe8",
    password: "password1",
    avatarUrl: "#"
  }
];

// LIST OF PLACES

let places_list = [
  {
    name: "San Francisco",
    country: "United States of America",
    imageUrl:
      "https://images.unsplash.com/photo-1519227355453-8f982e425321?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2978&q=80"
  },
  {
    name: "London",
    country: "United Kingdom",
    imageUrl:
      "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
  },
  {
    name: "Gibraltar",
    country: "Gibraltar",
    imageUrl:
      "https://images.unsplash.com/photo-1503152889424-9c280f38cb1c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
  },
  {
    name: "Cologne",
    country: "Germany",
    imageUrl:
      "https://images.unsplash.com/photo-1504801019156-beabdea673be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2749&q=80"
  },
  {
    name: "Los Angeles",
    country: "United States of America",
    imageUrl:
      "https://images.unsplash.com/photo-1525876285538-4cc52d170c0d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
  },
  {
    name: "Colorado Springs",
    country: "United States of America",
    imageUrl:
      "https://images.unsplash.com/photo-1517882737735-0da2d51cca47?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
  },
  {
    name: "Philadelphia",
    country: "United States of America",
    imageUrl:
      "https://images.unsplash.com/photo-1537742840943-77832e2c5551?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
  },
  {
    name: "Guangzhou",
    country: "China",
    imageUrl:
      "https://images.unsplash.com/photo-1544594376-0a9a6ae2c997?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2837&q=80"
  },
  {
    name: "Tokyo",
    country: "Japan",
    imageUrl:
      "https://images.unsplash.com/photo-1549693578-d683be217e58?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2856&q=80"
  },
  {
    name: "New York City",
    country: "United States of America",
    imageUrl:
      "https://images.unsplash.com/photo-1445023086979-7244a12345a8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2048&q=80"
  },
  {
    name: "Istanbul",
    country: "Turkey",
    imageUrl:
      "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2549&q=80"
  },
  {
    name: "Cairo",
    country: "Egypt",
    imageUrl:
      "https://images.unsplash.com/photo-1522995924214-ac0040b4b63f?ixlib=rb-1.2.1&auto=format&fit=crop&w=2818&q=80"
  },
  {
    name: "San Diego",
    country: "California",
    imageUrl:
      "https://images.unsplash.com/photo-1483042184814-97a463968400?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2852&q=80"
  },
  {
    name: "Venice",
    country: "Italy",
    imageUrl:
      "https://images.unsplash.com/photo-1502726488490-f99c74217a37?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
  },
  {
    name: "Mexico City",
    country: "Mexico",
    imageUrl:
      "https://images.unsplash.com/photo-1542835435-4fa357baa00b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2824&q=80"
  },
  {
    name: "Seoul",
    country: "South Korea",
    imageUrl:
      "https://images.unsplash.com/photo-1506809211073-d0785aaad75e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2656&q=80"
  },
  {
    name: "Budapest",
    country: "Hungary",
    imageUrl:
      "https://images.unsplash.com/photo-1520986840182-5b15f734c85c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2857&q=80"
  },
  {
    name: "Lyon",
    country: "France",
    imageUrl:
      "https://images.unsplash.com/photo-1516127716475-41e1f1e182d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2087&q=80"
  },
  {
    name: "Cape Town",
    country: "South Africa",
    imageUrl:
      "https://images.unsplash.com/photo-1475359201948-d44193401fae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
  }
];

let post_list = [
  {
    title: "I love the city",
    content:
      "San Francisco is really cool and really also kinda not super cool",
    user: "5c804e0430008f702783d24f",
    city: "5c804e0330008f702783d23d"
  },
  {
    title: "I like the city",
    content: "What is this",
    user: "5c804e0430008f702783d250",
    city: "5c804e0330008f702783d23e"
  }
];

// To seed USERS, comment out POSTS

// db.User.deleteMany({}, (err, users) => {
//   user_list.forEach(userData => {
//     bcrypt.hash(userData.password, 10, (err, hash) => {
//       let user = new db.User({
//         name: userData.name,
//         email: userData.email,
//         userName: userData.userName,
//         password: hash,
//         avatarUrl: userData.avatarUrl
//       });
//       user.save((err, savedUser) => {
//         if (err) console.error(err);
//       });
//     });
//   });
// });

// db.City.deleteMany({}, (err, cities) => {
//   places_list.forEach(cityData => {
//     let city = new db.City({
//       name: cityData.name,
//       country: cityData.country,
//       imageUrl: cityData.imageUrl
//     });
//     city.save((err, savedCity) => {
//       if (err) console.error(err);
//     });
//   });
// });

db.Post.deleteMany({}, (err, posts) => {
  post_list.forEach(postData => {
    let post = new db.Post({
      title: postData.title,
      content: postData.content,
      date: postData.date,
      user: postData.user,
      city: postData.city
    });
    post.save((err, savedPost) => {
      if (err) console.log(`Saved this ${savedPost}`);
    });
  });
});

//

// db.Post.deleteMany({}, (err, posts) => {
//   post_list.forEach(postData => {
//     let post = new db.Post({
//       title: postData.title,
//       content: postData.content,
//       date: postData.date,
//       user: postData.user,
//       city: postData.city
//     });
//
//     // db.User.findOne({ name: postData.user }, (err, foundUser) => {
//     //   if (err) return console.error(err);
//     //   post.user = foundUser;
//     //   post.save((err, savedPost) => {
//     //     if (err) return console.error(err);
//     //     console.log(`Saved ${savedPost.title} by ${foundUser.name}.`);
//     //   });
//     // });
//     // db.City.findOne({ name: postData.city }, (err, foundCity) => {
//     //   if (err) return console.error(err);
//     //   post.city = foundCity;
//     //   post.save((err, savedPost) => {
//     //     if (err) return console.error(err);
//     //     console.log(`Saved ${savedPost.title} by ${foundCity.name}.`);
//     //   });
//     // });
//   });
// });
