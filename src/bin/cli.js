const { Command } = require('commander');
const init = require('../lib/init.js');
const pkg = require('../package.json');
const program = new Command();

program
    .command('init')
    .description('initialize a project inside a folder')
    .action(() => {
        init();
    });
program.version(pkg.version);
program.parse(process.argv);
