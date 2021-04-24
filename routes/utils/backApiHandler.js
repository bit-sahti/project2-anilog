const axios = require('axios');
const mapper = require('./apiMapper')

class AniListHandler {
    constructor() {
        this.method = 'POST'
        this.url = 'https://graphql.anilist.co/',
        this.headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        this.mediaSearchParams = `type: ANIME, isAdult: false`
        this.mediaParams = `
                id
                updatedAt
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
                description(asHtml: true)
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
        `,
        this.pageInfoParams = `
                pageInfo {
                    perPage
                    currentPage
                    lastPage
                    hasNextPage
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

    getMediaQuery(obj) {
        const validProps = Object.entries(obj)
                                 .filter(( [ key, value ] ) => {
                                     if (typeof value === 'string') return value.trim().length;

                                     return value.length;
                                 })

        const entries = validProps.map(( [ key, value ] ) => key);

        const entriesValues = validProps.map(( [key, value] ) => value);
        
        const queryParams = entries.map(entry => {
            switch(entry) {
                case 'search':
                    return entry = `$search: String`;
                case 'genre_in':
                    return entry = `$genre_in: [String]`;
                case 'seasonYear':
                    return entry = `$seasonYear: Int`;
                case 'season':
                    return entry = `$season: MediaSeason`;
                case 'status':
                    return entry = `$status: MediaStatus`;
                case 'format':
                    return entry = `$format: MediaFormat`;
                case 'sort':
                    return entry = `$sort: [MediaSort]`;
            }
        }).join(', ');


        const mediaSearchParams = entries.slice(0, entries.length - 2).map(entry => `${entry}: $${entry}`);

        const variables = entries.reduce((acc, prop, i) => {
            acc[prop] = entriesValues[i];

            if (prop === 'season' || prop === 'status' || prop === 'format' || prop === 'sort') {
                acc[prop] = acc[prop].toUpperCase()
            }

            return acc
        }, {})

        const query = `
            query($page: Int, $perPage: Int, ${queryParams}) {
                Page(page: $page, perPage: $perPage) {
                    ${this.pageInfoParams}
                    media(${this.mediaSearchParams + ',' + mediaSearchParams}) {
                        ${this.mediaParams}
                    }
                }
            }
        `

        // ${this.mediaParams}

        // console.log(query);

        return [query, variables]
    }

    async searchMedia(params) {
        const query = this.getMediaQuery(params)[0]
        const variables = this.getMediaQuery(params)[1]

        // console.log(query);
        console.log(variables);

        try {
            const response = await axios({
                method: this.method,
                url: this.url,
                headers: this.headers,
                body: JSON.stringify({
                    query: query,
                    variables: variables
                }),
                data: {
                    query,
                    variables                
                }    
            })

            return {
                pageInfo: mapper.formatPageInfo(response.data.data.Page.pageInfo),
                animes: mapper.formatBulkData(response.data.data.Page.media)
            }
        }
    
        catch (err) {
            err.response ? console.log(err.response.data.errors) : console.log(err);
        }
    }

}

module.exports = new AniListHandler();