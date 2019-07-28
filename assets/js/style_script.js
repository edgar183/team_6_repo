//Used as placeholder it should be replaced by the real quiz.
(function() {
    var allQuestions = [{
        question: "Where do you feel better",
        options: ["Beach", "Lake", "River"],
    }, {
        question: "Do you like speed?",
        options: ["Yes", "No"],
    }, {
        question: "Are you afraid of heights?",
        options: ["Yes", "No"],
    }, {
        question: "How athletic are you?",
        options: ["Very athletic", "Ahletic", "Moderate"],
    }, {
        question: "Would you like go underwater?",
        options: ["Yes", "No"],
    }, {
        question: "How would you feel more comfortable?",
        options: ["Standing", "Seating", "Floating"],
    }, {
        question: "Do you like boats?",
        options: ["Yes", "No"],
    }];

    var quesCounter = 0;
    var selectOptions = [];
    var quizSpace = $('#quiz');

    nextQuestion();

    $('#next').click(function() {
        chooseOption();
        if (isNaN(selectOptions[quesCounter])) {
            alert('Please select an option !');
        }
        else {
            quesCounter++;
            nextQuestion();
        }
    });

    $('#prev').click(function() {
        chooseOption();
        quesCounter--;
        nextQuestion();
    });

    function createElement(index) {
        var element = $('<div>', { id: 'question' });
        var header = $('<h2>Question No. ' + (index + 1) + ' :</h2>');
        element.append(header);

        var question = $('<p>').append(allQuestions[index].question);
        element.append(question);

        var radio = radioButtons(index);
        element.append(radio);

        return element;
    }

    function radioButtons(index) {
        var radioItems = $('<ul class="custom-control custom-radio">');
        var item;
        var input = '';
        for (var i = 0; i < allQuestions[index].options.length; i++) {
            item = $('<li>');
            input = '<input type="radio" name="answer" value=' + i + ' />';
            input += allQuestions[index].options[i];
            item.append(input);
            radioItems.append(item);
        }
        return radioItems;
    }

    function chooseOption() {
        selectOptions[quesCounter] = +$('input[name="answer"]:checked').val();
    }

    function nextQuestion() {
        quizSpace.fadeOut(function() {
            $('#question').remove();
            if (quesCounter < allQuestions.length) {
                var nextQuestion = createElement(quesCounter);
                quizSpace.append(nextQuestion).fadeIn();
                if (!(isNaN(selectOptions[quesCounter]))) {
                    $('input[value=' + selectOptions[quesCounter] + ']').prop('checked', true);
                }
                if (quesCounter === 1) {
                    $('#prev').show();
                }
                else if (quesCounter === 0) {
                    $('#prev').hide();
                    $('#next').show();
                }
            }
            else {
                var scoreRslt = displayResult();
                quizSpace.append(scoreRslt).fadeIn();
                $('#next').hide();
                $('#prev').hide();
            }
        });
    }

    function displayResult() {
        var score = $('<p>', { id: 'question' });
        var correct = 0;
        for (var i = 0; i < selectOptions.length; i++) {
            if (selectOptions[i] === allQuestions[i].answer) {
                correct++;
            }
        }
        score.append('You scored ' + correct + ' out of ' + allQuestions.length);
        return score;
    }
})();

//Used for a lightbox
$(document).on('click', '[data-toggle="lightbox"]', function(event) {
    event.preventDefault();
    $(this).ekkoLightbox();
});


$("#sptbtn").click(function() {
    $('html, body').animate({
        scrollTop: $("#sports").offset().top
    }, 2000);
});

$("#qbtn").click(function() {
    $('html, body').animate({
        scrollTop: $("#quiz-section").offset().top
    }, 2000);
});


$("#hmbtn").click(function() {
    $('html, body').animate({
        scrollTop: $("#landing").offset().bottom
    }, 2000);
});

$("#ctbtn").click(function() {
    $('html, body').animate({
        scrollTop: $("#contact").offset().top
    }, 2000);
});