// 游戏的运行逻辑


// document.write('<script src="./support2048.js" type="text/javascript" charset="utf-8"></script>');

var board = new Array();
var score = 0;
var flag = new Array();

$(document).ready(function() {
    newgame();
});

function newgame() {
    // 初始化棋盘
    init();

    // 生成数字
    creatNum();
    creatNum();
}

function init() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var gridCell = $("#grid-cell-" + i + "-" + j);
            gridCell.css('top', getTop(i, j));
            gridCell.css('left', getLeft(i, j));
        }
    }

    for (var i = 0; i < 4; i++) {
        board[i] = new Array();
        flag[i] = new Array();
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0;
            flag[i][j] = false;
        }
    }

    score = 0;
    updateBoardView();
}


function updateBoardView() {
    $(".num-cell").remove();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            $("#grid-container").append('<div class = "num-cell" id = "num-cell-' + i + '-' + j + '"></div>');
            var numCell = $('#num-cell-' + i + '-' + j + '');

            if (board[i][j] === 0) {
                numCell.css('height', '0');
                numCell.css('width', '0');
                numCell.css('top', getTop(i, j) + 50);
                numCell.css('left', getLeft(i, j) + 50);
            } else {
                numCell.css('height', '100px');
                numCell.css('width', '100px');
                numCell.css('top', getTop(i, j));
                numCell.css('left', getLeft(i, j));
                // 移动之后添加样式
                numCell.css('background-color', getNumBgc(board[i][j]))
                numCell.css('color', getNumColor(board[i][j]))
                numCell.text(board[i][j])
            }
            flag[i][j] = false;
        }
    }
}

function creatNum() {
    if (noSpace(board)) {
        return false;
    }
    // 随机一个位置
    var randX = parseInt(Math.floor(Math.random() * 4)); //0, 1, 2, 3
    var randY = parseInt(Math.floor(Math.random() * 4));

    var times = 0; //随机数生成次数
    while (times < 50) {
        if (board[randX][randY] == 0) {
            break;
        }

        var randX = parseInt(Math.floor(Math.random() * 4)); //0, 1, 2, 3
        var randY = parseInt(Math.floor(Math.random() * 4));

        times++;
    }

    if (times == 50) {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (board[i][j] == 0) {
                    randX = i;
                    randY = j;
                }
            }
        }
    }

    // 随机一个数字
    var randNum = Math.random() < 0.5 ? 2 : 4;

    // 随机位置显示随机数字
    board[randX][randY] = randNum;
    showNumAnimation(randX, randY, randNum);

    // return true;
}

// 玩家操作
$(document).keydown(function(event) {
    switch (event.keyCode) {
        case 37: //Left
            if (moveLeft()) {
                setTimeout("creatNum()", 210);
                setTimeout("isGameOver()", 300);
            }
            break;
        case 38: //Up
            if (moveUp()) {
                setTimeout("creatNum()", 210);
                setTimeout("isGameOver()", 300);
            }
            break;
        case 39: //Right
            if (moveRight()) {
                setTimeout("creatNum()", 210);
                setTimeout("isGameOver()", 300);
            }
            break;
        case 40: //Down
            if (moveDown()) {
                setTimeout("creatNum()", 210);
                setTimeout("isGameOver()", 300);
            }
            break;
        default:
            break;
    }
});


function isGameOver() {
    if (noSpace(board) && noMove(board)) {
        gameOver();
    }
}

function gameOver() {
    alert("Game Over!");
}

// 左移
function moveLeft() {
    if (!canMoveLeft(board)) {
        return false;
    }

    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[i][j] !== 0) {
                for (var k = 0; k < j; k++) {
                    if (board[i][k] == 0 && noBlockL(i, k, j, board)) {
                        // move
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    } else if (board[i][k] == board[i][j] && noBlockL(i, k, j, board) && !flag[i][k]) {
                        // move
                        showMoveAnimation(i, j, i, k);
                        // add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;

                        score += board[i][k];
                        updateScore(score);
                        flag[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()", 200)
    return true;
}

// 上移
function moveUp() {
    if (!canMoveUp(board)) {
        return false
    }

    for (var i = 1; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] != 0) {
                for (var k = 0; k < i; k++) {
                    if (board[k][j] == 0 && noBlockU(k, i, j, board)) {
                        // move
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    } else if (board[k][j] == board[i][j] && noBlockU(k, i, j, board) && !flag[k][j]) {
                        showMoveAnimation(i, j, k, j);
                        board[k][j] += board[i][j]
                        board[i][j] = 0;

                        score += board[k][j];
                        updateScore(score);
                        flag[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()", 200);
    return true;
}

// 右移
function moveRight() {
    if (!canMoveRight(board)) {
        return false;
    }

    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            if (board[i][j] !== 0) {
                for (var k = 3; k > j; k--) {
                    if (board[i][k] === 0 && noBlockR(i, k, j, board)) {
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    } else if (board[i][k] === board[i][j] && noBlockR(i, k, j, board) && !flag[i][k]) {
                        showMoveAnimation(i, j, i, k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;

                        score += board[i][k];
                        updateScore(score);
                        flag[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()", 200);
    return true;
}

// 下移
function moveDown() {
    if (!canMoveDown(board)) {
        return false;
    }

    for (var i = 2; i >= 0; i--) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] !== 0) {
                for (var k = 3; k > i; k--) {
                    if (board[k][j] === 0 && noBlockD(k, i, j, board)) {
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    } else if (board[k][j] === board[i][j] && noBlockD(k, i, j, board) && !flag[k][j]) {
                        showMoveAnimation(i, j, k, j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;

                        score += board[k][j];
                        updateScore(score);
                        flag[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()", 200);
    return true;
}