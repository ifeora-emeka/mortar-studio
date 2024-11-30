import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Sparkles } from "lucide-react";

export default function DesignerPreview() {
    return (
        <>
            <ScrollArea className="flex-1 overflow-y-auto z-0 relative">
                <img
                    src="https://cdn.dribbble.com/userupload/12234635/file/original-f37695467515b79df69695c41db0882e.jpg?resize=1024x3458&vertical=center"
                    // src="https://cdn.dribbble.com/userupload/10471941/file/original-6c1a92a6bc926dda282098f4be80dc7a.jpg?resize=1024x4226&vertical=center" 
                    // src="https://cdn.dribbble.com/userupload/16139771/file/original-2b8a7f77c58ec642087fb45c042f2dc2.png?resize=1024x3712&vertical=center" 
                    alt="preview" className="w-full" />
                <div className="bg-card border shadow-xl rounded-xl p-sm fixed  left-1/2 transform -translate-x-1/2 bottom-default z-[5000] flex gap-sm items-center">
                    <Button size={'icon'} variant={'outline'}>
                        <Sparkles />
                    </Button>
                    <Button size={'icon'} variant={'outline'}>
                        <MessageCircle />
                    </Button>
                </div>
                <div className="h-96" />
            </ScrollArea>
        </>
    )
}
