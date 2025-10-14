import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Trophy, Star, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Operation = "addition" | "subtraction" | "multiplication" | "division";

interface Problem {
  id: number;
  num1: number;
  num2: number;
  operation: Operation;
  answer: number;
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

const generateProblems = (operation: Operation, count: number = 5): Problem[] => {
  const problems: Problem[] = [];
  for (let i = 0; i < count; i++) {
    let num1: number, num2: number, answer: number;

    switch (operation) {
      case "addition":
        num1 = Math.floor(Math.random() * 15) + 1;
        num2 = Math.floor(Math.random() * 15) + 1;
        answer = num1 + num2;
        break;
      case "subtraction":
        num1 = Math.floor(Math.random() * 20) + 10;
        num2 = Math.floor(Math.random() * num1);
        answer = num1 - num2;
        break;
      case "multiplication":
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        answer = num1 * num2;
        break;
      case "division":
        num2 = Math.floor(Math.random() * 10) + 1;
        answer = Math.floor(Math.random() * 10) + 1;
        num1 = num2 * answer;
        break;
    }

    problems.push({ id: i, num1, num2, operation, answer });
  }
  return problems;
};

export default function DragDropGame() {
  const [selectedOperation, setSelectedOperation] = useState<Operation | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [problems, setProblems] = useState<Problem[]>([]);
  const [answers, setAnswers] = useState<number[]>([]);
  const [matched, setMatched] = useState<{ [key: number]: number | null }>({});
  const [score, setScore] = useState(0);
  const [draggedAnswer, setDraggedAnswer] = useState<number | null>(null);

  const startGame = (operation: Operation) => {
    const newProblems = generateProblems(operation, 5);
    const newAnswers = newProblems.map(p => p.answer).sort(() => Math.random() - 0.5);
    
    setSelectedOperation(operation);
    setProblems(newProblems);
    setAnswers(newAnswers);
    setMatched({});
    setScore(0);
    setGameStarted(true);
    setGameEnded(false);
  };

  const handleDragStart = (answer: number) => {
    setDraggedAnswer(answer);
  };

  const handleDrop = (problemId: number, correctAnswer: number) => {
    if (draggedAnswer === null) return;

    const isCorrect = draggedAnswer === correctAnswer;
    
    if (isCorrect) {
      setMatched({ ...matched, [problemId]: draggedAnswer });
      setAnswers(answers.filter(a => a !== draggedAnswer));
      setScore(score + 20);

      if (Object.keys(matched).length + 1 === problems.length) {
        setTimeout(() => setGameEnded(true), 1000);
      }
    }

    setDraggedAnswer(null);
  };

  const resetGame = () => {
    setSelectedOperation(null);
    setGameStarted(false);
    setGameEnded(false);
    setProblems([]);
    setAnswers([]);
    setMatched({});
    setScore(0);
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
              Cocokkan Jawaban 🎮
            </h1>
            <p className="text-xl text-muted-foreground">
              Drag jawaban yang benar ke soalnya!
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
                    <div className="text-5xl font-display font-bold text-success mb-4">
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
    const stars = score === 100 ? 3 : score >= 60 ? 2 : score >= 40 ? 1 : 0;

    return (
      <div className="min-h-screen bg-background py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-12 text-center bg-gradient-to-br from-success/10 to-primary/10">
              <Trophy className="h-24 w-24 text-accent mx-auto mb-6 animate-bounce-in" />
              <h2 className="text-4xl font-display font-bold text-foreground mb-4">
                Semua Benar!
              </h2>
              <div className="text-6xl font-display font-bold text-success mb-6">
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
                {stars === 3 && "Sempurna! Kamu jago banget! 🌟"}
                {stars === 2 && "Bagus sekali! 👏"}
                {stars === 1 && "Lumayan! Coba lagi ya! 💪"}
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
      <div className="max-w-5xl mx-auto">
        {/* Game Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Trophy className="h-6 w-6 text-accent" />
            <span className="text-2xl font-display font-bold text-foreground">
              {score} poin
            </span>
          </div>
          <div className="text-muted-foreground">
            {Object.keys(matched).length} / {problems.length} selesai
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Problems Column */}
          <div className="space-y-4">
            <h3 className="text-2xl font-display font-bold text-foreground mb-4">
              Soal
            </h3>
            {problems.map((problem) => (
              <motion.div
                key={problem.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card
                  className={`p-6 transition-all ${
                    matched[problem.id] !== undefined
                      ? "bg-success/20 border-success"
                      : "hover-elevate"
                  }`}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleDrop(problem.id, problem.answer)}
                  data-testid={`dropzone-${problem.id}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-mono font-bold text-foreground">
                      {problem.num1} {operationSymbols[problem.operation]} {problem.num2} =
                    </div>
                    {matched[problem.id] !== undefined ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex items-center gap-2"
                      >
                        <div className="text-3xl font-mono font-bold text-success">
                          {matched[problem.id]}
                        </div>
                        <Check className="h-8 w-8 text-success" />
                      </motion.div>
                    ) : (
                      <div className="w-24 h-16 border-2 border-dashed border-muted-foreground rounded-md flex items-center justify-center">
                        <span className="text-muted-foreground text-2xl">?</span>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Answers Column */}
          <div className="space-y-4">
            <h3 className="text-2xl font-display font-bold text-foreground mb-4">
              Jawaban (Drag ke Soal)
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {answers.map((answer) => (
                <motion.div
                  key={answer}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileDrag={{ scale: 1.1 }}
                  drag
                  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                  onDragStart={() => handleDragStart(answer)}
                  className="cursor-move"
                  data-testid={`answer-${answer}`}
                >
                  <Card className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 hover-elevate active-elevate-2">
                    <div className="text-4xl font-mono font-bold text-center text-foreground">
                      {answer}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Card className="p-4 bg-muted/30 inline-block">
            <p className="text-muted-foreground">
              💡 <strong>Petunjuk:</strong> Klik dan drag angka jawaban ke soal yang sesuai!
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
