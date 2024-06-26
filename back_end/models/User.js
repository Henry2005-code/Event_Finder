const dbConnection = require('../config/dbConnection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { isEmail } = require('validator');

class User {
  static login(email, password, isOrganizer) {
    return new Promise((resolve, reject) => {
      if (!isEmail(email)) {
        reject('Invalid email');
      }

      this.getUserByCredentials(email, password, isOrganizer)
        .then((user) => {
          resolve(user);
        })
        .catch((err) => {
          console.log(err.message + ' in login');
          reject(err);
        });
    });
  }

  static getUserByCredentials(email, password, isOrganizer) {
    const query = `SELECT * FROM users WHERE email = ?`;
    isOrganizer = isOrganizer === 'organizer' ? 1 : 0;
    return new Promise((resolve, reject) => {
      dbConnection.query(query, [email])
        .then(async ([result]) => {
          if (result.length === 0) {
            reject('User not found');
          } else {
            const user = result[0];
            console.log(user);

            const isMatch = await this.comparePassword(password, user.PASSWORD);
            console.log(isMatch);
            console.log(user.isorganizer);
            console.log(isOrganizer);

            if (!isMatch) {
              console.log('Incorrect password');
              reject('Incorrect password');
            }
            if (user.isorganizer !== isOrganizer) {
              console.log('User is not an organizer');
              reject('User is not an organizer');
            } 
            else {
              console.log("User is valid")
              console.log(user)
              resolve(this.getJson(user));
            }
          }
        })
        .catch((err) => {
          console.log(err.message);
          reject(err);
        });
    });
  }

  static async comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }

  // find all users that are organizers
  static async findOrganizers() {
    try {
      const query = 'SELECT * FROM users WHERE isorganizer = true';
      const rows = await dbConnection.query(query);
      console.log(rows[0]);
      return rows[0];
    }
    catch (error) {
      throw error;
    }
  }

  static generateToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  }

  static signup(username, email, password, isOrganizer) {
    // convert isOrganizer to boolean
    isOrganizer = isOrganizer === 'organizer' ? 1 : 0;
    if (!isEmail(email)) return Promise.reject('Invalid email');

    // hash the password
    const hashedPassword = bcrypt.hash(password, 10).then((hash) => {

      return new Promise((resolve, reject) => {
        const query = 'INSERT INTO users (username, email, password, isOrganizer) VALUES (?, ?, ?, ?)';
        dbConnection.query(query, [username, email, hash, isOrganizer], (err, result) => {
          console.log(query);

          if (err) {
            console.log(err);
            reject(err);
          }

          console.log(result);
          resolve(result);
        });
      });

    });

  }

  static getJson(user) {
    return {
      "id": user.USERID
      , "username": user.USERNAME,
      "email": user.EMAIL
    }
  }

}

module.exports = User;
