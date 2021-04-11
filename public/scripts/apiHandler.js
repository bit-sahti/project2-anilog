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

    getMediaQuery(obj) {
        const entries = Object.keys(obj);
        const entriesValues = Object.values(obj);

        const queryParams = entries.map(entry => {
            switch(entry) {
                case 'search':
                    return entry = `$${entry}: String`;
                case 'genre_in':
                    return entry = `$${entry}: [String]`
            }
        }).join(', ');


        const mediaSearchParams = entries.map(entry => entry = `${entry}: $${entry}`);

        const variables = entries.reduce((acc, a, i) => {
            acc[a] = entriesValues[i]
            return acc
        }, {})

        const query = `
            query(${queryParams}) {
                Page(page: 1, perPage: 30) {
                    ${this.pageInfoParams}
                    media(${this.mediaSearchParams + ',' + mediaSearchParams}) {
                        ${this.mediaParams}
                    }
                }
            }
        `

        return [query, variables]
    }

    async searchMedia(params) {
        const query = this.getMediaQuery(params)[0]
        const variables = this.getMediaQuery(params)[1]

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
            
            const animes = mapper.formatData(response.data.data.Page.media)

            return {
                pageInfo: response.data.data.Page.pageInfo,
                animes: animes
            }
        }
    
        catch (err) {
            err.response.data.errors ? console.log(err.response.data.errors) : console.log(err);
        }
    }

}

const aniList = new AniListHandler();