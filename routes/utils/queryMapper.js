class queryMapper {
    getGenres(queryGenres) {
        if (!queryGenres) return null;
        const genres = {};

        if (typeof queryGenres === 'object') {
            queryGenres.forEach(genre => {
                genres[genre] = true;
            })
        } else if (queryGenres) {
            genres[queryGenres] = true;
        }

        return genres;
    }

    getYear(queryYear) {
        if (!queryYear) return null;
        
        return { [queryYear]: true };
    }

    getSeason(querySeason) {
        if (!querySeason) return null;

        return { [querySeason]: true };
    }

    getStatus(queryStatus) {
        if (!queryStatus) return null;

        return { [queryStatus]: true };
    }

    getFormat(queryFormat) {
        if (!queryFormat) return null;

        return { [queryFormat]: true };
    }

    getSortingFactor(querySort) {
        if (!querySort) return null;

        console.log(querySort);

        return { [querySort]: true };
    }

    map(query) {
        const search = { search: query.search }
        const genres = this.getGenres(query.genre_in);
        const year = this.getYear(query.seasonYear);
        const season = this.getSeason(query.season);
        const status = this.getStatus(query.status);
        const format = this.getFormat(query.format);
        const sort = this.getSortingFactor(query.sort);
        const page = { page: query.page }
        const perPage = { perPage: query.perPage }

        const formattedQuery = Object.assign({}, search, genres, year, season, status, format, sort, page, perPage)

        console.log('formated query ===>', formattedQuery);

        return formattedQuery
    }
}

module.exports = new queryMapper()