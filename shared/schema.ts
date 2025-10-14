import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User Progress tracking
export const userProgress = pgTable("user_progress", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  studentName: text("student_name").notNull(),
  totalPoints: integer("total_points").notNull().default(0),
  level: integer("level").notNull().default(1),
  lastPlayed: timestamp("last_played").defaultNow(),
});

// Game Scores
export const gameScores = pgTable("game_scores", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  studentName: text("student_name").notNull(),
  gameType: text("game_type").notNull(), // 'quiz', 'guess', 'dragdrop'
  operation: text("operation").notNull(), // 'addition', 'subtraction', 'multiplication', 'division'
  score: integer("score").notNull(),
  timeSpent: integer("time_spent").notNull(), // in seconds
  createdAt: timestamp("created_at").defaultNow(),
});

// Achievements/Badges
export const achievements = pgTable("achievements", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  studentName: text("student_name").notNull(),
  badgeType: text("badge_type").notNull(), // 'first_win', 'speed_master', 'math_star', 'perfect_score'
  operation: text("operation"), // optional, for operation-specific badges
  earnedAt: timestamp("earned_at").defaultNow(),
});

// Learning Progress per topic
export const learningProgress = pgTable("learning_progress", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  studentName: text("student_name").notNull(),
  operation: text("operation").notNull(),
  completed: integer("completed").notNull().default(0), // 0 = not started, 1 = in progress, 2 = completed
  starsEarned: integer("stars_earned").notNull().default(0), // 0-3 stars
});

// Insert Schemas
export const insertUserProgressSchema = createInsertSchema(userProgress).omit({
  id: true,
  lastPlayed: true,
});

export const insertGameScoreSchema = createInsertSchema(gameScores).omit({
  id: true,
  createdAt: true,
});

export const insertAchievementSchema = createInsertSchema(achievements).omit({
  id: true,
  earnedAt: true,
});

export const insertLearningProgressSchema = createInsertSchema(learningProgress).omit({
  id: true,
});

// Types
export type UserProgress = typeof userProgress.$inferSelect;
export type InsertUserProgress = z.infer<typeof insertUserProgressSchema>;

export type GameScore = typeof gameScores.$inferSelect;
export type InsertGameScore = z.infer<typeof insertGameScoreSchema>;

export type Achievement = typeof achievements.$inferSelect;
export type InsertAchievement = z.infer<typeof insertAchievementSchema>;

export type LearningProgress = typeof learningProgress.$inferSelect;
export type InsertLearningProgress = z.infer<typeof insertLearningProgressSchema>;

// Remove old user schema as it's not needed for this app
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
