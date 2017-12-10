var fund_info;

function fundListTable(fund_info){
    var tableStrig = '';
    tableStrig += '<table>';

    for (var i = 0; i < fund_info.length; i++) {

        console.log(fund_info)
        tableStrig += ('<tr>\n' +
            '<td  width=50px>' + fund_info[i].planMovie.id + '</td>\n' +
            '<td  width=300px>' + fund_info[i].planMovie.title +'                  배우: ' + actorSearch(fund_info[i].actors[0]) + ', ' + actorSearch(fund_info[i].actors[1]) +'</td>\n' +
            '<td  width=100px>' + genreSearch(fund_info[i].planMovie.genre) + '</td>\n' +
            '<td  width=50px> <a class="a_button" href="' + "/fund-list/" + fund_info[i].planMovie.id + '">Click</a></td>\n' + // url 추가
            '</tr>\n' //+
            //'<tr>\n' +
            //'<td>배우: ' + actor1 + ', ' + actor2 + '</td>\n' +
            //'</tr> \n');
        )}

    tableStrig += '</table>';
    $(tableStrig).appendTo('#planList');
}

function timeSorting(a, b) {
    return b.planMovie.id - a.planMovie.id;
}

function viewSorting(a, b) {
    return b.planMovieResult.views - a.planMovieResult.views;
}

function likeSorting(a, b) {
    return b.likeCount - a.likeCount;
}

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
                fund_info = data.planMovies;

                fund_info.sort(timeSorting);

                fundListTable(fund_info);
            } else {
                alert('서버 문제가 발생했습니다.\n다시 시도해 주시기 바랍니다. ');
            }
        },
        error: function(e) {
            alert('서버 연결 에러');
        }
    });

    $('#list-view').change(function() {

        console.log($('#list-view option:selected').index())
        var select = $('#list-view option:selected').index();
        if(select == 0) { // 최신
            $('#planList').empty();
            fund_info.sort(timeSorting);
            fundListTable(fund_info);
        } else if(select == 1) { // 인기
            $('#planList').empty();
            fund_info.sort(likeSorting);
            fundListTable(fund_info);
        } else if(select == 2) { // 조회
            $('#planList').empty();
            fund_info.sort(viewSorting);
            fundListTable(fund_info);
        }
    })
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
