document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;
  console.log("Page path:", path);

  // === CHARACTERS PAGE ===
  if (path.includes("characters.html")) {
    console.log("Fetching character list...");
    fetch("https://www.swapi.tech/api/people")
      .then(response => response.json())
      .then(data => {
        const container = document.getElementById("characters");
        console.log("Character data:", data);

        data.results.forEach(person => {
          const characterCard = document.createElement("div");
          characterCard.innerHTML = `
            <h3 class="character-name" data-url="${person.url}">${person.name}</h3>
            <p>Click on the name for more details.</p>
          `;
          container.appendChild(characterCard);
        });

        // Add event listeners to names
        const characterNames = document.querySelectorAll(".character-name");
        characterNames.forEach(name => {
          name.addEventListener("click", event => {
            const charURL = event.target.getAttribute("data-url");

            fetch(charURL)
              .then(response => response.json())
              .then(data => {
                const p = data.result.properties;
                alert(
                  `${p.name}\n` +
                  `Birth Year: ${p.birth_year}\n` +
                  `Gender: ${p.gender}\n` +
                  `Height: ${p.height} cm\n` +
                  `Mass: ${p.mass} kg\n` +
                  `Hair Color: ${p.hair_color}\n` +
                  `Skin Color: ${p.skin_color}`
                );
              })
              .catch(error => {
                console.error("Error fetching character details:", error);
                alert("Failed to load character details.");
              });
          });
        });

        console.log(`Rendered ${data.results.length} characters.`);
      })
      .catch(error => {
        console.error("Error fetching characters:", error);
        document.getElementById("characters").textContent = "Failed to load character data.";
      });
  }

  // === FILMS PAGE ===
  else if (path.includes("films.html")) {
    console.log("Fetching films...");
    fetch("https://www.swapi.tech/api/films")
      .then(response => response.json())
      .then(data => {
        const container = document.getElementById("films");
        console.log("Film data:", data);

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

        console.log(`Rendered ${data.result.length} films.`);
      })
      .catch(error => {
        console.error("Error fetching films:", error);
        document.getElementById("films").textContent = "Failed to load film data.";
      });
  }
});


