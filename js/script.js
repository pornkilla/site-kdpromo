$(document).ready(function () {
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


    // function reportCallbackSuccess(data) {
    //     var targetSuccess = $(".form.current .success");
    //     targetSuccess.removeClass("hidden");
    //     targetSuccess.html('<p class="centered">' + data.text + '</p>').slideDown();
    //     $(".form.callback input[type=text], .form.callback input[type=tel]").val('');
    //     $(".modal .callback button[type=submit]").addClass("hidden");
    //     $(".modal .callback .basic.cancel").removeClass("hidden");
    // }

    // function nowCallbackIsValid() {
    //     var myform = $('.ui.form.callback');
    //     $.ajax({
    //         type: 'POST',
    //         url: '../sendmail.php',
    //         data: myform.serialize(),
    //         dataType: 'json',
    //         success: function (data) {
    //             if (data.type == 'error') {
    //                 var targetError = $(".form.callback .error");
    //                 output = '<p>' + data.text + '</p>';
    //                 targetError.html(output).slideDown();
    //             }
    //             if (data.type == 'done') {
    //                 reportCallbackSuccess(data);
    //             }
    //         }
    //     });
    // }

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

    $('.overlay.navi').visibility({
        type   : 'fixed',
        offset : 0 
    });


    $(document).ready(function(){
        $('.carousel').slick({
            dots: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 3
        });
    });
});