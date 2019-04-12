window.onload = init();

function init() {
    window.addEventListener('scroll', function (e) {
        var distanceY = window.pageYOffset || document.documentElement.scrollTop,
            shrinkOn = 300,
            header = document.querySelector("header");
        if (distanceY > shrinkOn) {
            classie.add(header, "smaller");
        } else {
            if (classie.has(header, "smaller")) {
                classie.remove(header, "smaller");
            }
        }
    });

    $.ajax({
        method: 'GET',
        url: 'assets/data/menu.json',
        dataType: 'json',
        success: function (data) {
            var menu = menuBuilder(data.menu);
            $('nav').append(menu);
            $('#loaderDiv').fadeOut('slow');
        },
        error: function () {
            console.log('all is not good');
        }
    }); // end ajax
}; // end func

function menuBuilder(obj) {
    var theMenu = '';
    if (obj.length > 0) {
        theMenu += '<ul>';
        obj.forEach(function (item) {
            theMenu += '<li><a href="#">' + item.MenuName + '</a>';
            if (item.Menus.length > 0) {
                theMenu += menuBuilder(item.Menus);
            } // endif
            theMenu += '</li>';
        });
        theMenu += '</ul>';
    } else {
        console.log('no data');
    }; // endif
    return theMenu;
}; // end func