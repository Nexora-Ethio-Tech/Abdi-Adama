
export interface Option {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  text: string;
  options: Option[];
}

export interface Exam {
  id: string;
  title: string;
  durationMinutes: number;
  questions: Question[];
}

export interface AnswerPayload {
  examId: string;
  studentId: string;
  answers: Record<string, string>;
  warningCount: number;
  startedAt: string;
  submittedAt: string;
  autoSubmitted: boolean;
}

export interface ViolationEvent {
  type: 'fullscreen-exit' | 'visibility-change' | 'blur';
  timestamp: string;
}

export const mockExam: Exam = {
  id: 'math-101',
  title: 'Mathematics Mid-term Exam',
  durationMinutes: 60,
  questions: [
    {
      id: 'q1',
      text: 'What is the square root of 144?',
      options: [
        { id: 'a', text: '10' },
        { id: 'b', text: '12' },
        { id: 'c', text: '14' },
        { id: 'd', text: '16' },
      ],
    },
    {
      id: 'q2',
      text: 'Solve for x: 2x + 5 = 15',
      options: [
        { id: 'a', text: 'x = 5' },
        { id: 'b', text: 'x = 10' },
        { id: 'c', text: 'x = 2' },
        { id: 'd', text: 'x = 7.5' },
      ],
    },
    {
      id: 'q3',
      text: 'Which of these is a prime number?',
      options: [
        { id: 'a', text: '9' },
        { id: 'b', text: '15' },
        { id: 'c', text: '17' },
        { id: 'd', text: '21' },
      ],
    },
    {
      id: 'q4',
      text: 'What is the value of Pi (to two decimal places)?',
      options: [
        { id: 'a', text: '3.12' },
        { id: 'b', text: '3.14' },
        { id: 'c', text: '3.16' },
        { id: 'd', text: '3.18' },
      ],
    },
    {
      id: 'q5',
      text: 'A triangle with all sides of equal length is called:',
      options: [
        { id: 'a', text: 'Isosceles' },
        { id: 'b', text: 'Scalene' },
        { id: 'c', text: 'Equilateral' },
        { id: 'd', text: 'Right-angled' },
      ],
    },
  ],
};
