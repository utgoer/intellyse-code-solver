import { SolveResult } from '@/lib/types'
import { mapModelName } from '@/lib/utilities';

const ResultText = ({ returnedResult }: { returnedResult: SolveResult | null }) => {
    return (
        <>
            {returnedResult?.results.map((result, index) =>
                <div key={result.model + index}>
                    <h3 className="text-2xl font-bold dark:text-white mb-1">Using: {mapModelName(result.model)}</h3>
                    <h4 className="text-xl font-bold dark:text-white mb-1">Generated Assertions</h4>
                    <pre className="p-2 mb-2 overflow-x-auto bg-systemGray-6">
                        {result.assertions}
                    </pre>
                    <h4 className="text-xl font-bold dark:text-white mb-1">Generated Implementation</h4>
                    <pre className="p-2 overflow-x-auto bg-systemGray-6">
                        {result.implementation}
                    </pre>
                </div>

            )}
        </>
    );
};

export default ResultText;
