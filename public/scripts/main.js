$('.ui.dropdown')
  .dropdown()
;

$('#search-select')
  .dropdown()
;


// const getAnimes = async event => {
//     try {
//         // if (event) event.preventDefault();
    
//         const titleInput = document.getElementById("title")
        
//         const genre_in = document.querySelectorAll('input[name="genre_in"]')
//         const genreValues = []

//         for (let i = 0; i < genre_in.length; i++) {
//             if (genre_in[i].checked) genreValues.push(genre_in[i].value)
//         }

//         const { animes } = await aniList.searchMedia({
//             [titleInput.name]: titleInput.value,
//             genre_in: genreValues
//         });
//         console.log(animes);

//         const resultsSection = document.getElementById("search-results")
//         resultsSection.innerHTML = '';

//         animes.forEach(anime => {
//             document.getElementById("search-results").innerHTML += `
//             <div class="anime-card">
//                 <div>
//                     <img src="${anime.coverImage.medium}" alt="">
//                 </div>
//                 <h3><a href="/anime?id=${anime.externalId}">${anime.title.english ? anime.title.english : anime.title.romaji }</a></h3>

//             </div>
//             `
//         })
//     }
//     catch (err) {
//         console.log(err);
//     }
// }

// // getAnimes()
// document.getElementById('go').addEventListener('click', getAnimes)
// window.onhashchange = () => console.log('test');

document.getElementById('next').onclick = event => {
    // event.preventDefault();

    let page = document.getElementById('page');
    console.log(page.value);
    page.value = Number(page.value) + 1;
    console.log(page.value)

    setTimeout(() => {
      console.log('waiting');
    }, 5000)
}