# Chess-Engine

![Sample image of a game](https://github.com/JaehyeongPark06/Chess-Engine/assets/78674944/f79930b9-761a-47ce-bce0-6b63bf880ba0)

![Chess engine playing against me](https://github.com/JaehyeongPark06/Chess-Engine/assets/78674944/35f52f44-d989-46a5-8bc1-cbdb9d735a7e)

## About

A chess engine based on the Negamax algorithm with an estimated elo of 1500 - 1600.
The GUI includes undoing moves, flipping and resetting the board, under promotions, and custom board positions and evaluation times.

## Libraries and Tools Used

- [Bootstrap](https://getbootstrap.com/) for GUI buttons.

## Algorithms and Optimization Techniques Used

- Negamax algorithm simplifies the implementation of the minimax algorithm by taking advantage of the zero-sum nature of the game.
- Alpha-beta pruning refines the search by eliminating branches that are guaranteed not to affect the final decision.
- Iterative deepening explores the most promising moves first, making the best use of the available search time.
- Piece-square tables evaluates the relative value of pieces on the board, guiding the search algorithm towards better moves.
- Move ordering using the MVV-LVA heuristic prioritizes moves that capture high-value pieces and also reduces the search space.
- Principal variation search for improving the efficiency of the search process by searching only the most promising lines of play.
- Quiescence search for ensuring that the evaluation of the position is stable by extending the search to positions where there are no - captures or checks.
- Zobrist hashing for storing the game state in a compact and efficient way, allowing for quick comparisons and detection of repetitions.
- Late move reduction for optimizing the search process by reducing the depth of the search for moves that are considered less promising.
- Mate distance pruning cuts trees and adjust bounds of lines where no shorter mate is possible
- Null move pruning (Null Move Heuristic, NMH) reduces the search space by seeing if a null move (a move that passes the turn back to the opponent), still results in a position that is better than the alpha threshold. If it is a better position, then actual moves are likely to result in an even better position.

## Possible Improvements

- Switching programming languages
- Using a more detailed evaluation method (ex. use of opening tables)
- Transposition Tables
- Replacing the [Simplified Evaluation Function](https://www.chessprogramming.org/Simplified_Evaluation_Function) with [PeSTO's Evaluation Function](https://www.chessprogramming.org/PeSTO%27s_Evaluation_Function)

## License

See [License](https://github.com/JaehyeongPark06/Chess-Engine/blob/main/LICENSE)

#### You can play against it [here](https://chess.jadenpark.ca)
