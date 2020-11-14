const base_url = "https://api.football-data.org/v2/competitions/CL/";
const token = 'eac06389b5dc4146880dc925c6ca2859';

// Blok kode yang akan di panggil jika fetch berhasil
const status = (response) => {
    if (response.status !== 200) {
        console.log("Error : " + response.status);
        // Method reject() akan membuat blok catch terpanggil
        return Promise.reject(new Error(response.statusText));
    } else {
        // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
        return Promise.resolve(response);
    }
}

// Blok kode untuk memparsing json menjadi array JavaScript
const json = (response) => {
    return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
const error = (error) => {
    // Parameter error berasal dari Promise.reject()
    console.log("Error : " + error);
}

const getStandings = () => {
    if ('caches' in window) {
        caches.match(base_url + 'standings').then(response => {
            if (response) {
                response.json().then(data => {
                    let std = data.standings;
                    let tableHTML = ``;
                    for (let i = 0; i < std.length; i += 3) {
                        tableHTML += `
                            <h5>${std[i].group.replace("_", " ")}</h5>
                            <table class="highlight">
                                <thead>
                                    <tr>
                                        <th class="xsmall">Club</th>
                                        <th></th>
                                        <th class="small">W</th>
                                        <th class="small">D</th>
                                        <th class="small">L</th>
                                        <th class="small">MP</th>
                                        <th class="small">GF</th>
                                        <th class="small">GA</th>
                                        <th class="small">GD</th>
                                        <th class="small">Pts</th>
                                    </tr>
                                </thead>
                                <tbody>
                        `;
                        std[i].table.forEach(info => {
                            tableHTML += `
                            <tr>
                                <td>
                                    <img src="${info.team.crestUrl}" alt="${info.team.name}-logo" height="30px">
                                </td>
                                <td>${info.team.name}</td>
                                <td>${info.won}</td>
                                <td>${info.draw}</td>
                                <td>${info.lost}</td>
                                <td>${info.playedGames}</td>
                                <td>${info.goalsFor}</td>
                                <td>${info.goalsAgainst}</td>
                                <td>${info.goalDifference}</td>
                                <td>${info.points}</td>
                            </tr>
                            `;
                        });
                        tableHTML += `
                            </tbody>
                        </table>
                        `;
                    }

                    if (document.getElementById("standings-loader")) {
                        document.getElementById("standings-loader").style.display = 'none';
                    }
                    // Sisipkan komponen card ke dalam elemen dengan id #standings
                    document.getElementById("standings").innerHTML = tableHTML;
                    console.log('using cache standings');
                    return;
                })
            }
        })
    }

    fetch(base_url + "standings", {
        method: 'GET',
        headers: {
            'X-Auth-Token': token
        }
    })
        .then(status)
        .then(json)
        .then(function (data) {
            let std = data.standings;
            let tableHTML = ``;
            for (let i = 0; i < std.length; i += 3) {
                tableHTML += `
                <h5>${std[i].group.replace("_", " ")}</h5>
                <table class="highlight">
                    <thead>
                        <tr>
                            <th class="xsmall">Club</th>
                            <th></th>
                            <th class="small">W</th>
                            <th class="small">D</th>
                            <th class="small">L</th>
                            <th class="small">MP</th>
                            <th class="small">GF</th>
                            <th class="small">GA</th>
                            <th class="small">GD</th>
                            <th class="small">Pts</th>
                        </tr>
                    </thead>
                    <tbody>
                `;
                std[i].table.forEach(info => {
                    tableHTML += `
                    <tr>
                        <td>
                            <img src="${info.team.crestUrl}" alt="${info.team.name}-logo" height="30px">
                        </td>
                        <td>${info.team.name}</td>
                        <td>${info.won}</td>
                        <td>${info.draw}</td>
                        <td>${info.lost}</td>
                        <td>${info.playedGames}</td>
                        <td>${info.goalsFor}</td>
                        <td>${info.goalsAgainst}</td>
                        <td>${info.goalDifference}</td>
                        <td>${info.points}</td>
                    </tr>
                    `;
                });
                tableHTML += `
                    </tbody>
                </table>
                `;
            }

            // matikan loader
            if (document.getElementById("standings-loader")) {
                document.getElementById("standings-loader").style.display = 'none';
            }
            // Sisipkan komponen card ke dalam elemen dengan id #standings
            document.getElementById("standings").innerHTML = tableHTML;
        })
        .catch(error);
}

const getTeams = () => {
    return new Promise((resolve, reject) => {
        if ("caches" in window) {
            caches.match(base_url + 'teams').then(response => {
                if (response) {
                    response.json().then(data => {
                        const teams = data.teams;
                        let cardHtml = ``;
                        // console.log('getTeams Cache');
                        teams.forEach(team => {
                            cardHtml += `
                            <div class="col s12 m6">
                                <div class="card medium" id="team-${team.id}">
                                    <div class="card-image">
                                        <img src="${team.crestUrl}" alt="${team.name}-image" height="200px">
                                    </div>
                                    <div class="card-stacked">
                                        <div class="card-content">
                                            <h5>${team.shortName}</h5>
                                            <p><pre>Name        : ${team.name}</pre></p>
                                            <p><pre>E-mail      : ${team.email}</pre></p>
                                        </div>
                                        <div class="card-action">
                                        <a href="#teams" id="fab-${team.id}" onclick="btnClick(${team.id})">Add to Favorite</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            `;
                        });
                        if (document.getElementById("teams-loader")) {
                            document.getElementById("teams-loader").style.display = 'none';
                        }
                        // Sisipkan komponen card ke dalam elemen dengan id #team-lis
                        document.getElementById("teams-list").innerHTML = cardHtml;
                        resolve(data.teams)
                        console.log('using cache teams');
                        return;
                    });
                }
            });
        }

        fetch(base_url + 'teams', {
            method: 'GET',
            headers: {
                'X-Auth-Token': token
            }
        })
            .then(status)
            .then(json)
            .then(data => {
                const teams = data.teams;
                let cardHtml = ``;
                teams.forEach(team => {
                    cardHtml += `
                    <div class="col s12 m6">
                        <div class="card medium" id="team-${team.id}">
                            <div class="card-image">
                                <img src="${team.crestUrl}" alt="${team.name}-image" height="200px">
                            </div>
                            <div class="card-stacked">
                                <div class="card-content">
                                    <h5>${team.shortName}</h5>
                                    <p><pre>Name        : ${team.name}</pre></p>
                                    <p><pre>E-mail     : ${team.email}</pre></p>
                                </div>
                                <div class="card-action">
                                    <a href="#teams" id="fab-${team.id}" onclick="btnClick(${team.id})">Add to Favorite</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
                });
                // matikan loader
                if (document.getElementById("teams-loader")) {
                    document.getElementById("teams-loader").style.display = 'none';
                }
                // Sisipkan komponen card ke dalam elemen dengan id #team-lis
                document.getElementById("teams-list").innerHTML = cardHtml;
                // kirim daa hasil parsing
                resolve(data.teams);
            }).catch(error);
    })
}

const getFavorite = () => {
    getAllTeams().then(teams => {
        let cardHtml = ``;
        teams.forEach(team => {
            cardHtml += `
                <div class="col s12 m6">
                    <div class="card medium" id="team-${team.id}">
                        <div class="card-image">
                            <img src="${team.crestUrl}" alt="${team.name}-image" height="200px">
                        </div>
                        <div class="card-stacked">
                            <div class="card-content">
                                <h5>${team.shortName}</h5>
                                <p><pre>Name        : ${team.name}</pre></p>
                                <p><pre>E-mail      : ${team.email}</pre></p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
        document.getElementById("favorite-list").innerHTML = cardHtml;
    });
}