var engine = new chessEngine();

var backgroundLock = 0;
var clickLock = 0;
var userSource, userTarget;
var repetitions = 0;

function dragPiece(event, square) {
  if (engine.getPiece(square)) {
    userSource = square;
  } else {
    event.preventDefault();
  }
}

function dragOver(event, square) {
  event.preventDefault();

  if (square == userSource) event.target.src = "imgs/0.png";
}

function dropPiece(event, square) {
  userTarget = square;

  let promotedPiece = parseInt(document.getElementById("promoted").value);

  promotedPiece = engine.getSide() ? promotedPiece + 6 : promotedPiece;

  let valid = validateMove(userSource, userTarget, promotedPiece);

  engine.movePiece(userSource, userTarget, promotedPiece);

  clickLock = 0;

  if (engine.getPiece(userTarget) <= 6 && engine.getPiece(userSource) == 0) {
    document.getElementById(userSource).style.backgroundColor =
      engine.PREV_COLOR;
    document.getElementById(userTarget).style.backgroundColor =
      engine.NEXT_COLOR;
  }
  event.preventDefault();

  if (valid)
    setTimeout(function () {
      think();
    }, 1);
}

function tapPiece(square) {
  engine.drawBoard();
  engine.updateBoard();

  if (engine.getPiece(square))
    document.getElementById(square).style.backgroundColor = engine.SELECT_COLOR;

  var clickSquare = parseInt(square, 10);

  if (!clickLock && engine.getPiece(clickSquare)) {
    userSource = clickSquare;
    clickLock ^= 1;
  } else if (clickLock) {
    userTarget = clickSquare;

    let promotedPiece = parseInt(document.getElementById("promoted").value);

    promotedPiece = engine.getSide() ? promotedPiece + 6 : promotedPiece;

    let valid = validateMove(userSource, userTarget, promotedPiece);

    engine.movePiece(userSource, userTarget, promotedPiece);

    clickLock = 0;

    if (engine.getPiece(square)) {
      if (userSource == square) {
        document.getElementById(userSource).style.backgroundColor =
          engine.SELECT_COLOR;
        clickLock = 0;
      } else {
        if (
          engine.getPiece(userTarget) <= 6 &&
          engine.getPiece(userSource) == 0
        ) {
          document.getElementById(userSource).style.backgroundColor =
            engine.PREV_COLOR;
          document.getElementById(userTarget).style.backgroundColor =
            engine.NEXT_COLOR;
        }
      }
    }

    if (valid)
      setTimeout(function () {
        think();
      }, 1);
  }
}

function validateMove(userSource, userTarget, promotedPiece) {
  let moveString =
    engine.squareToString(userSource) +
    engine.squareToString(userTarget) +
    engine.promotedToString(promotedPiece);

  let move = engine.moveFromString(moveString);
  return move;
}

function setFen() {
  let fen = document.getElementById("fen").value;
  engine.setBoard(fen);
  engine.drawBoard();
  engine.updateBoard();
}

function resetGame() {
  engine.setBoard(engine.START_FEN);
  engine.drawBoard();
  engine.updateBoard();
  repetitions = 0;
}

function undoMove() {
  engine.takeBack();
  engine.takeBack();
  engine.drawBoard();
  engine.updateBoard();
}

function flip() {
  engine.flipBoard();
  engine.drawBoard();
  engine.updateBoard();
}

function think() {
  engine.drawBoard();
  engine.updateBoard();
  engine.resetTimeControl();

  let moveTime = parseFloat(document.getElementById("movetime").value),
    timing = engine.getTimeControl(),
    startTime = new Date().getTime();

  timing.timeSet = 1;

  timing.time = moveTime * 1000;

  timing.stopTime = startTime + timing.time;

  engine.setTimeControl(timing);

  let bestMove = engine.search(64),
    previousSquare = engine.getMoveSource(bestMove),
    nextSquare = engine.getMoveTarget(bestMove),
    promotedPiece = engine.getMovePromoted(bestMove);

  engine.movePiece(previousSquare, nextSquare, promotedPiece);

  if (engine.isRepetition()) repetitions++;

  if (repetitions == 3) {
    alert(
      "Draw by 3 fold repetition. Refresh the page or click reset to start a new game."
    );
    return;
  } else if (engine.getFifty() >= 100) {
    alert(
      "Draw by 50 rule move. Refresh the page or click reset to start a new game."
    );
    return;
  } else if (engine.isMaterialDraw()) {
    alert(
      "Draw by insufficient material. Refresh the page or click reset to start a new game."
    );
    return;
  } else if (engine.generateLegalMoves().length == 0 && engine.inCheck()) {
    alert("Checkmate. Refresh the page or click reset to start a new game.");
    return;
  } else if (engine.generateLegalMoves().length == 0 && engine.inCheck() == 0) {
    alert("Stalemate. Refresh the page or click reset to start a new game.");
    return;
  }

  if (engine.getPiece(nextSquare))
    document.getElementById(previousSquare).style.backgroundColor =
      engine.PREV_COLOR;
  document.getElementById(nextSquare).style.backgroundColor = engine.NEXT_COLOR;
}

const element = document.getElementById("chessboard");
element.addEventListener("contextmenu", function (event) {
  // Prevent the default context menu
  event.preventDefault();
});
