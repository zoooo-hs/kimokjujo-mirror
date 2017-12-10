$(document).ready(function() {

    if($.cookie('userType') == 1) {
        $('#user1-main').show();
    } else {
        $('#user2-main').show();
    }

    $.ajax({
        type: "GET",
        url: "/fund",
        cache: false,
        success: function(data) {

            if(data.success == true) {

                console.log(data)

                var tableStrig = '';
                tableStrig += '<table>';
                for (var i = 0; i < data.planMovies.length; i++) {

                    var count = i + 1;
                    var actor1 = actorSearch(data.planMovies[i].actors[0]);
                    var actor2 = actorSearch(data.planMovies[i].actors[1]);
                    var genre = genreSearch(data.planMovies[i].planMovie.genre);
                    var url = "/fund-list/" + data.planMovies[i].planMovie.id;

                    tableStrig += ('<tr>\n' +
                    '<td  width=50px>' + count + '</td>\n' +
                    '<td  width=300px>' + data.planMovies[i].planMovie.title +'                  배우: ' + actor1 + ', ' + actor2 +'</td>\n' +
                    '<td  width=100px>' + genre + '</td>\n' +
                    '<td  width=50px> <a class="a_button" href="' + url + '">Click</a></td>\n' + // url 추가
                    '</tr>\n' //+
                    //'<tr>\n' +
                    //'<td>배우: ' + actor1 + ', ' + actor2 + '</td>\n' +
                    //'</tr> \n');
                    )}
                tableStrig += '</table>';
                $(tableStrig).appendTo('#planList');
            } else {
                alert('서버 문제가 발생했습니다.\n다시 시도해 주시기 바랍니다. ');
            }
        },
        error: function(e) {
            alert('서버 연결 에러');
        }
    });
})

function actorSearch(id) {
    var n;
    for (var i = 0; i < actors.length; i++) {
        if(actors[i].data == id) {
            n = actors[i].value;
            return n;
        }
    }
}

function genreSearch(id) {
    var n;
    for (var i = 0; i < genre.length; i++) {
        if(genre[i].data == id) {
            n = genre[i].value;
            return n;
        }
    }
}
