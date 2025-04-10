const uploadForm = document.getElementById('uploadForm');
const dogGallery = document.getElementById('dogGallery');

uploadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const fileInput = document.getElementById('dogPhoto');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const dogCard = document.createElement('div');
            dogCard.classList.add('dog-card');
            dogCard.innerHTML = `
                <img src="${event.target.result}" alt="Dog Photo">
                <div class="rating">
                    ${[...Array(10)].map((_, i) => `<span data-value="${i + 1}">❤️</span>`).join('')}
                </div>
            `;
            dogGallery.appendChild(dogCard);

            const hearts = dogCard.querySelectorAll('.rating span');
            hearts.forEach(heart => {
                heart.addEventListener('click', () => {
                    const selectedRating = heart.getAttribute('data-value');
                    hearts.forEach(h => {
                        h.classList.toggle('active', h.getAttribute('data-value') <= selectedRating);
                    });
                });
            });
        };
        reader.readAsDataURL(file);
    }
});