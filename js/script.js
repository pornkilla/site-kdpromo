$(document).ready(function () {

    const mobileBreakpoint = 960;
    const stickyOffset = 90;

    $('.learn-more').click(function () {
        $('.tiny.modal').modal('show');
    });
    $('.show-legal').click(function () {
        $('.modal.legal').modal('show');
    });
    $('.modal .cancel').click(function () {
        $('.ui.modal').modal('hide');
    });


    $('.ui.form.contact').form({
        inline: true,
        on: 'blur',
        transition: 'fade down',
        onSuccess: nowIsValid,
        fields: {
            fieldname: {
                identifier: 'fieldname',
                rules: [{
                        type: 'empty',
                        prompt: 'Назовите себя, пожалуйста'
                    },
                    {
                        type: 'minLength[2]',
                        prompt: 'Введите хотя бы две буквы'
                    }
                ]
            },
            fieldphone: {
                identifier: 'fieldphone',
                rules: [{
                    type: 'empty',
                    prompt: 'Пожалуйста, укажите телефон для связи'
                }, {
                    type: 'number',
                    prompt: 'Допускаются только цифры'
                }, {
                    type: 'minLength[5]',
                    prompt: 'Мы не уверены, что такие короткие номера вообще бывают'
                }]
            },
            terms: {
                identifier: 'terms',
                rules: [{
                    type: 'checked',
                    prompt: 'Поле обязательно для подтверждения'
                }]
            }
        }
    });
    $('.ui.form.callback').form({
        inline: true,
        on: 'blur',
        transition: 'fade down',
        onSuccess: nowIsValid,
        fields: {
            fieldname: {
                identifier: 'fieldname',
                rules: [{
                        type: 'empty',
                        prompt: 'Назовите себя, пожалуйста'
                    },
                    {
                        type: 'minLength[2]',
                        prompt: 'Введите хотя бы две буквы'
                    }
                ]
            },
            fieldphone: {
                identifier: 'fieldphone',
                rules: [{
                    type: 'empty',
                    prompt: 'Пожалуйста, укажите телефон для связи'
                }, {
                    type: 'number',
                    prompt: 'Допускаются только цифры'
                }, {
                    type: 'minLength[5]',
                    prompt: 'Мы не уверены, что такие короткие номера вообще бывают'
                }]
            }
        }
    });

    function reportSuccess(data) {
        var targetSuccess = $(".form.current .success");
        targetSuccess.removeClass("hidden");
        targetSuccess.html('<p class="centered">' + data.text + '</p>').slideDown();
        $(".form.current input[type=text], .form.current input[type=tel], .form.current textarea").val('');
        $(".form.current").removeClass("current");
    }

    function nowIsValid() {
        var myform = $('.ui.form.current');
        $.ajax({
            type: 'POST',
            url: '../sendmail.php',
            data: myform.serialize(),
            dataType: 'json',
            success: function (data) {
                if (data.type == 'error') {
                    var targetError = $(".form.current .error");
                    output = '<p>' + data.text + '</p>';
                    targetError.html(output).slideDown();
                }
                if (data.type == 'done') {
                    reportSuccess(data);
                }
            }
        });
    }
    setTimeout(nowIsValid(), 200);

    // stop the form from submitting normally 
    $('.ui.form').submit(function () {
        $(this).addClass("current");
        return false;
    });

    var videoItem = $('#spaceforvideo video');
    var videoMenuItem = $('#spaceforvideo .menu .item');

    videoItem.each(function () {

        $(this)
            // jQuery .data does not work on object/embed elements
            .attr('data-aspectRatio', this.height / this.width)
            .removeAttr('height')
            .removeAttr('width');

    });

    $(window).resize(function () {

         if ($(window).width() > mobileBreakpoint) {
             $('.main.menu ul').removeAttr('style');
             $('.main.menu').removeClass('opened');
         }

        videoItem.each(function () {

            var $el = $(this);
            var newWidth = $el.parents('.active.tab').width();
            $el.width(newWidth).height(newWidth * $el.attr('data-aspectRatio'));

        });

    }).resize();

    videoMenuItem.on('click', function () {
        videoItem.trigger('pause');
    });
    videoMenuItem.tab({
        context: 'parent'
    });
    $('.ui.accordion').accordion();
    $('.ui.checkbox').checkbox();

    $('.carousel').slick({
        infinite: true,
        centerMode: true,
        centerPadding: '60px',
        slidesToShow: 8,
        responsive: [{
            breakpoint: mobileBreakpoint,
            settings: {
                dots: true,
                arrows: false,
                // centerMode: true,
                centerPadding: '5px',
                slidesToShow: 1,
            }
        }]
    });

    var clickOnBurger = function () {
        $(".burger").toggleClass('active');
        $(".main.menu ul").slideToggle('fast');
        $(".main.menu").toggleClass('opened');
    };

    $(".burger").click(function () {
        clickOnBurger();
    })

    // Scroll to section by Page Nav click
    var clickMenu = function () {
        $('a.navlink').click(function () {
            var currentWidth = $(window).width();
            if (currentWidth <= mobileBreakpoint) {
                clickOnBurger();
            }
            var section = $(this).data('nav-section');
            $('html, body').animate({
                'scrollTop': $('[data-section="' + section + '"]').offset().top
            }, 500, 'swing');
            $('.burger').removeClass('active');
            return false;
        });
    };

    // ScrollTop
    var goToTop = function () {
        $('.gotop').on('click', function (event) {
            event.preventDefault();
            scrollToTop();
            return false;
        });

        $(window).scroll(function () {

            var $win = $(window);
            if ($win.scrollTop() > 200) {
                $('.to-top').addClass('active');
            } else {
                $('.to-top').removeClass('active');
            }

        });
    };
    function scrollToTop() {
        $('html, body').animate({
            scrollTop: 0
        }, 500, 'swing');
    }

    // Stick header while scrolling
    $(window).on('scroll', function () {

        var sticky = $('.navi'),            
            scroll = $(window).scrollTop();

        if (scroll >= stickyOffset) {
            sticky.addClass('sticky');
        } else {
            sticky.removeClass('sticky');
        }
    });
    
    clickMenu();
    goToTop();

});