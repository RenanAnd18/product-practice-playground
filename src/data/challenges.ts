export interface Decision {
  id: string;
  text: string;
  impact: {
    stakeholders: number;
    delivery: number;
    value: number;
    technical: number;
  };
  feedback: string;
  isOptimal: boolean;
}

export interface Challenge {
  id: string;
  title: string;
  category: string;
  difficulty: "junior" | "pleno" | "senior";
  context: string;
  scenario: string;
  stakeholderMessage: string;
  stakeholderName: string;
  stakeholderRole: string;
  decisions: Decision[];
  learningPoints: string[];
}

import { juniorChallenges } from "./challenges-junior";
import { plenoChallenges } from "./challenges-pleno";
import { seniorChallenges } from "./challenges-senior";

export const challenges: Challenge[] = [
  ...juniorChallenges,
  ...plenoChallenges,
  ...seniorChallenges,
];

export const challengesByDifficulty = {
  junior: juniorChallenges,
  pleno: plenoChallenges,
  senior: seniorChallenges,
};
