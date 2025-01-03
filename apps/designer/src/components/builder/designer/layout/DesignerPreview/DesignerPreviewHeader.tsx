import {usePreviewContext} from "@/components/builder/context/preview.context.tsx";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function DesignerPreviewHeader(){
    const { state: {activePage, activeComponents} } = usePreviewContext();

    if(!activePage) return null;

    return <>
        <header
            className={'min-h-[--header-height-sm] bg-card border rounded-tl-lg rounded-tr-lg flex items-center justify-between px-default'}>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">
                            {activePage.title}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>
                            {activeComponents[0]?.name}
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

        </header>
    </>
}
