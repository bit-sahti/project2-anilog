const axios = require('axios');
const mapper = require('./mapper')

class AniListHandler {
    constructor() {
        this.method = 'POST'
        this.url = 'https://graphql.anilist.co/',
        this.headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        this.mediaSearchParams = `type: ANIME`
        this.mediaParams = `
                id
                isAdult
                title {
                    romaji
                    english
                    native
                }
                synonyms
                relations {
                    nodes {
                        type
                        id
                        title {
                            romaji
                            english
                        }
                    }
                }
                coverImage {
                    extraLarge
                    large
                    medium
                    color
                }
                bannerImage
                description
                trailer {
                    id
                    site
                    thumbnail
                }
                averageScore
                tags {
                    name
                    isMediaSpoiler
                    isAdult
                }
                genres
                format
                episodes
                duration
                status
                season
                startDate {
                    year
                    month
                    day
                }
                endDate {
                    year
                    month
                    day
                }
                source
                staff {
                    edges {
                        role
                        node {
                            name {
                                full
                            }
                        }
                    }
                }
                studios(isMain: true) {
                    nodes {
                        name
                    }
                }
        `
    }

    async getAnime(externalId) {
        const query = `
            query($id: Int) {
                Media(id: $id) {
                    ${this.mediaParams}
                }
            }
        `

        const variables = {
            id: Number(externalId)
        }

        try {
            const response = await axios({
                method: this.method,
                url: this.url,
                headers: this.headers,
                body: JSON.stringify({
                    query: query,
                    variables: externalId
                }),
                data: {
                    query,
                    variables         
                }    
            })

            const anime = mapper.formatData(response.data.data.Media)
            return anime;
        }

        catch(err) {
            err.response ? console.log(err.response.data.errors) : console.log(err);
        }
    }

}

module.exports = new AniListHandler();