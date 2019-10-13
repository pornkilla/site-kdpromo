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

function reportSuccess(data) {
     var targetSuccess = $(".form.contact .success");     
     targetSuccess.removeClass("hidden");
     targetSuccess.html('<p class="centered">' + data.text + '</p>').slideDown();
     $(".form.contact input[type=text], .form.contact input[type=tel], .form.contact textarea").val('');
}

function nowIsValid() {
    var myform = $('.ui.form.contact');        
    $.ajax({
        type: 'POST',
        url: '../sendmail.php',
        data: myform.serialize(),
        dataType: 'json',
        success: function (data) {
            if (data.type == 'error') {
                var targetError = $(".form.contact .error");
                output = '<p>' + data.text + '</p>';    
                targetError.html(output).slideDown();
            }
            if (data.type == 'done') {
                reportSuccess(data);
            }
        }      
    });
}

// stop the form from submitting normally 
$('.ui.form.contact').submit(function () {
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