document.getElementById("fetchDataBtn").addEventListener("click", function () {
    const characterName = document.getElementById("characterInput").value.trim();
    if (characterName === "") {
        alert("Ange ett teckennamn.");
        return;
    }
    const apiUrl = `https://www.swapi.tech/api/people/?name=${characterName}`;

    document.getElementById("biometricData").value = "Fetching data....";

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Nätverkssvaret var inte ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.results.length === 0) {
                throw new Error('Karaktären hittades inte');
            }
            const character = data.results[0].properties;
            const biometricInfo = `Höjd: ${character.height}\nMass: ${character.mass}\nHår färg: ${character.hair_color}\nÖgon färg: ${character.eye_color}\nKön: ${character.gender}`;
            document.getElementById("biometricData").value = biometricInfo;
        })
        .catch(error => {
            console.error('Fel:', error);
            document.getElementById("biometricData").value = `Fel: ${error.message}`;
        });
});
