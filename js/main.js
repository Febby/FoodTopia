//Init variable
var clientID = "0bb1c26ce5d54ede9f37467517b9286a";
var url = "https://api.instagram.com/v1/tags/{*}/media/recent";

//Images
function displayImages(obj) {
    var str = "";
    $.each(obj, function(i, el) {
        /* iterate through array or object */
        str += '<li>' + '<ul class="cd-item-wrapper">' + '<li class="is-visible">' + '<a href="' + el.link + '" target="_blank">' +
            '<img src="' + el.images.standard_resolution.url + '" />' + '</a>' + '</li>' + '</ul>' + '</li>';
    });
    $('ul.cd-gallery').html(str);
}

function checkValue() {
    if (!$.trim(query)) {
        alert("error");
        return false;
    }
}

//search function

$('form').on('submit', function(event) {
    event.preventDefault();
    /* Act on the event */
    var query = $('#search').val();

    $.ajax({
        url: url.replace('{*}', query) + "?callback=?",
        type: "GET",
        dataType: 'json',
        data: {
            client_id: clientID
        },
        beforeSend: function() {
            if (!$.trim(query)) {
                alert("Whoops! Please fill in the search form");
                return false;
            } else {
                $('ul.cd-gallery').html("<div class='loader1'><i></i><i></i></div>")
            }

        },
        success: function(a, b) {
            console.log("success", a.data, b);
            if (a.data.length) {
                displayImages(a.data);
            } else {
                $('ul.cd-gallery').html("<h3>Sorry, No Results for that query</h3>")
            }
        }
    })
        .done(function() {
            console.log("Done");
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });

});
