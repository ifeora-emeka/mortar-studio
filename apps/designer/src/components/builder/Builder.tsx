import {lazy, Suspense} from "react";

const Designer = lazy(() => import("./designer/Designer"));
const Providers = lazy(() => import("@/components/Providers.tsx"));

export default function Builder() {
    return (
        <div className={'min-h-screen max-h-screen overflow-hidden select-none'}>
            <Suspense fallback={
                <div
                    className={'bg-background min-h-screen max-h-screen flex justify-center items-center'}>
                    {/*add spinner here*/}
                    <div
                        className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
                        role="status" aria-label="loading">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            }>
                <Providers>
                    <Designer/>
                </Providers>
            </Suspense>
        </div>
    );
}
