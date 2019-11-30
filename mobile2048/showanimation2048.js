// 游戏的动画函数

// 生成数字
function showNumAnimation(i, j, randNum) {
    var numCell = $('#num-cell-' + i + '-' + j);

    numCell.css("background-color", getNumBgc(randNum));
    numCell.css("color", getNumColor(randNum));
    numCell.text(randNum);

    numCell.animate({ //jquery
        width: cellSideLength,
        height: cellSideLength,
        top: getTop(i, j),
        left: getLeft(i, j)
    }, 100)
}


// 移动动画
function showMoveAnimation(fromX, fromY, toX, toY) {
    var numCell = $('#num-cell-' + fromX + '-' + fromY);
    numCell.animate({
        top: getTop(toX, toY),
        left: getLeft(toX, toY)
    }, 200);
}

function updateScore(score) {
    $("span").text(score);
}