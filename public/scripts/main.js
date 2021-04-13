document.getElementById('go').addEventListener('click', async event => {
    try {
        event.preventDefault();
    
        const titleInput = document.getElementById("title")

        const { animes } = await aniList.searchMedia({[titleInput.name]: titleInput.value});
        console.log(animes);

        const resultsSection = document.getElementById("search-results")
        resultsSection.innerHTML = '';

        animes.forEach(anime => {
            document.getElementById("search-results").innerHTML += `
            <div class="anime-card">
                <div>
                    <img src="${anime.coverImage.medium}" alt="">
                </div>
                <h3><a href="/anime?id=${anime.externalId}">${anime.title.english ? anime.title.english : anime.title.romaji }</a></h3>

            </div>
            `
        })
    }
    catch (err) {
        console.log(err);
    }
})