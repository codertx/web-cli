export const babel: IPresetConfig = {
    name: 'babel',
    display: 'Babel',
    env: 'both',
    async onSelect(inquirer: IInquirer, preset: IPresetSetup) {
        preset.addDep('@bable/core', '@babel/preset-env');
        preset.addLoader({
            name: 'babel-loader',
            dep: 'babel-loader',
            match: ['js'],
            resolve: ['.js', '.jsx']
        });
        preset.addFile({
            content: '',
            name: '.babelrc.json'
        });
    }
}
