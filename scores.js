function updateScoreTable() {
    $("#scoresData td").remove();
    var table = document.getElementById('scoresData');
    for (const dataRow of UserScores) {
        var row = table.insertRow(0);
        var Date = row.insertCell(0);
        var score = row.insertCell(1);
        var time = row.insertCell(2);
        var lives = row.insertCell(3);
        Date.innerHTML = dataRow.date;
        time.innerHTML = dataRow.time + "s";
        score.innerHTML = dataRow.score;
        lives.innerHTML = dataRow.lives;

    }
}