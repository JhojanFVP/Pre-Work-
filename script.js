// Check current page
document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;

  // ======= FILMS PAGE =======
  if (path.includes("films.html")) {
    const filmSection = document.getElementById("films");

    fetch("https://www.swapi.tech/api/films/")
      .then(res => res.json())
      .then(async data => {
        const filmList = data.result;
        let output = "";

        for (let i = 0; i < filmList.length; i++) {
          const filmUrl = filmList[i].url;

          const filmDetailsRes = await fetch(filmUrl);
          const filmData = await filmDetailsRes.json();
          const f = filmData.result.properties;

          // optional placeholder image logic
          const imageList = [
            "episodeIV.jpg", "episodeII.jpg", "episodeI.jpg",
            "episodeIII.jpg", "episodeVI.jpg", "episodeV.jpg", "episodeVII.jpg"
          ];
          const imageSrc = `./assets/images/movies/${imageList[i % imageList.length]}`;

          output += `
            <div class="card" style="width: 16rem; margin-bottom: 16px;">
              <img class="card-img-top" src="${imageSrc}" alt="${f.title}">
              <div class="card-body">
                <h5 class="card-title">${f.title}</h5>
                <p><strong>Episode:</strong> ${f.episode_id}</p>
                <p><strong>Director:</strong> ${f.director}</p>
                <p><strong>Release Date:</strong> ${f.release_date}</p>
                <p><strong>Opening Crawl:</strong><br>${f.opening_crawl}</p>
                <h6>Characters:</h6>
                ${f.characters.slice(0, 3).map(charURL => `<a href="#" class="char-link" data-url="${charURL}">${charURL}</a><br>`).join("")}
              </div>
            </div>
          `;
        }

        filmSection.innerHTML = output;

        // Add click handlers for character links
        const charLinks = document.querySelectorAll(".char-link");
        charLinks.forEach(link => {
          link.addEventListener("click", event => {
            event.preventDefault();
            const charURL = link.getAttribute("data-url");

            fetch(charURL)
              .then(res => res.json())
              .then(data => {
                const c = data.result.properties;
                alert(`${c.name}\nHeight: ${c.height} cm\nBirth Year: ${c.birth_year}`);
              })
              .catch(err => {
                alert("Failed to load character.");
              });
          });
        });
      })
      .catch(err => {
        filmSection.innerHTML = "<p>Failed to load films.</p>";
        console.error(err);
      });
  }
});

