

//-------------------------------------------------------------------------//
(function ($) {
    function Slide(ele, options) {
        this.$ele = $(ele)
        this.options = $.extend({
            speed: 1000,
            delay: 3000
        }, options)
        this.states = [
            { '&zIndex': 1, width: 470, height: 300, top: 61, left: 0, $opacity: 0.6 },
            { '&zIndex': 2, width: 570, height: 370, top: 37, left: 85, $opacity: 0.7 },
            { '&zIndex': 3, width: 655, height: 430, top: 0, left: 162, $opacity: 1 },
            { '&zIndex': 2, width: 570, height: 370, top: 37, left: 348, $opacity: 0.7 },
            { '&zIndex': 1, width: 470, height: 300, top: 61, left: 540, $opacity: 0.6 },
            { '&zIndex': 0, width: 0, height: 0, top: 61, left: 540, $opacity: 0.5 }
        ]
        this.lis = this.$ele.find('li')
        this.interval
        this.$ele.find('span:nth-child(2)').on('click', function () {
            this.stop()
            this.next()
            this.play()
        }.bind(this))
        this.$ele.find('span:nth-child(1)').on('click', function () {
            this.stop()
            this.prev()
            this.play()
        }.bind(this))
        this.move()
        this.play()
    }


    Slide.prototype = {
        move: function () {
            this.lis.each(function (i, el) {
                $(el)
                    .css('z-index', this.states[i]['&zIndex'])
                    .finish().animate(this.states[i], this.options.speed)
                    .find('img').css('opacity', this.states[i].$opacity)
            }.bind(this))
        },
        next: function () {
            this.states.unshift(this.states.pop())
            this.move()
        },
        prev: function () {
            this.states.push(this.states.shift())
            this.move()
        },
        play: function () {
            this.interval = setInterval(function () {
                this.next()
            }.bind(this), this.options.delay)
        },
        stop: function () {
            clearInterval(this.interval)
        }

    }
    $.fn.zySlide = function (options) {
        this.each(function (i, ele) {
            new Slide(ele, options)
        })
        return this
    }

    document.addEventListener("DOMContentLoaded", (event) => {
        const slider = document.getElementById('Slide1');
        new Slide(slider, null);
    });

})(jQuery)
