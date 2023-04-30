function updateScoreTable() {
    $("#scoresData td").remove();
    var table = document.getElementById('scoresData');
    let sortedScore=UserScores.sort(function(a, b)
    {
     return a.score>b.score;
    });
    let i=1;
    for (const dataRow of sortedScore) {
        var row = table.insertRow(0);
        var Rank = row.insertCell(0);
        var Date = row.insertCell(1);
        var score = row.insertCell(2);
        var time = row.insertCell(3);
        var lives = row.insertCell(4);
        Rank.innerHTML = i;
        Date.innerHTML = dataRow.date;
        time.innerHTML = dataRow.time + "s";
        score.innerHTML = dataRow.score;
        lives.innerHTML = dataRow.lives;
        i++;
    }
}