// Initializing the chess engine
var engine = new chessEngine();

// These are the user's inputed controls
var backgroundLock = 0;
var clickLock = 0;
var userSource, userTarget;

// This will be a counter variable checking the amount of times a move is repeated
var repetitions = 0;

// This function is checking whether the user is dragging a piece
function dragPiece(event, square) {
  userSource = square;
}

// This function is the drag piece handler
function dragOver(event, square) {
  event.preventDefault();
  // If the user is dragging a piece, then the background color of the initial square will change
  if (square == userSource) event.target.src = "imgs/0.gif";
}

// This function is the drag piece handler
function dropPiece(event, square) {
  userTarget = square;

  // This is getting the promoted piece from the user's settings
  let promotedPiece = parseInt(document.getElementById("promoted").value);

  // Checking whether the piece is white or black
  promotedPiece = engine.getSide() ? promotedPiece + 6 : promotedPiece;

  // Checking the validity of the move
  let valid = validateMove(userSource, userTarget, promotedPiece);

  // Moving the piece from the source square to the target square
  engine.movePiece(userSource, userTarget, promotedPiece);
  // Setting the click lock to 0 so that the user can click on another piece
  clickLock = 0;

  // Then we highlight the square where the piece is located
  if (engine.getPiece(square)) {
    document.getElementById(userSource).style.backgroundColor =
      engine.PREV_COLOR;
    document.getElementById(square).style.backgroundColor = engine.NEXT_COLOR;
  }
  event.preventDefault();

  // If the move is valid, then the AI will think and play a move
  if (valid)
    setTimeout(function () {
      think();
    }, 1);
}

// This function is the click event handler
function tapPiece(square) {
  engine.drawBoard();
  engine.updateBoard();

  // If the user clicks on a square, and the square has a piece, then the background color of the square will change
  if (engine.getPiece(square))
    document.getElementById(square).style.backgroundColor = engine.SELECT_COLOR;

  // This is converting the square to an integer
  var clickSquare = parseInt(square, 10);

  // If the click lock is 0, then the user can click on a piece
  if (!clickLock && engine.getPiece(clickSquare)) {
    userSource = clickSquare;
    clickLock ^= 1;
  }
  // If it is 1, then the user can click on a square
  else if (clickLock) {
    userTarget = clickSquare;

    // This is getting the promoted piece from the user's settings
    let promotedPiece = parseInt(document.getElementById("promoted").value);

    // This is checking whether the piece is white or black
    promotedPiece = engine.getSide() ? promotedPiece + 6 : promotedPiece;

    // This is checking the validity of the move
    let valid = validateMove(userSource, userTarget, promotedPiece);

    // This is moving the piece from the source square to the target square
    engine.movePiece(userSource, userTarget, promotedPiece);

    // This is setting the click lock to 0 so that the user can click on another piece
    clickLock = 0;

    // Then we highlight the square where the piece is located
    if (engine.getPiece(square)) {
      if (userSource == square) {
        document.getElementById(userSource).style.backgroundColor =
          engine.SELECT_COLOR;
        clickLock = 0;
      } else {
        document.getElementById(userSource).style.backgroundColor =
          engine.PREV_COLOR;
        document.getElementById(square).style.backgroundColor =
          engine.NEXT_COLOR;
      }
    }

    // If the move is valid, then the AI will think and play a move
    if (valid)
      setTimeout(function () {
        think();
      }, 1);
  }
}

// This function will be checking the validity of the move
function validateMove(userSource, userTarget, promotedPiece) {
  let moveString =
    engine.squareToString(userSource) +
    engine.squareToString(userTarget) +
    engine.promotedToString(promotedPiece);

  let move = engine.moveFromString(moveString);
  return move;
}

// This function is setting the inputted FEN (Forsyth-Edwards Notation) onto the board
function setFen() {
  let fen = document.getElementById("fen").value;
  engine.setBoard(fen);
  engine.drawBoard();
  engine.updateBoard();
}

// This function resets the board whenever the user clicks on the reset button
function resetGame() {
  engine.setBoard(engine.START_FEN);
  engine.drawBoard();
  engine.updateBoard();
  repetitions = 0;
}

// This function will undo the last move played whenever the user clicks on the take back button
function undoMove() {
  engine.takeBack();
  engine.drawBoard();
  engine.updateBoard();
}

// This function will flip the board whenever the user clicks on the flip board button
function flip() {
  engine.flipBoard();
  engine.drawBoard();
  engine.updateBoard();
}

// This function will make the AI think and play a move whenever the user clicks
// on the AI Move button
function think() {
  engine.drawBoard();
  engine.updateBoard();
  engine.resetTimeControl();

  // When the function is called, we still go through the normal parameters such as
  // checking the max move time
  let moveTime = parseInt(document.getElementById("movetime").value);

  // The variable timing will be equal to what the engine's time control is
  let timing = engine.getTimeControl();

  // Our start time is equal to the current time
  let startTime = new Date().getTime();

  // This is setting the time set to 1
  timing.timeSet = 1;

  // Multiplying the move time by 1000 to convert it to milliseconds
  timing.time = moveTime * 1000;

  // We are setting a stop time as the start time plus the move time
  timing.stopTime = startTime + timing.time;

  // This is telling the engine what the time control is
  engine.setTimeControl(timing);

  // Getting the best move from the engine
  let bestMove = engine.search(64);

  // The source square is the square where the piece was initally located
  let previousSquare = engine.getMoveSource(bestMove);

  // The target square is the square where the piece will be moved to
  let nextSquare = engine.getMoveTarget(bestMove);

  // The promoted piece is the piece that the pawn will be promoted to depending on the user's settings
  let promotedPiece = engine.getMovePromoted(bestMove);

  // This moves the piece from the source square to the target square and if the piece is promoting, it will turn the initial piece to the promoted piece
  engine.movePiece(previousSquare, nextSquare, promotedPiece);

  // The following boolean statements will be checking whether the game is ending
  if (engine.isRepetition()) repetitions++;

  // If there are 3 repeated moves, then the game will end in a draw by 3 fold repetition
  if (repetitions == 3) {
    alert(
      "Draw by 3 fold repetition. Refresh the page or click reset to start a new game."
    );
    return;
  }

  // This is checking whether there ahve been more than 100 moves in total without a capture or pawn move
  else if (engine.getFifty() >= 100) {
    alert(
      "Draw by 50 rule move. Refresh the page or click reset to start a new game."
    );
    return;
  }

  // This is checking whether the game is ending in a draw by insufficient material (eg. King vs King and Bishop)
  else if (engine.isMaterialDraw()) {
    alert(
      "Draw by insufficient material. Refresh the page or click reset to start a new game."
    );
    return;
  }

  // This is checking if the game is ending in a checkmate
  else if (engine.generateLegalMoves().length == 0 && engine.inCheck()) {
    alert("Checkmate. Refresh the page or click reset to start a new game.");
    return;
  }

  // This is checkign whether the game is ending in a stalemate
  else if (engine.generateLegalMoves().length == 0 && engine.inCheck() == 0) {
    alert("Stalemate. Refresh the page or click reset to start a new game.");
    return;
  }

  // After all these checks have been done, the target square will be highlighted to show the move has been made
  if (engine.getPiece(nextSquare))
    document.getElementById(previousSquare).style.backgroundColor =
      engine.PREV_COLOR;
  document.getElementById(nextSquare).style.backgroundColor = engine.NEXT_COLOR;
}
