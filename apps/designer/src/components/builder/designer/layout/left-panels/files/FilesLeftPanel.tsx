import {useState, useMemo} from "react";
import LeftPanelContainer
    from "@/components/builder/designer/layout/left-panels/LeftPanelContainer.tsx";
import {useLeftPanelContext} from "@/components/builder/context/left-panel.context.tsx";
import {Button} from "@/components/ui/button.tsx";
import {FileIcon, LayoutGrid, LayoutList, Trash} from 'lucide-react';
import {usePreviewContext} from "@/components/builder/context/preview.context.tsx";
import {MortarFile} from "@repo/common/schema/files";
import {LOCAL_API_URL} from "@/components/builder/config/api.config.ts";
import {cn} from "@/lib/utils.ts";
import {toast} from "@/hooks/use-toast.ts";
import axios from "axios";

export default function FilesLeftPanel() {
    const {state: {activePanel}} = useLeftPanelContext();
    const {state: {files}} = usePreviewContext();
    const [keyword, setKeyword] = useState('');
    const [isGridLayout, setIsGridLayout] = useState(false);

    const filteredFiles = useMemo(() => {
        return files.filter(file =>
            file.name.toLowerCase().includes(keyword.toLowerCase())
        );
    }, [files, keyword]);

    const toggleLayout = () => {
        setIsGridLayout(prev => !prev);
    };

    return (
        <LeftPanelContainer
            show={activePanel === 'files'}
            onSearch={setKeyword}
            headerChildren={
                <Button
                    size={'icon'}
                    variant={'outline'}
                    aria-label={'change files layout'}
                    onClick={toggleLayout}
                >
                    {isGridLayout ? <LayoutList/> : <LayoutGrid/>}
                </Button>
            }
            onAdd={() => {
                // Add file functionality here
            }}
        >
            <div
                className={`flex flex-col pb-20 ${isGridLayout ? 'grid grid-cols-2' : ''}`}>
                {filteredFiles.map((file, i) => (
                    <EachFile
                        file={file}
                        key={`each-file-${i}`}
                        isGridLayout={isGridLayout}
                    />
                ))}
            </div>
        </LeftPanelContainer>
    );
}

const EachFile = ({file, isGridLayout}: { file: MortarFile; isGridLayout: boolean }) => {
    const formatFileSize = (size: number) => {
        if (size < 1024) return `${size} B`;
        if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
        return `${(size / (1024 * 1024)).toFixed(1)} MB`;
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`${LOCAL_API_URL}/files/${file.name.trim()}${file.extension}`)
        } catch (e) {
            console.log(e)
            toast({
                title: "Delete error",
                description: "Please try again",
                variant: 'destructive'
            })
        }
    }

    return (
        <div
            className={cn(`p-sm flex gap-sm border-b hover:bg-accent/50 transition-all duration-300 relative group`, {
                "flex-col items-center": isGridLayout
            })}
        >
           <button
               onClick={handleDelete}
               className={'absolute top-default right-default text-xs bg-accent p-sm shadow-md rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300'}
           >
               <Trash className={'h-4 w-4'} />
           </button>
            <div
                className={cn(` border rounded-md flex items-center justify-center bg-background overflow-hidden`, {
                    "w-full h-[100px]": isGridLayout,
                    "w-[100px] max-h-[100px]": !isGridLayout,
                })}
            >
                {file.thumbnail ? (
                    <img
                        src={`${LOCAL_API_URL}${file.thumbnail}`}
                        alt={file.name}
                        className={cn("object-cover w-full h-full")}
                    />
                ) : (
                    <FileIcon className={'h-7 w-7 text-muted-foreground'}/>
                )}
            </div>
            <div className={`flex flex-col ${isGridLayout ? 'w-full text-center' : ''}`}>
                <h6 className="truncate w-full max-w-[200px]" title={file.name}>
                    {file.name}
                </h6>
                <small className="text-muted-foreground">
                    {formatFileSize(file.size)}
                </small>
                <small className="text-muted-foreground uppercase">
                    {file.extension?.replace('.', '')}
                </small>
            </div>
        </div>
    );
};

