import React, { useState, useEffect } from 'react';

// Memory Game Component - Enhanced
const MemoryGame: React.FC = () => {
    const [cards, setCards] = useState<(string | null)[]>([]);
    const [flipped, setFlipped] = useState<number[]>([]);
    const [matched, setMatched] = useState<number[]>([]);
    const [moves, setMoves] = useState(0);
    const [time, setTime] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);
    const [bestTime, setBestTime] = useState<number>(0);

    const symbols = ['🍎', '🍊', '🍌', '🍇', '🍓', '🍑', '🥝', '🍍', '🥭', '🍒', '🍋', '🍉', '🍅', '🥕', '🌽', '🥔', '🍄', '🥜', '🍯', '🧀', '🥚', '🍞', '🥖', '🥨', '🧈', '🥞', '🧇', '🍳', '🥓', '🍖', '🍗', '🥩'];

    useEffect(() => {
        if (gameStarted) {
            const timer = setInterval(() => {
                setTime(prev => prev + 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [gameStarted]);

    useEffect(() => {
        initializeGame();
    }, []);

    const initializeGame = () => {
        const cardCount = 32; // 8x8 grid - 32 pairs (64 cards total)
        const selectedSymbols = symbols.slice(0, cardCount);
        const gameCards = [...selectedSymbols, ...selectedSymbols].sort(() => Math.random() - 0.5);
        setCards(gameCards);
        setFlipped([]);
        setMatched([]);
        setMoves(0);
        setTime(0);
        setGameStarted(false);
    };

    const startGame = () => {
        setGameStarted(true);
    };

    const handleCardClick = (index: number) => {
        if (!gameStarted || flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;

        const newFlipped = [...flipped, index];
        setFlipped(newFlipped);

        if (newFlipped.length === 2) {
            setMoves(prev => prev + 1);
            const [first, second] = newFlipped;
            
            if (cards[first] === cards[second]) {
                setMatched(prev => [...prev, first, second]);
                setFlipped([]);
            } else {
                setTimeout(() => setFlipped([]), 1000);
            }
        }
    };

    const isGameComplete = matched.length === cards.length;

    useEffect(() => {
        if (isGameComplete && time > 0) {
            setBestTime(prev => prev === 0 ? time : Math.min(prev, time));
        }
    }, [isGameComplete, time]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const getGridCols = () => 'grid-cols-8';

    return (
        <div className="bg-slate-900/50 p-6 rounded-xl border border-cyan-500/20">
            <h3 className="text-xl font-bold text-cyan-300 mb-4 text-center">Memory Game</h3>
            

            <div className="text-center">
                <div className="text-cyan-200 mb-4 grid grid-cols-2 gap-4 text-sm">
                    <div>Moves: {moves}</div>
                    <div>Time: {formatTime(time)}</div>
                    <div>Matched: {matched.length / 2} / 32</div>
                    <div>Best: {bestTime > 0 ? formatTime(bestTime) : '--:--'}</div>
                </div>

                {!gameStarted ? (
                    <button
                        onClick={startGame}
                        className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-lg transition-colors mb-6"
                    >
                        Start Game
                    </button>
                ) : (
                    <div className={`grid ${getGridCols()} gap-0.5 mb-6 justify-center max-w-4xl mx-auto`}>
                        {cards.map((card, index) => (
                            <button
                                key={index}
                                className={`w-14 h-14 text-xl rounded-md transition-all duration-300 flex items-center justify-center ${
                                    flipped.includes(index) || matched.includes(index)
                                        ? 'bg-cyan-600 text-white'
                                        : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                                }`}
                                onClick={() => handleCardClick(index)}
                            >
                                {flipped.includes(index) || matched.includes(index) ? card : '?'}
                            </button>
                        ))}
                    </div>
                )}

                {isGameComplete && (
                    <div className="text-green-400 font-bold mb-6">
                        🎉 Congratulations! You won in {moves} moves and {formatTime(time)}!
                    </div>
                )}
                
                <div className="mt-6">
                    <button
                        onClick={initializeGame}
                        className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                        New Game
                    </button>
                </div>
            </div>
        </div>
    );
};

// 2048 Game Component
const Game2048: React.FC = () => {
    const [board, setBoard] = useState<number[][]>([]);
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [won, setWon] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);

    useEffect(() => {
        initializeGame();
    }, []);

    const initializeGame = () => {
        const newBoard = Array(4).fill(null).map(() => Array(4).fill(0));
        addRandomTile(newBoard);
        addRandomTile(newBoard);
        setBoard(newBoard);
        setScore(0);
        setGameOver(false);
        setWon(false);
        setGameStarted(false);
    };

    const startGame = () => {
        setGameStarted(true);
    };

    const exitGame = () => {
        setGameStarted(false);
    };

    const addRandomTile = (board: number[][]) => {
        const emptyCells: {row: number, col: number}[] = [];
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                if (board[row][col] === 0) {
                    emptyCells.push({row, col});
                }
            }
        }
        
        if (emptyCells.length > 0) {
            const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            board[randomCell.row][randomCell.col] = Math.random() < 0.9 ? 2 : 4;
        }
    };

    const moveLeft = (board: number[][]) => {
        const newBoard = board.map(row => {
            const filtered = row.filter(cell => cell !== 0);
            const merged = [];
            for (let i = 0; i < filtered.length; i++) {
                if (i < filtered.length - 1 && filtered[i] === filtered[i + 1]) {
                    merged.push(filtered[i] * 2);
                    setScore(prev => prev + filtered[i] * 2);
                    if (filtered[i] * 2 === 2048) setWon(true);
                    i++;
                } else {
                    merged.push(filtered[i]);
                }
            }
            while (merged.length < 4) merged.push(0);
            return merged;
        });
        return newBoard;
    };

    const moveRight = (board: number[][]) => {
        return board.map(row => {
            const filtered = row.filter(cell => cell !== 0).reverse();
            const merged = [];
            for (let i = 0; i < filtered.length; i++) {
                if (i < filtered.length - 1 && filtered[i] === filtered[i + 1]) {
                    merged.push(filtered[i] * 2);
                    setScore(prev => prev + filtered[i] * 2);
                    if (filtered[i] * 2 === 2048) setWon(true);
                    i++;
                } else {
                    merged.push(filtered[i]);
                }
            }
            while (merged.length < 4) merged.push(0);
            return merged.reverse();
        });
    };

    const moveUp = (board: number[][]) => {
        const transposed = board[0].map((_, colIndex) => board.map(row => row[colIndex]));
        const moved = moveLeft(transposed);
        return moved[0].map((_, colIndex) => moved.map(row => row[colIndex]));
    };

    const moveDown = (board: number[][]) => {
        const transposed = board[0].map((_, colIndex) => board.map(row => row[colIndex]));
        const moved = moveRight(transposed);
        return moved[0].map((_, colIndex) => moved.map(row => row[colIndex]));
    };

    const handleMove = (direction: 'left' | 'right' | 'up' | 'down') => {
        if (gameOver || !gameStarted) return;

        let newBoard: number[][];
        switch (direction) {
            case 'left':
                newBoard = moveLeft(board);
                break;
            case 'right':
                newBoard = moveRight(board);
                break;
            case 'up':
                newBoard = moveUp(board);
                break;
            case 'down':
                newBoard = moveDown(board);
                break;
            default:
                return;
        }

        if (JSON.stringify(newBoard) !== JSON.stringify(board)) {
            addRandomTile(newBoard);
            setBoard(newBoard);
            setBestScore(prev => Math.max(prev, score));
        }

        // Check game over
        if (!canMove(newBoard)) {
            setGameOver(true);
        }
    };

    const canMove = (board: number[][]) => {
        // Check for empty cells
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                if (board[row][col] === 0) return true;
            }
        }

        // Check for possible merges
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                const current = board[row][col];
                if (
                    (row < 3 && board[row + 1][col] === current) ||
                    (col < 3 && board[row][col + 1] === current)
                ) {
                    return true;
                }
            }
        }
        return false;
    };

    const getTileColor = (value: number) => {
        const colors: {[key: number]: string} = {
            0: 'bg-slate-700',
            2: 'bg-slate-600',
            4: 'bg-slate-500',
            8: 'bg-orange-500',
            16: 'bg-orange-400',
            32: 'bg-orange-300',
            64: 'bg-yellow-500',
            128: 'bg-yellow-400',
            256: 'bg-yellow-300',
            512: 'bg-yellow-200',
            1024: 'bg-yellow-100',
            2048: 'bg-cyan-500'
        };
        return colors[value] || 'bg-cyan-400';
    };

    const getTextColor = (value: number) => {
        return value <= 4 ? 'text-slate-200' : 'text-slate-900';
    };

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            // Only handle arrow keys when game is started and not over
            if (gameOver || !gameStarted) return;
            
            switch (e.key) {
                case 'ArrowLeft':
                    e.preventDefault(); // Prevent page scroll
                    handleMove('left');
                    break;
                case 'ArrowRight':
                    e.preventDefault(); // Prevent page scroll
                    handleMove('right');
                    break;
                case 'ArrowUp':
                    e.preventDefault(); // Prevent page scroll
                    handleMove('up');
                    break;
                case 'ArrowDown':
                    e.preventDefault(); // Prevent page scroll
                    handleMove('down');
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [board, gameOver, gameStarted]);

    return (
        <div className="bg-slate-900/50 p-6 rounded-xl border border-cyan-500/20">
            <h3 className="text-xl font-bold text-cyan-300 mb-4 text-center">2048 Game</h3>
            
            <div className="text-center">
                <div className="text-cyan-200 mb-4 grid grid-cols-2 gap-4 text-sm">
                    <div>Score: {score}</div>
                    <div>Best: {bestScore}</div>
                </div>

                {!gameStarted ? (
                    <button
                        onClick={startGame}
                        className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-lg transition-colors mb-6"
                    >
                        Start Game
                    </button>
                ) : (
                    <div className="bg-slate-800 p-4 rounded-xl border-2 border-cyan-500/30 mb-6 inline-block">
                        <div className="grid grid-cols-4 gap-2">
                            {board.map((row, rowIndex) =>
                                row.map((cell, colIndex) => (
                                    <div
                                        key={`${rowIndex}-${colIndex}`}
                                        className={`w-16 h-16 rounded-lg flex items-center justify-center text-lg font-bold transition-all duration-200 ${getTileColor(cell)} ${getTextColor(cell)} ${
                                            cell !== 0 ? 'shadow-lg transform hover:scale-105' : ''
                                        }`}
                                    >
                                        {cell === 0 ? '' : cell}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}

                {won && !gameOver && (
                    <div className="text-green-400 font-bold mb-2">
                        🎉 You reached 2048! Keep going!
                    </div>
                )}

                {gameOver && (
                    <div className="text-red-400 font-bold mb-2">
                        Game Over! Final Score: {score}
                    </div>
                )}

                {gameStarted && (
                    <div className="flex gap-2 justify-center mb-4">
                        <button
                            onClick={() => handleMove('left')}
                            className="bg-cyan-600 hover:bg-cyan-700 text-white px-3 py-1 rounded text-sm transition-colors"
                        >
                            ←
                        </button>
                        <button
                            onClick={() => handleMove('up')}
                            className="bg-cyan-600 hover:bg-cyan-700 text-white px-3 py-1 rounded text-sm transition-colors"
                        >
                            ↑
                        </button>
                        <button
                            onClick={() => handleMove('down')}
                            className="bg-cyan-600 hover:bg-cyan-700 text-white px-3 py-1 rounded text-sm transition-colors"
                        >
                            ↓
                        </button>
                        <button
                            onClick={() => handleMove('right')}
                            className="bg-cyan-600 hover:bg-cyan-700 text-white px-3 py-1 rounded text-sm transition-colors"
                        >
                            →
                        </button>
                    </div>
                )}

                <div className="mt-6">
                    <button
                        onClick={initializeGame}
                        className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                        New Game
                    </button>
                </div>
            </div>
        </div>
    );
};

const Games: React.FC = () => {
    return (
        <section id="games" className="py-12 bg-slate-950">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="relative flex flex-col items-center justify-center mb-12 mt-20">
                    <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0">
                        <div
                            style={{
                                backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
                            }}
                            className="absolute inset-auto right-1/2 h-32 overflow-visible w-[20rem] mt-7 bg-gradient-conic from-cyan-500 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
                        >
                            <div className="absolute w-[100%] left-0 bg-slate-950 h-20 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
                            <div className="absolute w-20 h-[100%] left-0 bg-slate-950 bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
                        </div>
                        <div
                            style={{
                                backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
                            }}
                            className="absolute inset-auto left-1/2 h-32 w-[20rem] mt-7 bg-gradient-conic from-transparent via-transparent to-cyan-500 text-white [--conic-position:from_290deg_at_center_top]"
                        >
                            <div className="absolute w-20 h-[100%] right-0 bg-slate-950 bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
                            <div className="absolute w-[100%] right-0 bg-slate-950 h-20 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
                        </div>
                        <div className="absolute top-1/2 h-24 w-[20rem] translate-y-6 bg-slate-950 blur-2xl"></div>
                        <div className="absolute top-1/2 z-50 h-24 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
                        <div className="absolute inset-auto z-50 h-18 w-[18rem] -translate-y-1/2 rounded-full bg-cyan-500 opacity-50 blur-3xl"></div>
                        <div className="absolute inset-auto z-30 h-18 w-40 -translate-y-[3rem] rounded-full bg-cyan-400 blur-2xl"></div>
                        <div className="absolute inset-auto z-50 h-0.5 w-[20rem] -translate-y-[3.5rem] mt-2.5 bg-cyan-400"></div>
                        <div className="absolute inset-auto z-40 h-22 w-full -translate-y-[6rem] bg-slate-950"></div>
                    </div>
                </div>


                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-50">
                    <MemoryGame />
                    <Game2048 />
                </div>
            </div>
        </section>
    );
};

export default Games;
