interface IPresetConfig {
    name: string;
    display: string;
    env: 'browser' | 'node' | 'both',
    onSelect: (inquirer: IInquirer, preset: IPresetSetup) => Promise<any>
}

interface IPresetSetup {
    addLoader(loader: ILoader);
    addPlugin(plugin: IPlugin);
    addDep(...deps: string[]);
    addFile(file: IFile);
}

interface IFile {
    content: string;
    name: string;
    dir?: string;
}

interface ILoader {
    dep: string;
    name?: string;
    target: 'js' | 'css' | 'file'
    match: string[];
    config?: () => unknown;
}

interface IPlugin {
    dep: string;
    importName?: string;
    namedModule?: string;
    constructOptions: () => unknown
}

interface IQuestion {
    name: string;
    description: string;
    type: 'list' | 'confirm' | 'checkbox';
    choice?: { name: string; value: string }[];
}

interface IInquirer {
    add: (question: IQuestion) => this;
    onComplete: (callback: (answers: {[name: string]: unknown}) => void) => Promise<void>;
}
