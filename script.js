const BASE_URL = "https://www.swapi.tech/api/";

document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;

  // ======= FILMS PAGE =======
  if (path.includes("films.html")) {
    console.log("🛸 Loading films page...");

    const filmSection = document.getElementById("films");

    fetch(`${BASE_URL}films/`)
      .then(res => {
        console.log("📡 Fetching films list...");
        return res.json();
      })
      .then(async data => {
        console.log("✅ Films list response:", data);

        const filmList = data.result;
        let output = "";

        for (let i = 0; i < filmList.length; i++) {
          const filmUrl = filmList[i].url;
          console.log(`🔍 Fetching full details for film ${i + 1}: ${filmUrl}`);

          const filmDetailsRes = await fetch(filmUrl);
          const filmData = await filmDetailsRes.json();
          console.log(`🎬 Film ${i + 1} data:`, filmData);

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
                <p>${f.opening_crawl}</p>
                <h6>Characters:</h6>
                ${f.characters.slice(0, 3).map(charURL => `<a href="#" class="char-link" data-url="${charURL}">${charURL}</a><br>`).join("")}
              </div>
            </div>
          `;
        }

        filmSection.innerHTML = output;
        console.log("📦 Rendered film cards to DOM.");

        // Character link event listeners
        const charLinks = document.querySelectorAll(".char-link");
        console.log(`🔗 Found ${charLinks.length} character links.`);

        charLinks.forEach(link => {
          link.addEventListener("click", event => {
            event.preventDefault();
            const charURL = link.getAttribute("data-url");
            console.log(`🧍 Fetching character from: ${charURL}`);

            fetch(charURL)
              .then(res => res.json())
              .then(data => {
                const c = data.result.properties;
                console.log("✅ Character fetched:", c);
                alert(`${c.name}\nHeight: ${c.height} cm\nBirth Year: ${c.birth_year}`);
              })
              .catch(err => {
                console.error("❌ Character fetch failed:", err);
              });
          });
        });
      })
      .catch(err => {
        console.error("❌ Film fetch failed:", err);
        filmSection.innerHTML = "<p>Failed to load films.</p>";
      });
  }
});
