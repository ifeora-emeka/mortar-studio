import Designer from "./designer/Designer";
import Providers from "@/components/Providers.tsx";

export default function Builder() {
    return <>
        <div className={'min-h-screen max-h-screen overflow-hidden select-none'}>
            <Providers>
                <Designer />
            </Providers>
        </div>
    </>
}
