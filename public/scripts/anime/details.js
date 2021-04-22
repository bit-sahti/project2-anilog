$('.ui.dropdown')
    .dropdown()
;

const spoilersBtn = document.getElementById('show-spoilers');

if (spoilersBtn) {
    spoilersBtn.onclick = () => {
        spoilersBtn.style.display = 'none'
        document.querySelector('.spoilerTags').classList.remove('hidden')
    }
}

// console.log(spoilersBtn);