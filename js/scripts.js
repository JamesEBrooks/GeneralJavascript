var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var ballRadius = 30;
    var x = canvas.width/2;
    var y = canvas.height-30;
    var dx = 5.3
    var dy = -4.2;
    var paddleHeight = 10;
    var paddleWidth = 90;
    var paddleX = (canvas.width-paddleWidth)/2;
    var rightPressed = false;
    var leftPressed = false;
    var brickRowCount = 14;
    var brickColumnCount = 22;
    var brickWidth = 28;
    var brickHeight = 20;
    var brickPadding = 13;
    var brickOffsetTop = 20;
    var brickOffsetLeft = 20;
    var bricks = [];
    var ballcolour = "#005fdd";

    for(c=0; c<brickColumnCount; c++) {
        bricks[c] = [];
        for(r=0; r<brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0, status: 1 };
        }
    }
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    function keyDownHandler(e) {
        if(e.keyCode == 39) {
            rightPressed = true;
        }
        else if(e.keyCode == 37) {
            leftPressed = true;
        }
    }
    function keyUpHandler(e) {
        if(e.keyCode == 39) {
            rightPressed = false;
        }
        else if(e.keyCode == 37) {
            leftPressed = false;
        }
    }
    function collisionDetection() {
        for(c=0; c<brickColumnCount; c++) {
            for(r=0; r<brickRowCount; r++) {
                var b = bricks[c][r];
                if(b.status == 1) {
                    if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                        dy = -dy;
                        b.status = 0;
                    }
                }
            }
        }
    }
    function drawBall() {
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI*2);
        ctx.fillStyle = ballcolour;
        ctx.fill();
        ctx.closePath();
    }
    function drawPaddle() {
        ctx.beginPath();
        ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
        var grd = ctx.createLinearGradient(75,50,5,90,60,100);

        grd.addColorStop(0,"red");
        grd.addColorStop(1,"white");

        ctx.fillStyle = grd;//"#005fdd";
        ctx.fill();
        ctx.closePath();
    }
    function drawBricks() {
        for(c=0; c<brickColumnCount; c++) {
            for(r=0; r<brickRowCount; r++) {
                if(bricks[c][r].status == 1) {
                    var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
                    var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
                    bricks[c][r].x = brickX;
                    bricks[c][r].y = brickY;
                    ctx.beginPath();
                    ctx.rect(brickX, brickY, brickWidth, brickHeight);
                    ctx.fillStyle = rgb(Math.floor(Math.random() * (c*90)), Math.floor(Math.random() *((c-r)*400)), 30+Math.floor(Math.random() * (r*90)));
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
    }
    function rgb(r, g, b){
                return "rgb("+r+","+g+","+b+")";
                    }


    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBricks();
        drawBall();
        drawPaddle();
        collisionDetection();
        if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
            dx = -dx;
        }
        if(y + dy < ballRadius) {
            dy = -dy;
        }
        else if(y + dy > canvas.height-ballRadius) {
            if(x > paddleX && x < paddleX + paddleWidth) {
                dy = -dy;
                ballcolour = rgb(Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255));
               
                
            }
            else {
                dy = -dy;
                //alert("GAME OVER");
               // setTimeout(reload, 300);
               // function reload(){
               // document.location.reload();
               // }
            }
        }
        if(rightPressed && paddleX < canvas.width-paddleWidth) {
            paddleX +=17;
        }
        else if(leftPressed && paddleX > 0) {
            paddleX -= 17;
        }
        x += dx;
        y += dy;
    }
    drawBricks();
    setInterval(draw, 20);