/*
 * http://love.hackerzhou.me
 */

// Variables
var $win = $(window);
var clientWidth = $win.width();
var clientHeight = $win.height();

// Reload page when window size changes (prevents layout issues)
$(window).resize(function () {
    var newWidth = $win.width();
    var newHeight = $win.height();
    if (newWidth != clientWidth && newHeight != clientHeight) {
        location.replace(location);
    }
});

// Typewriter effect
(function ($) {
    $.fn.typewriter = function () {
        this.each(function () {
            var $ele = $(this),
                str = $ele.html(),
                progress = 0;

            $ele.html('');

            var timer = setInterval(function () {
                var current = str.substr(progress, 1);

                // Skip HTML tags
                if (current == '<') {
                    progress = str.indexOf('>', progress) + 1;
                } else {
                    progress++;
                }

                // Blinking cursor effect
                $ele.html(str.substring(0, progress) + (progress & 1 ? '_' : ''));

                if (progress >= str.length) {
                    clearInterval(timer);
                }
            }, 75);
        });
        return this;
    };
})(jQuery);

// Time counter since a specific date
function timeElapse(date) {
    var current = Date();
    var seconds = (Date.parse(current) - Date.parse(date)) / 1000;

    var days = Math.floor(seconds / (3600 * 24));
    seconds = seconds % (3600 * 24);

    var hours = Math.floor(seconds / 3600);
    if (hours < 10) {
        hours = "0" + hours;
    }

    seconds = seconds % 3600;
    var minutes = Math.floor(seconds / 60);
    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    seconds = seconds % 60;
    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    // Display result
    var result =
        "Day <span class=\"digit\">" + days + "</span> " +
        "Hours <span class=\"digit\">" + hours + "</span> " +
        "Minutes <span class=\"digit\">" + minutes + "</span> " +
        "Seconds <span class=\"digit\">" + seconds + "</span>";

    $("#clock").html(result);
}

// Wait for the user to interact with the page
document.addEventListener('DOMContentLoaded', function() {
    var music = document.getElementById('bg-music');
    var started = false;

    function playMusic() {
        if (!started) {
            music.play().catch(function(err){
                console.log("Audio play failed:", err);
            });
            started = true;
        }
    }

    // Play on first click or touch anywhere
    document.body.addEventListener('click', playMusic, { once: true });
    document.body.addEventListener('touchstart', playMusic, { once: true });
});

