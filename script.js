document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;

  // CHARACTERS LIST
  if (path.includes("characters.html")) {
    fetch("https://www.swapi.tech/api/people/1")
      .then(r => r.json())
      .then(data => {
        const container = document.getElementById("characters");
        // The SWAPI.tech list response lives in data.result (an array)
        data.result.forEach(person => {
          const { name, gender, height, mass } = person.properties;
          const card = document.createElement("div");
          card.innerHTML = `
            <h3>${name}</h3>
            <p>Gender: ${gender}</p>
            <p>Height: ${height} cm, Mass: ${mass} kg</p>
          `;
          container.appendChild(card);
        });
      })
      .catch(err => {
        console.error("Error fetching characters:", err);
        document.getElementById("characters")
                .textContent = "Failed to load character data.";
      });
  }

  // FILMS LIST
  else if (path.includes("films.html")) {
    fetch("https://www.swapi.tech/api/films/1")
      .then(r => r.json())
      .then(data => {
        const container = document.getElementById("films/1");
        data.result.forEach(film => {
          const { title, director, release_date, opening_crawl } = film.properties;
          const card = document.createElement("div");
          card.innerHTML = `
            <h3>${title}</h3>
            <p><strong>Director:</strong> ${director}</p>
            <p><strong>Release Date:</strong> ${release_date}</p>
            <p>${opening_crawl}</p>
          `;
          container.appendChild(card);
        });
      })
      .catch(err => {
        console.error("Error fetching films:", err);
        document.getElementById("films")
                .textContent = "Failed to load film data.";
      });
  }
});

