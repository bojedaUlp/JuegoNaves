function iniciarVista() {
    var context = document.getElementById('vista').getContext('2d');
    var background = new Image();
    var naveImg = new Image();
    var enemigo1 = new Image();
    var enemigo2 = new Image();

    background.src = "./img/bg2.jpg";
    naveImg.src = "./img/minave.png";
    enemigo1.src = "./img/enemigo1.png";
    enemigo2.src = "./img/enemigo2.png";
    var vistaW = context.canvas.width;
    var vistaH = context.canvas.height;

    var enemigoTemplate = function (options) {
        //w= ancho h=heigth  
        return {
            id: options.id || '',
            x: options.x || '',
            y: options.y || '',
            w: options.w || '',
            h: options.h || '',
            image: options.image || enemigo1
        }
    }

    var arrEnemigos = [
        new enemigoTemplate({ id: "enemigo1", x: 100, y: -20, w: 60, h: 40 }),
        new enemigoTemplate({ id: "enemigo2", x: 225, y: -20, w: 60, h: 40 }),
        new enemigoTemplate({ id: "enemigo3", x: 350, y: -20, w: 60, h: 30 }),
        new enemigoTemplate({ id: "enemigo4", x: 100, y: -70, w: 60, h: 40 }),
        new enemigoTemplate({ id: "enemigo5", x: 225, y: -70, w: 50, h: 40 }),
        new enemigoTemplate({ id: "enemigo6", x: 350, y: -70, w: 50, h: 40 }),
        new enemigoTemplate({ id: "enemigo7", x: 475, y: -70, w: 50, h: 40 }),
        new enemigoTemplate({ id: "enemigo8", x: 600, y: -70, w: 60, h: 40 }),
        new enemigoTemplate({ id: "enemigo9", x: 475, y: -20, w: 50, h: 40 }),
        new enemigoTemplate({ id: "enemigo10", x: 600, y: -20, w: 50, h: 40 }),
        new enemigoTemplate({ id: "enemigo11", x: 100, y: -220, w: 50, h: 30, image: enemigo2 }),
        new enemigoTemplate({ id: "enemigo12", x: 225, y: -220, w: 50, h: 30, image: enemigo2 }),
        new enemigoTemplate({ id: "enemigo13", x: 350, y: -220, w: 80, h: 50, image: enemigo2 }),
        new enemigoTemplate({ id: "enemigo14", x: 100, y: -270, w: 80, h: 50, image: enemigo2 }),
        new enemigoTemplate({ id: "enemigo15", x: 225, y: -270, w: 50, h: 30, image: enemigo2 }),
        new enemigoTemplate({ id: "enemigo16", x: 350, y: -270, w: 50, h: 30, image: enemigo2 }),
        new enemigoTemplate({ id: "enemigo17", x: 475, y: -270, w: 50, h: 30, image: enemigo2 }),
        new enemigoTemplate({ id: "enemigo18", x: 600, y: -270, w: 80, h: 50, image: enemigo2 }),
        new enemigoTemplate({ id: "enemigo19", x: 475, y: -200, w: 50, h: 30, image: enemigo2 }),
        new enemigoTemplate({ id: "enemigo20", x: 600, y: -200, w: 50, h: 30, image: enemigo2 }),
        new enemigoTemplate({ id: "enemigo21", x: 100, y: -300, w: 60, h: 40 }),
        new enemigoTemplate({ id: "enemigo22", x: 225, y: -320, w: 60, h: 40 }),
        new enemigoTemplate({ id: "enemigo23", x: 350, y: -320, w: 60, h: 30 }),
        new enemigoTemplate({ id: "enemigo24", x: 100, y: -370, w: 60, h: 40 }),
        new enemigoTemplate({ id: "enemigo25", x: 225, y: -370, w: 50, h: 40 })
    ];

    var renderEnemigo = function (enemigosList) {
        for (var i = 0; i < enemigosList.length; i++) {
            var enemigo = enemigosList[i];
            context.drawImage(enemigo.image, enemigo.x, enemigo.y += .5, enemigo.w, enemigo.h);
            launcher.detectLowerLevel(enemigo);
        }
    }

    function Launcher() {
        this.y = 500,
            this.x = vistaW * .5 - 25,
            this.w = 100,
            this.h = 100,
            this.direccion,
            this.bg = 'white',
            this.misiles = [];

        this.gameStatus = {
            over: false,
            message: "",
            fillStyle: 'red',
            font: 'italic bold 40px Arial, sans-serif',
        }

        this.render = function () {
            if (this.direccion === 'left') {
                this.x -= 5;
            }
            else if (this.direccion === 'right') {
                this.x += 5;
            }
            else if (this.direccion === 'downArrow') {
                this.y += 5;
            }
            else if (this.direccion === 'upArrow') {
                this.y -= 5;
            }
            context.fillStyle = this.bg;
            context.drawImage(background, 10, 10);
            context.drawImage(naveImg, this.x, this.y, 100, 90);

            for (var i = 0; i < this.misiles.length; i++) {
                var m = this.misiles[i];
                context.fillRect(m.x, m.y -= 5, m.w, m.h);
                this.detectMisil(this.misiles[i], i);
                if (m.y <= 0) {
                    this.misiles.splice(i, 1);
                }
            }

            if (arrEnemigos.length === 0) {
                clearInterval(animateInterval);
                context.fillStyle = 'yellow',
                    context.font = this.gameStatus.font;
                context.fillText('winner', vistaW * .5 - 80, 50);
            }

        }
        var cont = 0;//contador
        this.detectMisil = function (m, mi) {

            for (var i = 0; i < arrEnemigos.length; i++) {
                var e = arrEnemigos[i];
                if (m.x <= e.x + e.w && m.x + m.w >= e.x && m.y >= e.y && m.y <= e.y + e.h) {
                    arrEnemigos.splice(i, 1);
                    cont++;
                    this.misiles.splice(this.misiles[mi], 1);
                    document.querySelector('.barra').innerHTML = "Enemigos muertos:" + cont + "";
                }
            }
        }

        this.detectLowerLevel = function (enemigo) {
            if (enemigo.y > 550) {
                this.gameStatus.over = true;
                this.gameStatus.message = "Game Over";
            }
            if ((enemigo.x < this.x + 45 && enemigo.x > this.x - 45) && (enemigo.y < this.y + 25 && enemigo.y > this.y - 25)) {
                this.gameStatus.over = true;
                this.gameStatus.message = 'Game Over';
            }
            if (this.gameStatus.over === true) {
                clearInterval(animateInterval);
                context.fillStyle = this.gameStatus.fillStyle;
                context.font = this.gameStatus.font;

                context.fillText(this.gameStatus.message, vistaW * .5 - 80, 50);
            }
        }
    }

    var launcher = new Launcher();

    function animate() {
        context.clearRect(0, 0, vistaW, vistaH);
        launcher.render();
        renderEnemigo(arrEnemigos);
    }

    var animateInterval = setInterval(animate, 6);

    var left_btn = document.getElementById('left-btn');
    var right_btn = document.getElementById('right-btn');
    var fire_btn = document.getElementById('fire-btn');
    var start_btn = document.getElementById('start-btn');
    var up_btn = document.getElementById('up-btn');
    var bottom_btn = document.getElementById('down-btn');

    document.addEventListener('keydown', function (event) {
        if (event.keyCode === 37) {
            launcher.direccion = 'left';
            if (launcher.x < vistaW * .2 - 130) {
                launcher.x += 0;
                launcher.direccion = '';
            }
        }
    });
    document.addEventListener('keyup', function (event) {
        if (event.keyCode === 37) {
            launcher.x += 0;
            launcher.direccion = '';
        }
    });

    document.addEventListener('keydown', function (event) {
        if (event.keyCode === 39) {
            launcher.direccion = 'right';
            if (launcher.x > vistaW - 110) {
                launcher.x -= 0;
                launcher.direccion = '';
            }
        }
    });
    document.addEventListener('keyup', function (event) {
        if (event.keyCode === 39) {

            launcher.x -= 0;
            launcher.direccion = '';

        }
    });
    document.addEventListener('keydown', function (event) {
        if (event.keyCode === 38) {
            launcher.direccion = 'upArrow';
            if (launcher.y < vistaH * .2 - 80) {
                launcher.y += 0;
                launcher.direccion = '';
            }
        }
    });

    document.addEventListener('keyup', function (event) {
        if (event.keyCode === 38) {
            launcher.y -= 0;
            launcher.direccion = '';

        }
    });

    document.addEventListener('keydown', function (event) {
        if (event.keyCode === 40) {
            launcher.direccion = 'downArrow';
            if (launcher.y > vistaH - 110) {
                launcher.y -= 0;
                launcher.direccion = '';
            }
        }
    });

    document.addEventListener('keyup', function (event) {
        if (event.keyCode === 40) {
            launcher.y += 0;
            launcher.direccion = '';
        }
    });

    document.addEventListener('keydown', function (event) {
        if (event.keyCode === 80) {
            this.location.reload();
        }
    });

    left_btn.addEventListener('mousedown', function (event) {
        launcher.direccion = 'left';
    });

    left_btn.addEventListener('mouseup', function (event) {
        launcher.direccion = '';
    });

    right_btn.addEventListener('mousedown', function (event) {
        launcher.direccion = 'right';
    });

    right_btn.addEventListener('mouseup', function (event) {
        launcher.direccion = '';
    });

    fire_btn.addEventListener('mousedown', function (event) {
        launcher.misiles.push({ x: launcher.x + launcher.w * .5, y: launcher.y, w: 3, h: 10 });
    });
    up_btn.addEventListener('mousedown', function (event) {
        launcher.direccion = 'upArrow';
    });
    up_btn.addEventListener('mouseup', function (event) {
        launcher.direccion = '';
    });

    bottom_btn.addEventListener('mousedown', function (event) {
        launcher.direccion = 'downArrow';
    });
    bottom_btn.addEventListener('mouseup', function (event) {
        launcher.direccion = '';
    });
    start_btn.addEventListener('mousedown', function (event) {
        window.location.reload();
    });

    document.addEventListener('keydown', function (event) {
        if (event.keyCode == 32) {
            launcher.misiles.push({ x: launcher.x + launcher.w * .5, y: launcher.y, w: 3, h: 10 });
        }
    });


}
window.addEventListener('load', function (event) {
    iniciarVista();
});