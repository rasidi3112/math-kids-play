import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Trophy, Star, Award, Zap, Target, Crown, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Progress as ProgressBar } from "@/components/ui/progress";
import { useStudent } from "@/hooks/use-student";
import { useUserProgress } from "@/hooks/use-progress-api";
import { useGameScores } from "@/hooks/use-score-api";
import { useAchievements } from "@/hooks/use-achievement-api";
import { useLearningProgress } from "@/hooks/use-learning-api";

const badgeDefinitions = [
  {
    id: "first_win",
    name: "Kemenangan Pertama",
    icon: Trophy,
    description: "Selesaikan game pertama kamu",
    color: "text-accent",
  },
  {
    id: "speed_master",
    name: "Master Kecepatan",
    icon: Zap,
    description: "Jawab 5 soal dalam 30 detik",
    color: "text-warning",
  },
  {
    id: "perfect_score",
    name: "Skor Sempurna",
    icon: Star,
    description: "Dapatkan skor 100 di quiz",
    color: "text-chart-4",
  },
  {
    id: "math_star",
    name: "Bintang Matematika",
    icon: Crown,
    description: "Selesaikan semua materi",
    color: "text-chart-2",
  },
  {
    id: "practice_master",
    name: "Master Latihan",
    icon: Target,
    description: "Jawab 50 soal dengan benar",
    color: "text-chart-3",
  },
  {
    id: "champion",
    name: "Juara",
    icon: Award,
    description: "Raih 500 total poin",
    color: "text-chart-1",
  },
];

const operationNames: { [key: string]: string } = {
  addition: "Penjumlahan",
  subtraction: "Pengurangan",
  multiplication: "Perkalian",
  division: "Pembagian",
};

export default function Progress() {
  const { studentName } = useStudent();
  const { data: progress, isLoading: progressLoading } = useUserProgress(studentName);
  const { data: scores = [], isLoading: scoresLoading } = useGameScores(studentName);
  const { data: achievements = [], isLoading: achievementsLoading } = useAchievements(studentName);
  const { data: learning = [], isLoading: learningLoading } = useLearningProgress(studentName);

  const stats = {
    totalPoints: progress?.totalPoints || 0,
    gamesPlayed: scores.length,
    correctAnswers: scores.filter(s => s.score > 0).length,
    currentLevel: progress?.level || 1,
  };

  const earnedAchievementIds = new Set(achievements.map(a => a.badgeType));
  const badges = badgeDefinitions.map(b => ({
    ...b,
    earned: earnedAchievementIds.has(b.id),
  }));
  const earnedBadges = badges.filter(b => b.earned).length;

  const learningProgressData = ["addition", "subtraction", "multiplication", "division"].map(op => {
    const progress = learning.find(l => l.operation === op);
    const completed = progress?.completed || 0;
    const stars = progress?.starsEarned || 0;
    return {
      operation: operationNames[op],
      progress: completed === 2 ? 100 : completed === 1 ? 50 : 0,
      stars,
      color: op === "addition" ? "chart-1" : op === "subtraction" ? "chart-2" : op === "multiplication" ? "chart-3" : "chart-4",
    };
  });

  const isLoading = progressLoading || scoresLoading || achievementsLoading || learningLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center" data-testid="loading-progress">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">Memuat progress...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <Link href="/">
            <Button
              variant="outline"
              size="sm"
              className="mb-4 rounded-full hover-elevate active-elevate-2"
              data-testid="button-back-home"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali
            </Button>
          </Link>
          <div className="text-center">
            <h1 className="text-5xl font-display font-bold text-foreground mb-2" data-testid="text-progress-title">
              Progressmu
            </h1>
            <p className="text-xl text-muted-foreground" data-testid="text-student-name">
              {studentName}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6 text-center bg-gradient-to-br from-chart-1/20 to-chart-1/10 hover-elevate" data-testid="card-total-points">
                <Trophy className="h-10 w-10 text-chart-1 mx-auto mb-2" data-testid="icon-trophy" />
                <div className="text-3xl font-display font-bold text-foreground mb-1" data-testid="text-total-points">
                  {stats.totalPoints}
                </div>
                <p className="text-sm text-muted-foreground" data-testid="label-total-points">Total Poin</p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Card className="p-6 text-center bg-gradient-to-br from-chart-2/20 to-chart-2/10 hover-elevate" data-testid="card-games-played">
                <Star className="h-10 w-10 text-chart-2 mx-auto mb-2" data-testid="icon-star" />
                <div className="text-3xl font-display font-bold text-foreground mb-1" data-testid="text-games-played">
                  {stats.gamesPlayed}
                </div>
                <p className="text-sm text-muted-foreground" data-testid="label-games-played">Game Dimainkan</p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Card className="p-6 text-center bg-gradient-to-br from-chart-3/20 to-chart-3/10 hover-elevate" data-testid="card-correct-answers">
                <Target className="h-10 w-10 text-chart-3 mx-auto mb-2" data-testid="icon-target" />
                <div className="text-3xl font-display font-bold text-foreground mb-1" data-testid="text-correct-answers">
                  {stats.correctAnswers}
                </div>
                <p className="text-sm text-muted-foreground" data-testid="label-correct-answers">Jawaban Benar</p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <Card className="p-6 text-center bg-gradient-to-br from-accent/20 to-accent/10 hover-elevate" data-testid="card-level">
                <Crown className="h-10 w-10 text-accent mx-auto mb-2" data-testid="icon-crown" />
                <div className="text-3xl font-display font-bold text-foreground mb-1" data-testid="text-level">
                  Level {stats.currentLevel}
                </div>
                <p className="text-sm text-muted-foreground" data-testid="label-level">Level Saat Ini</p>
              </Card>
            </motion.div>
          </div>

          {/* Learning Progress */}
          <div className="mb-12">
            <h2 className="text-3xl font-display font-bold text-foreground mb-6" data-testid="text-learning-progress-title">
              Progress Belajar
            </h2>
            <div className="grid gap-4">
              {learningProgressData.map((item, index) => (
                <motion.div
                  key={item.operation}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="p-6 hover-elevate" data-testid={`progress-${item.operation.toLowerCase()}`}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-display font-semibold text-foreground" data-testid={`text-operation-${item.operation.toLowerCase()}`}>
                        {item.operation}
                      </h3>
                      <div className="flex gap-1" data-testid={`stars-${item.operation.toLowerCase()}`}>
                        {[...Array(3)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-6 w-6 ${
                              i < item.stars
                                ? "text-accent fill-accent"
                                : "text-muted"
                            }`}
                            data-testid={`star-${i}-${item.operation.toLowerCase()}`}
                          />
                        ))}
                      </div>
                    </div>
                    <ProgressBar value={item.progress} className="h-3" data-testid={`progressbar-${item.operation.toLowerCase()}`} />
                    <p className="text-sm text-muted-foreground mt-2" data-testid={`text-progress-${item.operation.toLowerCase()}`}>
                      {item.progress}% selesai
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Badges */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-display font-bold text-foreground" data-testid="text-badges-title">
                Badge Koleksi
              </h2>
              <div className="text-muted-foreground" data-testid="text-badges-count">
                {earnedBadges} / {badges.length} terkumpul
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {badges.map((badge, index) => {
                const Icon = badge.icon;
                return (
                  <motion.div
                    key={badge.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Card
                      className={`p-6 text-center transition-all ${
                        badge.earned
                          ? "hover-elevate active-elevate-2"
                          : "opacity-50 grayscale"
                      }`}
                      data-testid={`badge-${badge.id}`}
                    >
                      <Icon className={`h-12 w-12 mx-auto mb-2 ${badge.color}`} data-testid={`icon-${badge.id}`} />
                      <h4 className="font-display font-semibold text-sm text-foreground mb-1" data-testid={`text-badge-name-${badge.id}`}>
                        {badge.name}
                      </h4>
                      <p className="text-xs text-muted-foreground" data-testid={`text-badge-desc-${badge.id}`}>
                        {badge.description}
                      </p>
                      {badge.earned && (
                        <div className="mt-2">
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-success/20 text-success rounded-full text-xs font-medium" data-testid={`badge-earned-${badge.id}`}>
                            ✓ Diraih
                          </span>
                        </div>
                      )}
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Motivation Section */}
      <section className="py-12 px-4 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-display font-bold text-foreground mb-4" data-testid="text-motivation-title">
              Tetap Semangat Belajar! 🚀
            </h2>
            <p className="text-xl text-muted-foreground mb-8" data-testid="text-motivation-message">
              Kamu sudah sangat hebat! Terus berlatih untuk menjadi master matematika!
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/game/quiz">
                <Button size="lg" className="rounded-full hover-elevate active-elevate-2" data-testid="button-play-quiz">
                  Main Quiz Lagi
                </Button>
              </Link>
              <Link href="/">
                <Button size="lg" variant="outline" className="rounded-full hover-elevate active-elevate-2" data-testid="button-home">
                  Kembali ke Beranda
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
