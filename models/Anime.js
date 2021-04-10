const { Schema, Types, model } = require('mongoose');

const Anime = model('Anime', new Schema({
    //Basic search info
    externalId: { type: Number, required: true },
    isAdult: Boolean,
    //Identification
    title: {
        english: String,
        romaji: String,
        native: String
    },
    synonyms: [String],
    coverImage: {
        extraLarge: String,
        large: String,
        medium: String
    },
    bannerImage: String,
    trailer: String,
    relations: [Number],
    //Descriptive info
    description: String,
    genres: [String],
    tags: [String],
    status: String,
    averageScore: Number,
    //Format info
    format: String,
    episodes: Number,
    duration: Number,
    //Release info
    status: String,
    startDate: Date,
    endDate: Date,
    //Staff info
    source: String,
    originalCreator: String,
    director: String,
    mainStudio: String,
    //Site related activity
    favoriteOf: [{ type: Types.ObjectId, ref: 'User'}],
    beingWatchedBy: [{ type: Types.ObjectId, ref: 'User'}],
    watchedBy: [{ type: Types.ObjectId, ref: 'User'}],
    toBeWatchedBy: [{ type: Types.ObjectId, ref: 'User'}]
}))

module.exports = Anime;
