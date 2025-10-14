import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Clock, Trophy, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";

type Operation = "addition" | "subtraction" | "multiplication" | "division";

interface Question {
  num1: number;
  num2: number;
  operation: Operation;
  correctAnswer: number;
  options: number[];
}

const operationSymbols = {
  addition: "+",
  subtraction: "-",
  multiplication: "×",
  division: "÷",
};

const operationNames = {
  addition: "Penjumlahan",
  subtraction: "Pengurangan",
  multiplication: "Perkalian",
  division: "Pembagian",
};

const generateQuestion = (operation: Operation): Question => {
  let num1: number, num2: number, correctAnswer: number;

  switch (operation) {
    case "addition":
      num1 = Math.floor(Math.random() * 20) + 1;
      num2 = Math.floor(Math.random() * 20) + 1;
      correctAnswer = num1 + num2;
      break;
    case "subtraction":
      num1 = Math.floor(Math.random() * 20) + 10;
      num2 = Math.floor(Math.random() * num1);
      correctAnswer = num1 - num2;
      break;
    case "multiplication":
      num1 = Math.floor(Math.random() * 10) + 1;
      num2 = Math.floor(Math.random() * 10) + 1;
      correctAnswer = num1 * num2;
      break;
    case "division":
      num2 = Math.floor(Math.random() * 10) + 1;
      correctAnswer = Math.floor(Math.random() * 10) + 1;
      num1 = num2 * correctAnswer;
      break;
  }

  const options = [correctAnswer];
  while (options.length < 4) {
    const wrongAnswer = correctAnswer + Math.floor(Math.random() * 10) - 5;
    if (wrongAnswer > 0 && !options.includes(wrongAnswer)) {
      options.push(wrongAnswer);
    }
  }

  return {
    num1,
    num2,
    operation,
    correctAnswer,
    options: options.sort(() => Math.random() - 0.5),
  };
};

export default function QuizGame() {
  const [selectedOperation, setSelectedOperation] = useState<Operation | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    if (gameStarted && !gameEnded && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameStarted) {
      setGameEnded(true);
    }
  }, [timeLeft, gameStarted, gameEnded]);

  const startGame = (operation: Operation) => {
    setSelectedOperation(operation);
    setCurrentQuestion(generateQuestion(operation));
    setGameStarted(true);
    setScore(0);
    setQuestionNumber(1);
    setTimeLeft(60);
    setGameEnded(false);
  };

  const handleAnswerClick = (answer: number) => {
    if (showFeedback || !currentQuestion) return;

    setSelectedAnswer(answer);
    setShowFeedback(true);

    if (answer === currentQuestion.correctAnswer) {
      setScore(score + 10);
    }

    setTimeout(() => {
      if (questionNumber < 10) {
        setQuestionNumber(questionNumber + 1);
        setCurrentQuestion(generateQuestion(selectedOperation!));
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        setGameEnded(true);
      }
    }, 1500);
  };

  const resetGame = () => {
    setSelectedOperation(null);
    setGameStarted(false);
    setGameEnded(false);
    setCurrentQuestion(null);
    setScore(0);
    setQuestionNumber(0);
    setTimeLeft(60);
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-background py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/">
            <Button
              variant="outline"
              size="sm"
              className="mb-8 rounded-full hover-elevate active-elevate-2"
              data-testid="button-back-home"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali
            </Button>
          </Link>

          <div className="text-center mb-12">
            <h1 className="text-5xl font-display font-bold text-foreground mb-4">
              Kuis Matematika ⚡
            </h1>
            <p className="text-xl text-muted-foreground">
              Jawab 10 soal dalam 60 detik!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(["addition", "subtraction", "multiplication", "division"] as Operation[]).map((op) => (
              <motion.div
                key={op}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card
                  className="p-8 cursor-pointer hover-elevate active-elevate-2 transition-all"
                  onClick={() => startGame(op)}
                  data-testid={`button-start-${op}`}
                >
                  <div className="text-center">
                    <div className="text-5xl font-display font-bold text-primary mb-4">
                      {operationSymbols[op]}
                    </div>
                    <h3 className="text-2xl font-display font-semibold text-foreground">
                      {operationNames[op]}
                    </h3>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (gameEnded) {
    const stars = score >= 80 ? 3 : score >= 50 ? 2 : score >= 30 ? 1 : 0;

    return (
      <div className="min-h-screen bg-background py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-12 text-center bg-gradient-to-br from-primary/10 to-secondary/10">
              <Trophy className="h-24 w-24 text-accent mx-auto mb-6 animate-bounce-in" />
              <h2 className="text-4xl font-display font-bold text-foreground mb-4">
                Quiz Selesai!
              </h2>
              <div className="text-6xl font-display font-bold text-primary mb-6">
                {score} Poin
              </div>
              <div className="flex justify-center gap-2 mb-8">
                {[...Array(3)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-12 w-12 ${
                      i < stars ? "text-accent fill-accent" : "text-muted"
                    } animate-bounce-in`}
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>
              <p className="text-xl text-muted-foreground mb-8">
                {stars === 3 && "Luar biasa! Kamu sangat hebat! 🌟"}
                {stars === 2 && "Bagus sekali! Terus berlatih! 👏"}
                {stars === 1 && "Lumayan! Kamu bisa lebih baik lagi! 💪"}
                {stars === 0 && "Jangan menyerah! Coba lagi ya! 🚀"}
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={resetGame}
                  className="rounded-full hover-elevate active-elevate-2"
                  data-testid="button-play-again"
                >
                  Main Lagi
                </Button>
                <Link href="/">
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full hover-elevate active-elevate-2"
                    data-testid="button-back-to-home"
                  >
                    Kembali ke Beranda
                  </Button>
                </Link>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Game Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Clock className="h-6 w-6 text-primary" />
              <span className="text-2xl font-display font-bold text-foreground">
                {timeLeft}s
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Trophy className="h-6 w-6 text-accent" />
              <span className="text-2xl font-display font-bold text-foreground">
                {score} poin
              </span>
            </div>
          </div>
          <Progress value={(questionNumber / 10) * 100} className="h-3" />
          <p className="text-sm text-muted-foreground mt-2">
            Soal {questionNumber} dari 10
          </p>
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          {currentQuestion && (
            <motion.div
              key={questionNumber}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-12 mb-8 bg-gradient-to-br from-primary/5 to-secondary/5">
                <div className="text-center">
                  <div className="text-5xl md:text-6xl font-mono font-bold text-foreground mb-8">
                    {currentQuestion.num1} {operationSymbols[currentQuestion.operation]}{" "}
                    {currentQuestion.num2} = ?
                  </div>
                </div>
              </Card>

              {/* Answer Options */}
              <div className="grid grid-cols-2 gap-4">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = selectedAnswer === option;
                  const isCorrect = option === currentQuestion.correctAnswer;
                  const showCorrect = showFeedback && isCorrect;
                  const showWrong = showFeedback && isSelected && !isCorrect;

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                    >
                      <Button
                        size="lg"
                        onClick={() => handleAnswerClick(option)}
                        disabled={showFeedback}
                        className={`w-full h-24 text-3xl font-display font-bold rounded-xl hover-elevate active-elevate-2 transition-all ${
                          showCorrect
                            ? "bg-success text-success-foreground"
                            : showWrong
                            ? "bg-destructive text-destructive-foreground animate-wiggle"
                            : ""
                        }`}
                        data-testid={`button-answer-${index}`}
                      >
                        {option}
                      </Button>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
