document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;

  // If on the characters page
  if (path.includes("characters.html")) {
    fetch("https://swapi.tech/api/people")
      .then(response => response.json())
      .then(data => {
        const container = document.getElementById("characters");
        data.results.forEach(person => {
          const characterCard = document.createElement("div");
          characterCard.innerHTML = `
            <h3>${person.name}</h3>
            <p>Click for details</p>
          `;
          container.appendChild(characterCard);
        });
      })
      .catch(error => {
        console.error("Error fetching characters:", error);
        document.getElementById("characters").textContent = "Failed to load character data.";
      });
  }

  // If on the films page
  else if (path.includes("films.html")) {
    fetch("https://swapi.tech/api/films")
      .then(response => response.json())
      .then(data => {
        const container = document.getElementById("films");
        data.result.forEach(film => {
          const filmCard = document.createElement("div");
          filmCard.innerHTML = `
            <h3>${film.properties.title}</h3>
            <p><strong>Director:</strong> ${film.properties.director}</p>
            <p><strong>Release Date:</strong> ${film.properties.release_date}</p>
            <p>${film.properties.opening_crawl}</p>
          `;
          container.appendChild(filmCard);
        });
      })
      .catch(error => {
        console.error("Error fetching films:", error);
        document.getElementById("films").textContent = "Failed to load film data.";
      });
  }
});

