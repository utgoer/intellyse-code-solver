export type SolveRequest = {
    description: string
};

export type SolveResult = {
    results: [{
        success: boolean;
        assertions: string;
        implementation: string;
        choice: number;
        model: GPTModelName;
        seed: number;
        temperature: number;
    }];
    success_found: boolean;
};

export type GPTModelName = 'gpt-35-turbo' | 'gpt-4-turbo';