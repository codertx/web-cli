import inquirer from 'inquirer';

type QuestionType = 'input' | 'number' | 'confirm' | 'list' | 'checkbox';

const prompt = inquirer.createPromptModule();

type UnionQuestion = IBooleanQuestion | ISelectQuestion | IInputQuestion;

interface IBaseQuestion {
    type: QuestionType;
    name: string;
    message: string;
}

interface IBooleanQuestion extends IBaseQuestion {
    type: 'confirm';
    subquestion?: [UnionQuestion?, UnionQuestion?]
}

interface ISelectQuestion extends IBaseQuestion {
    type: 'list' | 'checkbox';
    choices: { name: string; value: any }[]
}

interface IInputQuestion extends IBaseQuestion {
    type: 'input' | 'number' | 'confirm';
}

export const SUB_QUESTION = Symbol('subquestion');

export async function question(questions: (IBooleanQuestion|ISelectQuestion|IInputQuestion)[]) {
    const results = {};

    for(let q of questions) {
        const { name } = q;
        const answer = await prompt(q)[name];

        if(q.type !== 'confirm') {
            results[name] = answer[name];
            continue;
        }

        results[name] = {
            answer
        };

        if(hasSubQuestion(q, answer)) {
            results[name][SUB_QUESTION] = await recursiveSubQuestion((q as IBooleanQuestion).subquestion, answer);
        }
    }
}

async function hasSubQuestion(question: UnionQuestion, answer: boolean) {
    return question.type === 'confirm' && (question as IBooleanQuestion).subquestion
        && ((answer && (question as IBooleanQuestion).subquestion[0])
            || (!answer && (question as IBooleanQuestion).subquestion[1]));
}

async function recursiveSubQuestion(subquestions: [UnionQuestion? , UnionQuestion?], answer: boolean) {
    const [ trueQuestion, falseQuestion ] = subquestions;
    const result = {};
    let subQuestionAnswer;

    if(trueQuestion && answer) {
        subQuestionAnswer = await prompt(trueQuestion)[trueQuestion.name];

        result[trueQuestion.name] = subQuestionAnswer;
        if(hasSubQuestion(trueQuestion, subQuestionAnswer)) {
            result[SUB_QUESTION] = await recursiveSubQuestion((falseQuestion as IBooleanQuestion).subquestion, subQuestionAnswer);
        }
    }

    if(falseQuestion && !answer) {
        subQuestionAnswer = await prompt(falseQuestion)[falseQuestion.name];

        result[falseQuestion.name] = answer;
        if(hasSubQuestion(falseQuestion, subQuestionAnswer)) {
            result[SUB_QUESTION] = await recursiveSubQuestion((falseQuestion as IBooleanQuestion).subquestion, subQuestionAnswer);
        }
    }

    return result;
}
