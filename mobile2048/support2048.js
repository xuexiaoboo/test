// 获得屏幕可使用宽度
documentWidth = window.screen.availWidth;
// 游戏面板宽度
gridContainerWidth = 0.92 * documentWidth;
//小方块边长
cellSideLength = 0.18 * documentWidth;
// 间距
cellSpace = 0.04 * documentWidth;


// 保存main2048所用到的一些函数
function getTop(i, j) {
    return cellSpace + (cellSpace + cellSideLength) * i; //修改
}

function getLeft(i, j) {
    return cellSpace + (cellSpace + cellSideLength) * j; //修改
}

function getNumBgc(num) {
    switch (num) {
        case 2:
            return "#eee4da";
            break;
        case 4:
            return "#ede0c8";
            break;
        case 8:
            return "#f2b179";
            break;
        case 16:
            return "#f59563";
            break;
        case 32:
            return "#f67c5f";
            break;
        case 64:
            return "#f65e3b";
            break;
        case 128:
            return "#edcf72";
            break;
        case 256:
            return "#edcc61";
            break;
        case 512:
            return "#9c0";
            break;
        case 1024:
            return "#33b5e5";
            break;
        case 2048:
            return "#09c";
            break;
        case 4096:
            return "#a6c";
            break;
        case 8192:
            return "#93c";
            break;
    }
    return "black";
}

function getNumColor(num) {
    if (num == 2 || 4) {
        return "#776e65";
    }

    return "white";
}

function noSpace(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] === 0) {
                return false;
            }
        }
    }
    return true;
}

function noMove(board) {
    if (canMoveLeft(board) || canMoveUp(board) || canMoveRight(board) || canMoveDown(board)) {
        return false;
    }
    return true;
}


function canMoveLeft(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) { //最左侧的一列不用判断，始终不能左移
            if (board[i][j] !== 0) {
                if (board[i][j - 1] === 0 || board[i][j - 1] === board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveUp(board) {
    for (var i = 1; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] !== 0) {
                if (board[i - 1][j] === 0 || board[i - 1][j] === board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveRight(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            if (board[i][j] !== 0) {
                if (board[i][j + 1] === 0 || board[i][j + 1] === board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveDown(board) {
    for (var i = 2; i >= 0; i--) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] !== 0) {
                if (board[i + 1][j] === 0 || board[i + 1][j] === board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}


function noBlockL(row, col1, col2, board) {
    for (var i = col1 + 1; i < col2; i++) {
        if (board[row][i] != 0) {
            return false
        }
    }
    return true;
}

function noBlockU(row1, row2, col, board) {
    for (var i = row1 + 1; i < row2; i++) {
        if (board[i][col] != 0) {
            return false;
        }
    }
    return true;
}

function noBlockR(row, col1, col2, board) {
    for (var i = col1 - 1; i > col2; i--) {
        if (board[row][i] != 0) {
            return false;
        }
    }
    return true;
}

function noBlockD(row1, row2, col, board) {
    for (var i = row1 - 1; i > row2; i--) {
        if (board[i][col] != 0) {
            return false;
        }
    }
    return true;
}