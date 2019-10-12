$('#form-one').form({});

$('#form-two').form({
    inline: true,
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

$('#form-three').form({});

$('#form-four').form({});

//Ajax form submit
$(".form button").click(function () {
    var selectedForm = this.closest('.form');
    var proceed = true;

    if (proceed) //everything looks good! proceed...
    {
        //get input field values data to be sent to server
        post_data = {
            'user_name': $selectedForm.find('input[name=fieldname]').val(),
            // 'user_email'    : $('input[name=email]').val(), 
            // 'country_code': $('input[name=phone1]').val(),
            'phone_number': $selectedForm.find('input[name=fieldphone]').val(),
            // 'subject'       : $('select[name=subject]').val(), 
            'msg': $selectedForm.find('textarea[name=message]').val()
        };

        //Ajax post data to server
        $.post('sendmail.php', post_data, function (response) {
            if (response.type == 'error') { //load json data from server and output message     
                output = '<div class="error">' + response.text + '</div>';
            } else {
                output = '<div class="success">' + response.text + '</div>';
                //reset values in all input fields
                $(".form input[required=true], .form textarea").val('');
            }
            $(".form #contact_results").hide().html(output).slideDown();
        }, 'json');
    }
});
// ----------

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