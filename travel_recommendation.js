document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.querySelector('#searchButton');
    const resetButton = document.querySelector('#resetButton');
    const searchInput = document.querySelector('.navbar input[type="text"]');
    const resultsContainer = document.querySelector('.results');

    if (searchButton && resetButton && searchInput && resultsContainer) {
        const fetchRecommendations = async (keyword) => {
            try {
                const response = await fetch('travel_recommendation_api.json');
                const data = await response.json();
                const results = data.countries.flatMap(country => country.cities)
                    .filter(city => city.name.toLowerCase().includes(keyword));
                displayResults(results);
            } catch (error) {
                console.error('Error fetching recommendations:', error);
            }
        };

        const displayResults = (results) => {
            resultsContainer.innerHTML = '';
            results.forEach(result => {
                const resultItem = document.createElement('div');
                resultItem.className = 'result-item';
                resultItem.innerHTML = `
                    <h3>${result.name}</h3>
                    <img src="${result.imageUrl}" alt="${result.name}">
                    <p>${result.description}</p>
                `;
                resultsContainer.appendChild(resultItem);
            });
        };

        searchButton.addEventListener('click', () => {
            const keyword = searchInput.value.toLowerCase();
            fetchRecommendations(keyword);
        });

        resetButton.addEventListener('click', () => {
            searchInput.value = '';
            resultsContainer.innerHTML = '';
        });
    } else {
        console.error('One or more elements not found in the DOM');
    }
});

const displayTime = (timeZone) => {
    const options = { timeZone, hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const currentTime = new Date().toLocaleTimeString('en-US', options);
    console.log(`Current time in ${timeZone}:`, currentTime);
};

const fetchRecommendations = async (keyword) => {
    try {
        const response = await fetch('travel_recommendation_api.json');
        const data = await response.json();
        const results = data.countries.flatMap(country => country.cities)
            .filter(city => city.name.toLowerCase().includes(keyword));
        displayResults(results);
        if (results.length > 0) {
            displayTime('America/New_York'); // Example time zone
        }
    } catch (error) {
        console.error('Error fetching recommendations:', error);
    }
};