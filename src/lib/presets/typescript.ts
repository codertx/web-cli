export const typescript: IPresetConfig = {
    name: 'typescript',
    display: 'TypeScript',
    env: 'both',
    async onSelect(inquirer: IInquirer, preset: IPresetSetup) {
        preset.addDep('typescript');
        preset.addFile({
            content: '',
            name: 'tsconfig.json',
        });

        await inquirer
            .add({
                name: 'withBabel',
                description: 'Use typescript alongwith babel (suggested)?',
                type: 'confirm'
            })
            .onComplete((answers: {[name: string]: unknown}) => {
                if(answers['withBabel']) {
                    preset.addLoader({
                        name: 'babel-loader',
                        dep: 'babel-loader',
                        target: 'js',
                        match: ['ts']
                    })
                }
                else {
                    preset.addLoader({
                        name: 'ts-loader',
                        dep: 'ts-loader',
                        target: 'js',
                        match: ['ts']
                    });
                }
            });
    }
};
