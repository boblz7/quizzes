export interface QuizItem {
  id: string;
  question: string;
  answer: string;
}

export interface Quiz {
  id: string;
  name: string;
  data: QuizItem[];
}

export interface GetAll<K> {
  data: K;
  meta: {
    pagination: {
      limit: number;
      start: number;
      total: number;
    };
  };
}

export interface GetQuiz<K> {
  data: K;
  meta: {
    pagination: {
      limit: number;
      start: number;
      total: number;
    };
  };
}

export interface AddQuiz {
  data: QuizItem[];
}

export interface DeleteQuiz {
  id: string;
}

export interface UpdateQuiz {
  id: string;
  data: QuizItem[];
}
