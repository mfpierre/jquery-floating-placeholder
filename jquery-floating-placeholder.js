/* ===========================================================
 * jquery-floating-placeholder.js v1
 * ===========================================================
 * Copyright 2013 Pierre Margueritte
 * http://www.pinxit.me
 *
 * A very simple and light weight jQuery plugin that
 * makes the placeholder float above the input when typing
 *
 * https://github.com/peachananr/simple-text-rotator
 *
 * ========================================================== */
(function ($) {

    $.fn.floatingPlaceholder = function (options) {
        var settings = $.extend({
            placeholderActiveColor: '#0079FF',
            placeholderIdleColor: '#BBBBBB',
            activeClass: 'placeholder-floating',
            helperClass: 'placeholder-helper',
            transitionTime: '200'
        }, options);

        var wrapper = $('<div>').css({
            'position': 'relative'
        });
        $(this).wrap(wrapper);
        $(this).on('keyup', function () {
            if ($(this).val()) {
                if (!$(this).hasClass(settings.activeClass)) {
                    var placeholderHelper = $("<span>").addClass(settings.helperClass).css({
                        'position': 'absolute',
                        'color': settings.placeholderActiveColor
                    });
                    $(this).parent().prepend($(placeholderHelper).html($(this).attr('placeholder')).hide().fadeIn(settings.transitionTime));
                    $(this).addClass(settings.activeClass).animate({
                        marginTop: '+=' + $(this).prev('span').outerHeight(true) + 'px'
                    }, settings.transitionTime);
                }
            } else if ($(this).hasClass(settings.activeClass)) {
                $(this).prev('span').fadeOut(settings.transitionTime, function () {
                    $(this).next('input').animate({
                        marginTop: '-=' + $(this).outerHeight(true) + 'px'
                    }, settings.transitionTime).removeClass(settings.activeClass);
                    $(this).remove();
                });
            }
        }).on('focus', function () {
            $(this).prev('span').css('color', settings.placeholderActiveColor);
        }).on('focusout', function () {
            $(this).prev('span').css('color', settings.placeholderIdleColor);
        });
    };

}(jQuery));