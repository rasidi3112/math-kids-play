import {
  type UserProgress,
  type InsertUserProgress,
  type GameScore,
  type InsertGameScore,
  type Achievement,
  type InsertAchievement,
  type LearningProgress,
  type InsertLearningProgress,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User Progress
  getUserProgress(studentName: string): Promise<UserProgress | undefined>;
  createOrUpdateUserProgress(progress: InsertUserProgress): Promise<UserProgress>;
  
  // Game Scores
  getGameScores(studentName: string): Promise<GameScore[]>;
  getGameScoresByType(studentName: string, gameType: string): Promise<GameScore[]>;
  addGameScore(score: InsertGameScore): Promise<GameScore>;
  
  // Achievements
  getAchievements(studentName: string): Promise<Achievement[]>;
  addAchievement(achievement: InsertAchievement): Promise<Achievement>;
  
  // Learning Progress
  getLearningProgress(studentName: string): Promise<LearningProgress[]>;
  getLearningProgressByOperation(studentName: string, operation: string): Promise<LearningProgress | undefined>;
  updateLearningProgress(progress: InsertLearningProgress): Promise<LearningProgress>;
}

export class MemStorage implements IStorage {
  private userProgress: Map<string, UserProgress>;
  private gameScores: GameScore[];
  private achievements: Achievement[];
  private learningProgress: Map<string, LearningProgress>;

  constructor() {
    this.userProgress = new Map();
    this.gameScores = [];
    this.achievements = [];
    this.learningProgress = new Map();
  }

  // User Progress
  async getUserProgress(studentName: string): Promise<UserProgress | undefined> {
    return this.userProgress.get(studentName);
  }

  async createOrUpdateUserProgress(insertProgress: InsertUserProgress): Promise<UserProgress> {
    const existing = this.userProgress.get(insertProgress.studentName);
    
    if (existing) {
      const updated: UserProgress = {
        ...existing,
        totalPoints: insertProgress.totalPoints,
        level: insertProgress.level,
        lastPlayed: new Date(),
      };
      this.userProgress.set(insertProgress.studentName, updated);
      return updated;
    }

    const id = randomUUID();
    const newProgress: UserProgress = {
      id,
      ...insertProgress,
      lastPlayed: new Date(),
    };
    this.userProgress.set(insertProgress.studentName, newProgress);
    return newProgress;
  }

  // Game Scores
  async getGameScores(studentName: string): Promise<GameScore[]> {
    return this.gameScores.filter(score => score.studentName === studentName);
  }

  async getGameScoresByType(studentName: string, gameType: string): Promise<GameScore[]> {
    return this.gameScores.filter(
      score => score.studentName === studentName && score.gameType === gameType
    );
  }

  async addGameScore(insertScore: InsertGameScore): Promise<GameScore> {
    const id = randomUUID();
    const score: GameScore = {
      id,
      ...insertScore,
      createdAt: new Date(),
    };
    this.gameScores.push(score);
    return score;
  }

  // Achievements
  async getAchievements(studentName: string): Promise<Achievement[]> {
    return this.achievements.filter(ach => ach.studentName === studentName);
  }

  async addAchievement(insertAchievement: InsertAchievement): Promise<Achievement> {
    const id = randomUUID();
    const achievement: Achievement = {
      id,
      ...insertAchievement,
      earnedAt: new Date(),
    };
    this.achievements.push(achievement);
    return achievement;
  }

  // Learning Progress
  async getLearningProgress(studentName: string): Promise<LearningProgress[]> {
    return Array.from(this.learningProgress.values()).filter(
      progress => progress.studentName === studentName
    );
  }

  async getLearningProgressByOperation(
    studentName: string,
    operation: string
  ): Promise<LearningProgress | undefined> {
    const key = `${studentName}_${operation}`;
    return this.learningProgress.get(key);
  }

  async updateLearningProgress(insertProgress: InsertLearningProgress): Promise<LearningProgress> {
    const key = `${insertProgress.studentName}_${insertProgress.operation}`;
    const existing = this.learningProgress.get(key);

    if (existing) {
      const updated: LearningProgress = {
        ...existing,
        completed: insertProgress.completed,
        starsEarned: insertProgress.starsEarned,
      };
      this.learningProgress.set(key, updated);
      return updated;
    }

    const id = randomUUID();
    const newProgress: LearningProgress = {
      id,
      ...insertProgress,
    };
    this.learningProgress.set(key, newProgress);
    return newProgress;
  }
}

export const storage = new MemStorage();
