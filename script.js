const form = document.querySelector('form');
const outputSection = document.querySelector('#output-section');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const textInput = formData.get('input-field');

  try {
    const response = await fetch(
      `https://www.swapi.tech/api/people/?name=${textInput}`
    );
    const data = await response.json();
    foundCharacters = data.result;
    console.log(foundCharacters);
    if (foundCharacters.length === 0) {
      outputSection.innerHTML =
        '<p>No match found with given search criteria.</p>';
    } else {
      outputSection.innerHTML = foundCharacters
        .map((character) => {
          return `
              <div class="character-wrapper">
                <p>Name: ${character.properties.name}</p>
                <p>Height: ${character.properties.height}</p>
                <p>Mass: ${character.properties.mass}</p>
                <p>Gender: ${character.properties.gender}</p>
                <p>Hair Color: ${character.properties.hair_color}</p>
              </div>
            `;
        })
        .join('');
    }
  } catch (err) {
    console.log(err);
  }

  e.target.reset();
});
