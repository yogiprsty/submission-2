const dbPromised = idb.open('cl-info', 1, upgradeDb => {
    const favTeamsObjectStore = upgradeDb.createObjectStore('fav-teams',
    {
        keyPath: "id"
    });
    favTeamsObjectStore.createIndex('shortName', 'shortName', {unique: false});
})

const saveFavoriteTeam = (team) => {
    dbPromised
        .then(db => {
            const tx = db.transaction("fav-teams", "readwrite");
            const store = tx.objectStore("fav-teams");
            // disabledBtn(team.id);
            store.add(team);
            return tx.complete;
        })
        .then(()=> console.log("Team tersimpan"))
        .catch(()=>{
            alert('Team sudah ada difavorite');
        })
}

const getAllTeams = () => {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                var tx = db.transaction("fav-teams", "readonly");
                var store = tx.objectStore("fav-teams");
                return store.getAll();
            })
            .then(function (teams) {
                resolve(teams);
            });
    });
}