const { question } = require("./prompt");

function init() {
    const questions = [];

    questions.forEach((question)) => {
        const anwser = ask(question);

        if(answer === true) {
            addPreset(question.elements);
        }
    });

    ask(questions)
    .then((answer) => {

    });
}

module.exports = init;