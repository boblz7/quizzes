export interface Question {
  id: string;
  question: string;
  answer: string;
}

export interface Quiz {
  id: string;
  name: string;
  questions: Question[];
}
