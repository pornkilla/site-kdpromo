$(document).ready(function () {

    const mobileBreakpoint = 960;
    const stickyOffset = 90;
    const scrollShift = 64;
    const startYear = 2002;
    const currentYear = (new Date).getFullYear();

    $('.learn-more').click(function () {
        $('.tiny.modal').modal('show');
    });
    $('.show-legal').click(function () {
        $('.modal.legal').modal('show');
    });
    $('.modal .cancel').click(function () {
        $('.ui.modal').modal('hide');
    });

    $('.ui.form').form({
        inline: true,
        on: 'blur',
        transition: 'fade down',
        onSuccess: function(e) {
            var allForms = $("body .ui.form");
            allForms.removeClass("current");
            $(this).addClass("current");
            e.preventDefault();
            nowIsValid();
            return false;
        },
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
            fieldmail: {
                identifier: 'fieldmail',
                rules: [{
                    type: 'empty',
                    prompt: 'Пожалуйста, укажите ваш адрес эл. почты'
                }, {
                    type: 'email',
                    prompt: 'Проверьте, правильно ли указали почту'
                }, {
                    type: 'minLength[2]',
                    prompt: 'Мы не уверены, что такие короткие адреса вообще бывают'
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
    
    function nowIsValid() {
        var myform = $('.current.success');
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

    function reportSuccess(data) {
        var targetSuccess = $(".form.current .success");
        targetSuccess.removeClass("hidden");
        targetSuccess.html('<p class="centered">' + data.text + '</p>').slideDown();
        $(".form.current input, .form.current textarea").val('');
        setTimeout(function() {
             targetSuccess.slideUp("slow", function() {
                $(".form.current").removeClass("success");
                $(".form.current").removeClass("current");
                return true;
            });
        }, 3200);
    }

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
             $('.main.menu ul, .main.menu .special').removeAttr('style');
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
    $('.carousel-first').slick({
        infinite: true,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 2,
        autoplay: true,
        responsive: [{
            breakpoint: mobileBreakpoint,
            settings: {
                dots: true,
                arrows: false,
                centerPadding: '5px',
                slidesToShow: 1,
            }
        }]
    });

    $('.carousel-brus').slick({
        infinite: true,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 2,
        responsive: [{
            breakpoint: mobileBreakpoint,
            settings: {
                dots: true,
                arrows: false,
                centerPadding: '5px',
                slidesToShow: 1,
            }
        }]
    });

    $('.gallery-carousel-brus').slick({
        lazyLoad: 'progressive',
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        responsive: [{
            breakpoint: mobileBreakpoint,
            settings: {
                arrows: true,
                centerPadding: '15px',
                slidesToShow: 2,
            }
        }, {
            breakpoint: 720,
            settings: {
                arrows: true,
                centerPadding: '10px',
                slidesToShow: 1,
            }
        }]
    });

    function deleteModal() {
        $('.ui.basic.modal').each(function() {
            $(this).remove();
        });
    }

    $('.gallery-carousel-brus img').click(function() {
        // Delete any modals hanging around
        deleteModal();

        var image = $(this).attr('src');
        console.log('src: ' + image)
        
        var bigImg = image.replace("thumb-","");

        var leftButton = '<button class="ui icon white circular big modal-navi left button" type="button" onclick="navigate(`left`)"><i class="chevron left icon"></i></button>';

        var rightButton = '<button class="ui icon white circular big modal-navi right button" type="button" onclick="navigate(`right`)"><i class="chevron right icon"></i></button>';

        $('body').append('<div class="ui basic modal lb-modal"><div class="image content"><img src="'+bigImg+'" class="lb-image" /></div><div class="actions">'+leftButton+'<div class="centered"><div class="button cancel ui">Закрыть</div></div>'+rightButton+'</div></div>');
        $('.ui.basic.modal')
        .modal({
            dimmerSettings : {
                className : {
                    active    : 'active lb-dimmer',
                }
            }
        })
        .modal('show');
    });

    $('.carousel-second').slick({
        infinite: true,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 2,
        autoplay: true,
        responsive: [{
            breakpoint: mobileBreakpoint,
            settings: {
                dots: true,
                arrows: false,
                centerPadding: '5px',
                slidesToShow: 1,
            }
        }]
    });

    $('.carousel-third').slick({
        dots: true,
        infinite: false,
        centerPadding: '10px',
        slidesToShow: 3,
        autoplay: true,
        responsive: [{
            breakpoint: mobileBreakpoint,
            settings: {
                dots: true,
                arrows: false,
                autoplay: true,
                centerPadding: '5px',
                slidesToShow: 1,
            }
        }]
    });

    $('#fast-contacts .callmenu').dropdown();
    $('#fast-contacts .callmenu').popup({
        position : 'left center',
        content  : 'Связаться с нами'
    });

    $('#fast-contacts .gotop').popup({
        position : 'left center',
        content  : 'Вернуться наверх страницы'
    });

    var clickOnTechButton = function () {
        $('.allpages .technology').slideToggle('slow');
    }

    $(".tech-revealer .chevron.up").hide();
    $(".tech-revealer .chevron.down").show();
    $(".tech-revealer .reveal-button").click(function () {
        $(".chevron", this).toggle();
        clickOnTechButton();
    })

    var clickOnBurger = function () {
        $(".burger").toggleClass('active');
        $(".main.menu ul, .main.menu .special").slideToggle('fast');
        $(".main.menu").toggleClass('opened');
    };

    $(".burger").click(function () {
        clickOnBurger();
    })

    // Scroll to section by Page Nav click
    var clickMenu = function () {
        $('.navlink').click(function () {
            var currentWidth = $(window).width();
            if (currentWidth <= mobileBreakpoint) {
                clickOnBurger();
            }
            var section = $(this).data('nav-section');
            var offset = $('[data-section="' + section + '"]').offset().top;
            var result =  offset - scrollShift;
            $('html, body').animate({
                'scrollTop': result
            }, 500, 'swing');
            $('.burger').removeClass('active');
            return false;
        });
    };

    var resetModalData = function () {
         $('.modal .package').hide();
    };

    // Offer modal
    var clickOfferItem = function () {
        $('.offer-modal').click(function () {
            resetModalData();
            var target = $(this).data('target');
            var destination = $('[data-source="' + target + '"]');
            $('.offer.modal').modal('show');
            $(destination).show();
            return false;
        });
    };
    
    $('.modal.offer .cancel').click(function () {
        resetModalData();
        $('.modal.offer').modal('hide');
    });


    // ScrollTop
    var goToTop = function () {
        $('.gotop').on('click', function (event) {
            event.preventDefault();
            scrollToTop();
            return false;
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

    var getCurrentYear = function () {        
        $('#year').text(currentYear);
    };

    var getEstimation = function () {        
        $('#eta-year').text(currentYear - startYear);
    };    
    
    clickMenu();
    goToTop();
    getCurrentYear();    
    getEstimation();    
    clickOfferItem();
    resetModalData();

});