window.KnoxMenu = (function() {
    /*
     * MOBILE MENU TOGGLE
     * */
    var menu_monitor = document.querySelector(".monaka-menu-monitor");

    if (menu_monitor) {
        menu_monitor.onchange = function(event) {
            if (event.target.checked) {
                document.documentElement.classList.add("monaka-no-scroll");
            } else {
                document.documentElement.classList.remove("monaka-no-scroll");
            }
        };
    }


    /*
     * MOBILE SUBMENU TOGGLE
     * */
    Array.prototype.slice.call(document.querySelectorAll(".monaka-menu-arrow")).forEach(function(item) {
        item.onclick = function(event) {
            event.preventDefault();
            event.stopPropagation();
            var item = event.target.parentNode.parentNode;

            if (item.classList.contains("monaka-submenu-open")) {
                item.classList.remove("monaka-submenu-open");
            } else {
                item.classList.add("monaka-submenu-open");
            }
        };
    });


    /*
     * STICKY HEADER
     * */
    var window_last_position = -1;
    var body = document.body;
    var node_monitor = document.querySelector(".monaka-header");

    if (node_monitor) {
        var stop = node_monitor.offsetTop + 320;
        var scroll = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            // IE Fallback, you can even fallback to onscroll
            function(callback) {
                window.setTimeout(callback, 1000 / 60)
            };

        function loop() {
            // avoid calculations if not needed
            if (window_last_position === window.pageYOffset) {
                scroll(loop);
                return false;
            } else {
                window_last_position = window.pageYOffset;
            }

            //... calculations
            if (window_last_position > stop) {
                // stick the header
                if (!body.classList.contains("monaka-header-not-on-top")) {
                    body.classList.add("monaka-header-not-on-top");
                }
            } else {
                // release the header
                if (body.classList.contains("monaka-header-not-on-top")) {
                    body.classList.remove("monaka-header-not-on-top");
                }
            }

            scroll(loop);
        }

        // call the loop for the first time
        loop();
    }


    /*
     * SEARCH FIELD FOCUS/ESCAPE
     * */
    var searchIcons = document.querySelectorAll(".js-monaka-menu-search-icon");
    var searchField = document.querySelector(".js-monaka-menu-search-field");

    if (searchIcons.length > 0 && searchField) {
        Array.prototype.slice.call(searchIcons).forEach(function(search) {
            search.onclick = function() {
                searchField.focus();
            };
        });

        searchField.onkeydown = function(event) {
            if (event.keyCode === 27) {
                if (event.target.value.length > 0) {
                    event.target.value = "";
                } else {
                    searchIcons[0].click();
                    searchField.blur();
                }
            }
        };
    }
});

window.KnoxMenu();