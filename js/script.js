$(window).load(function () {
    $('#name').html(localStorage.getItem('name'));
    mainFunc();
});

let rpsInt;
let counter = 0;
let flagRise = true;
let flagGame = true;
let flagMode = true;
let flagVert = true;

function mainFunc() {

    rpsInt = setInterval(intro, 800);

    document.onmousedown = invert;
    document.onmouseup = outvert;
    document.onclick = rise;

    // Выбор знаков
    $(".signs")
        .on("mouseover", function () {
            if (flagGame)
                $(this)
                    .animate({top: "-=10%"}, 100);
        })
        .on("mouseout", function () {
            if (flagGame)
                $(this)
                    .animate({top: "+=10%"}, 100);
        })
        .on("click", function () {
            if (flagGame) {
                let attr = '#' + this.getAttribute('id');
                $('.signs:not(' + attr + ')')
                    .animate({
                        opacity: 0
                    }, 400, function () {
                        $(attr)
                            .animate({opacity: 0}, 500, theGame);
                    });
                $('#result').fadeOut(400);
            }
        });

    // Сброс очков
    $('#reset').on('click', function () {
        localStorage.setItem('userScore', '0');
        localStorage.setItem('compScore', '0');
        document.getElementById('points').innerText = '0 : 0';
    });

    // Анимации меню
    $('.menu').on('mouseover', function () {
        if (!flagMode) return;
        flagMode = false;
        $(this).animate({marginLeft: '10px', marginRight: '10px'}, 100);
        switch ($(this).attr('id')) {
            case 'mo':
                $('#hard,#random').fadeIn(100);
                break;
            case 'sco':
                $('#points,#reset').fadeIn(100);
                break;
            case 'gu':
                $('#guider').fadeIn(100);
                break;
        }
    });
    $('#signs,#result').on('mouseover', function () {
        flagMode = true;
        $('.sliders').fadeOut(200);
        $('.menu').animate({marginLeft: '0', marginRight: '0'}, 150);
    });


    // Перезапуск игры
    $('#restart').on('click', function () {
        $('.op1')
            .fadeOut(600, function () {
                $('.signs').css({opacity: '100', top: '0'}).fadeIn(600);
                $(this).css({top: '-35%'});
                $('#fighter1').attr('src', 'images/LeftRock.png');
                $('#fighter2').attr('src', 'images/Rock.png');
            });
        $('#result')
            .fadeOut(600, function () {
                document.getElementById('result').innerText = 'CHOOSE';
            })
            .fadeIn(600);
        $('#restart').fadeOut(600);
        flagMode = true;
        flagGame = true;

    });

    // Работа с localStorage
    switch (localStorage.getItem('mode')) {
        case '2':
            $('#random').animate({backgroundColor: '#0f0f0f', color: '#ffeb00'}, 100);
            $('#hard').animate({backgroundColor: '#ffeb00', color: '#0f0f0f'}, 100);
            break;
        default:
            $('#hard').animate({backgroundColor: '#0f0f0f', color: '#ffeb00'}, 100);
            $('#random').animate({backgroundColor: '#ffeb00', color: '#0f0f0f'}, 100);
    }
    $('#hard').on('click', function () {
        localStorage.setItem('mode', '1');
        $(this).animate({backgroundColor: '#0f0f0f', color: '#ffeb00'}, 100);
        $('#random').animate({backgroundColor: '#ffeb00', color: '#0f0f0f'}, 100);
    });
    $('#random').on('click', function () {
        localStorage.setItem('mode', '2');
        $(this).animate({backgroundColor: '#0f0f0f', color: '#ffeb00'}, 100);
        $('#hard').animate({backgroundColor: '#ffeb00', color: '#0f0f0f'}, 100);
    });
    if (localStorage.getItem('userScore') !== null)
        document.getElementById('points').innerText = localStorage.getItem('userScore') + ' : ' + localStorage.getItem('compScore');
}

function intro() {
    switch (counter) {
        case 0:
            $('#title').css({opacity: '100'});

            break;
        case 1:
            $('#title').css({transition: 'all .08s linear'});
            document.getElementById('title').innerText = 'PAPER';
            break;
        case 2:
            document.getElementById('title').innerText = 'SCISSORS';
            break;
        case 3:
            document.getElementById('title').innerText = 'じゃんけん';
            document.getElementById('title').style.fontFamily = 'Apple osaka unicode';
            clearInterval(rpsInt);
    }
    counter++;
}

function invert() {
    if (flagVert) {
        document.getElementById('title').style.color = '#ffeb00';
        document.body.style.backgroundColor = '#0f0f0f';
    }
}

function outvert() {
    if (flagVert) {
        document.getElementById('title').style.color = '#0f0f0f';
        document.body.style.backgroundColor = '#ffeb00';
        flagVert = false;
    }
}

function rise() {
    if (flagRise) {
        clearInterval(rpsInt);
        let parent = document.body;
        let elem = document.getElementById('title');
        document.getElementById('title').style.color = '#ffeb00';
        setTimeout(function () {
            parent.removeChild(elem);
        }, 1000);
        setTimeout(function () {
            $('.square').fadeIn(600);
            $('#signs').fadeIn(600);
            $('#result').fadeIn(600);
            flagRise = false;
        }, 200);

    }
}


function theGame() {
    if (!flagGame) return;
    flagGame = false;
    $('.signs').css({display: 'none'});


    let coin1 = parseInt(this.getAttribute("about"));
    let coin2 = 1;
    let userChoice, iChoice;
    switch (coin1) {
        case 1:
            userChoice = 'images/LeftRock.png';
            break;
        case 2:
            userChoice = 'images/LeftScissors.png';
            break;
        case 3:
            userChoice = 'images/LeftPaper.png';
    }


    if (localStorage.getItem('mode') === '2')
        switch (Math.floor(Math.random() * 3) + 1) {
            case 1:
                iChoice = 'images/Rock.png';
                coin2 = 1;
                break;
            case 2:
                iChoice = 'images/Scissors.png';
                coin2 = 2;
                break;
            case 3:
                iChoice = 'images/Paper.png';
                coin2 = 3;
        }
    else {

    }


    if (coin1 === coin2) document.getElementById('result').innerText = 'DRAW';
    else switch (coin1) {
        case 1:
            if (coin2 === 2) document.getElementById('result').innerText = 'WIN';
            else document.getElementById('result').innerText = 'LOSE';
            break;
        case 2:
            if (coin2 === 3) document.getElementById('result').innerText = 'WIN';
            else document.getElementById('result').innerText = 'LOSE';
            break;
        case 3:
            if (coin2 === 1) document.getElementById('result').innerText = 'WIN';
            else document.getElementById('result').innerText = 'LOSE';
    }


    let userScore = localStorage.getItem('userScore'), compScore = localStorage.getItem('compScore');
    if (userScore === null)
        switch (document.getElementById('result').innerText) {
            case 'WIN':
                localStorage.setItem('userScore', '1');
                localStorage.setItem('compScore', '0');
                break;
            case 'LOSE':
                localStorage.setItem('userScore', '0');
                localStorage.setItem('compScore', '1');
                break;
            default:
                localStorage.setItem('userScore', '0');
                localStorage.setItem('compScore', '0');
        }
    else
        switch (document.getElementById('result').innerText) {
            case 'WIN':
                userScore = parseInt(userScore) + 1;
                localStorage.setItem('userScore', userScore);
                break;
            case 'LOSE':
                compScore = parseInt(compScore) + 1;
                localStorage.setItem('compScore', compScore);
                break;
        }

    document.getElementById('points').innerText = localStorage.getItem('userScore') + ' : ' + localStorage.getItem('compScore');

    // Появление кулаков
    $('.op1').fadeIn(200, function () {
        for (let i = 0; i < 2; i++)
            $(this)
                .animate({top: '+=20%'}, 200)
                .animate({top: '-=20%'}, 300);
        $(this)
            .animate({top: '+=30%'}, 140, function () {
                $('#fighter1').attr('src', userChoice);
                $('#fighter2').attr('src', iChoice);
                $('#restart').fadeIn(300);
                $('#result').fadeIn(300);
            });
    });


}


// 1 -rock
// 2 - scissors
// 3 - paper