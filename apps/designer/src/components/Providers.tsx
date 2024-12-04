import {TooltipProvider} from "@/components/ui/tooltip.tsx";
import {LeftPanelProvider} from "@/components/builder/context/left-panel.context.tsx";
import {RightPanelProvider} from "@/components/builder/context/right-panel.context.tsx";
import {ThemeProvider} from "@/components/theme-provider.tsx";
import {ReactNode} from 'react'
import {APIProvider} from "@/components/builder/context/api.context.tsx";
import {PreviewProvider} from "@/components/builder/context/preview.context.tsx";

export default function Providers({children}: { children: ReactNode }) {
    return <>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <TooltipProvider>
                <PreviewProvider>
                    <APIProvider>
                        <LeftPanelProvider>
                            <RightPanelProvider>
                                {children}
                            </RightPanelProvider>
                        </LeftPanelProvider>
                    </APIProvider>
                </PreviewProvider>
            </TooltipProvider>
        </ThemeProvider>
    </>
}
