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
                throw new Error('N�tverkssvaret var inte ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.results.length === 0) {
                throw new Error('Karakt�ren hittades inte');
            }
            const character = data.results[0].properties;
            const biometricInfo = `H�jd: ${character.height}\nMass: ${character.mass}\nH�r f�rg: ${character.hair_color}\n�gon f�rg: ${character.eye_color}\nK�n: ${character.gender}`;
            document.getElementById("biometricData").value = biometricInfo;
        })
        .catch(error => {
            console.error('Fel:', error);
            document.getElementById("biometricData").value = `Fel: ${error.message}`;
        });
});
