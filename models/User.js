const { Schema, Types, model} = require('mongoose');

const User = model('User', new Schema({
    //Identification
    username: { type: String, unique: true, required: true, minLength: 3, maxLength: 30 },
    email: { type: String, unique: true, required: true },
    birthDate: { type: Date, required: true },
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
        facebook: String,
        twitter: String,
        discord: String,
        isPublic: { type: Boolean, default: false }
    },
    //Lists
    favorites: [ { type: Types.ObjectId, ref: 'Anime' } ],
    watching: [ { type: Types.ObjectId, ref: 'Anime' } ],
    watched: [ { type: Types.ObjectId, ref: 'Anime' } ],
    toWatch: [ { type: Types.ObjectId, ref: 'Anime' } ],
    //Social
    friendshipRequests: [ { type: Types.ObjectId, ref: 'User' } ],
    friends: [ { type: Types.ObjectId, ref: 'User' } ],
    following: [ { type: Types.ObjectId, ref: 'User' } ],
    followers: [ { type: Types.ObjectId, ref: 'User' } ],
},
{
    timestamps: true
}))

module.exports = User;