function btnClick(id) {
    const teams = getTeams();
    teams.then(teams=> {
        teams.forEach(team => {
            if(team.id === id){
                saveFavoriteTeam(team)
            }
        })
    })
}

function btnDel(id){
    console.log(id);
    deleteFavoriteTeams(id);
}