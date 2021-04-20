class Mapper {
    getTrailer(trailer) {
        if (!trailer) return null;

        switch(trailer.site) {
            case 'youtube':
                return `https://www.youtube.com/watch?v=${trailer.id}`;
            case 'dailymotion':
                return `https://www.dailymotion.com/video/${trailer.id}`
        }
    }

    getRelatedIds(relations) {
        if (!relations) return null;

        return relations.map(relation => relation.id)
    }



    getTags(level, tags) {
        if (!tags) return null;

        switch(level) {
            case 1:
                return tags
                        .filter(tag => !tag.isMediaSpoiler && !tag.isAdult)
                        .map(tag => tag.name);
            case 2:
                return tags
                        .filter(tag => tag.isMediaSpoiler && !tag.isAdult)
                        .map(tag => tag.name);
            case 3:
                return tags
                        .filter(tag => tag.isAdult)
                        .map(tag => tag.name);
        }
    }

    // getDate(dateInfo) {
    //     const date = new Date(dateInfo.year, dateInfo.month - 1, dateInfo.day)

    //     return date.toDateString().slice(4, 10) + ', ' + dateInfo.year;
    // }

    getStaff(searchType, role, staff) {
        let members;

        searchType <= 1 ? members = staff.filter(member => member.role.includes(role)) :
                    members = staff.filter(member => member.role === role);

        return members.length ? members.map(member => member.node.name.full) : null
    }

    getStudio(studios) {
        if (!studios.nodes.length) return "Various";

        return studios.nodes[0].name;
    }

    formatData(anime){
        return {
                externalId: anime.id,
                isAdult: anime.isAdult,
                title: anime.title,
                synonyms: anime.synonyms,
                coverImage: {
                    extraLarge: anime.coverImage.extraLarge,
                    large: anime.coverImage.large,
                    medium: anime.coverImage.medium,
                },
                bannerImage: anime.bannerImage,
                trailer: this.getTrailer(anime.trailer),
                relations: this.getRelatedIds(anime.relations.nodes),
                description: anime.description,
                genres: anime.genres,
                generalTags: this.getTags(1, anime.tags),
                spoilerTags: this.getTags(2, anime.tags),
                adultTags: this.getTags(3, anime.tags),
                averageScore: anime.averageScore,
                format: anime.format,
                episodes: anime.episodes,
                duration: anime.duration,
                status: anime.status,
                startDate: anime.startDate,
                endDate: anime.endDate,
                source: anime.source,
                creation: this.getStaff(1, 'Original', anime.staff.edges),
                direction: this.getStaff(2, 'Director', anime.staff.edges),
                studio: this.getStudio(anime.studios)
            }
    }

    formatBulkData(rawAnimes) {
        return rawAnimes.map(anime => this.formatData(anime))
    }

    formatPageInfo(pageInfo) {
        pageInfo.currentPage > 1 ? pageInfo.hasPreviousPage =  true : pageInfo.hasPreviousPage = false;

        return pageInfo;
    }
}

module.exports = new Mapper();