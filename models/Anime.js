const { Schema, Types, model } = require('mongoose');

const Anime = model('Anime', new Schema({
    //Basic search info
    externalId: { type: Number, required: true, unique: true },
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
    generalTags: [String],
    spoilerTags: [String],
    adultTags: [String],
    status: String,
    averageScore: Number,
    //Format info
    format: String,
    episodes: Number,
    duration: String,
    //Release info
    status: String,
    startDate: {
        year: Number,
        month: Number,
        day: Number
    },
    endDate: {
        year: Number,
        month: Number,
        day: Number
    },
    season: String,
    //Staff info
    source: String,
    creation: [String],
    direction: [String],
    studio: String,
    //Site related activity
    favoriteOf: [{ type: Types.ObjectId, ref: 'User'}],
    beingWatchedBy: [{ type: Types.ObjectId, ref: 'User'}],
    watchedBy: [{ type: Types.ObjectId, ref: 'User'}],
    toBeWatchedBy: [{ type: Types.ObjectId, ref: 'User'}]
}))

module.exports = Anime;
