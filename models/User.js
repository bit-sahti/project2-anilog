const { Schema, Types, model} = require('mongoose');

const User = model('User', new Schema({
    //Identification
    username: { type: String, unique: true, required: true, minLength: 3, maxLength: 30 },
    email: { type: String, unique: true, required: true },
    avatarPicture: { type: String, default: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'},
    //Authentication
    password: { type: String, required: true },
    resetPassQuestion: { type: String, required: true },
    resetPassAnswer: { type: String, required: true },
    //Profile
    preferedGenres: Array,
    description: String,
    socialMedia: {
        // type: { type: String },
        facebook: { type: String},
        twitter: { type: String},
        discord: { type: String}
    },
    //Lists
    favorites: [ { type: Types.ObjectId, ref: 'Anime' } ],
    watching: [ { type: Types.ObjectId, ref: 'Anime' } ],
    toWatch: [ { type: Types.ObjectId, ref: 'Anime' } ],
    //Friends
    friends: [ { type: Types.ObjectId, ref: 'User' } ]
}))

module.exports = User;