import PropertySection
    from "@/components/builder/designer/layout/right-panels/PropertySection.tsx";
import {LOCAL_API_URL} from "@/components/builder/config/api.config.ts";
import {usePreviewContext} from "@/components/builder/context/preview.context.tsx";
import DropdownSearch from "@/components/builder/designer/components/DropdownSearch.tsx";
import {DropdownMenuItem} from "@/components/ui/dropdown-menu.tsx";

export default function TextContentProperty() {
    const {state: {files}} = usePreviewContext();
    return <>
        <PropertySection
            label="Select source"
        >
            <DropdownSearch
                className={'min-w-[310px] max-w-[310px]'}
                content={
                <>
                   <div className={'grid grid-cols-3'}>
                       {
                           files.map((file, index) => {
                               return <DropdownMenuItem key={`--file-${index}`} className={'truncate'}>
                                   <img
                                       src={`${LOCAL_API_URL}${file.thumbnail}`}
                                       alt={file.name}
                                   />
                                   {file.name}
                               </DropdownMenuItem>
                           })
                       }
                   </div>
                </>
                }
            >
                <div
                    role={'button'}
                    className={'text-start w-full border border-input flex hover:bg-background rounded-xl gap-sm p-sm'}
                >
                    <div
                        className={'border rounded-lg min-h-11 min-w-11 max-w-11 max-h-11 overflow-hidden'}
                    >
                        <img
                            src={`${LOCAL_API_URL}/files/download/1737324771202-image (3).png`}
                            alt={`preview`}
                            className={'h-full w-full object-cover'}
                        />
                    </div>

                    <div className={'flex flex-col'}>
                        <h5>The name of the file</h5>
                        <p className={'text-muted-foreground'}>{`/public`}</p>
                    </div>
                </div>
            </DropdownSearch>
        </PropertySection>
    </>
}
