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
        `,
        this.pageInfoParams = `
                pageInfo {
                    total
                    currentPage
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
        const entries = Object.entries(obj).filter(( [ key, value ] ) => value.length).map(( [ key, value ] ) => key);
        const entriesValues = Object.entries(obj).filter(( [ key, value ] ) => value.length).map(( [key, value] ) => value);

        const queryParams = entries.map(entry => {
            switch(entry) {
                case 'search':
                    return entry = `$${entry}: String`;
                case 'genre_in':
                    return entry = `$${entry}: [String]`;
            }
        }).join(', ');


        const mediaSearchParams = entries.slice(2).map(entry => entry = `${entry}: $${entry}`);

        const variables = entries.reduce((acc, a, i) => {
            acc[a] = entriesValues[i]
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

        // console.log(query, variables);

        return [query, variables]
    }

    async searchMedia(params) {
        const query = this.getMediaQuery(params)[0]
        const variables = this.getMediaQuery(params)[1]

        console.log(query, variables);

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
            
            const animes = mapper.formatBulkData(response.data.data.Page.media)
            console.log(response.data.data.Page.pageInfo);

            return {
                pageInfo: response.data.data.Page.pageInfo,
                animes: animes
            }
        }
    
        catch (err) {
            err.response ? console.log(err.response.data.errors) : console.log(err);
        }
    }

}

module.exports = new AniListHandler();