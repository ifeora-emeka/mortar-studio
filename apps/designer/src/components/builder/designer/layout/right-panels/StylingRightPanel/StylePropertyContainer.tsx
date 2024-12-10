import {Ellipsis, SquareArrowOutUpRight} from "lucide-react";

type Props = {
    label: string;
    children: React.ReactNode;
}

export default function StylePropertyContainer({label, children}: Props) {
    return <>
        <div className={'flex w-full flex-col gap-sm group'}>
            <div className={'flex items-center'}>
                <div className={'flex-1'}>
                    <label className={'text-xs'}>{label}</label>
                </div>
                <div className={'flex items-center gap-sm opacity-0 group-hover:opacity-100'}>
                    <button className={'text-muted-foreground hover:text-foreground'}>
                        <SquareArrowOutUpRight className={'w-4 h-4'} />
                    </button>
                    <button className={'text-muted-foreground hover:text-foreground'}>
                        <Ellipsis className={'w-4 h-4'} />
                    </button>
                </div>
            </div>
            <div>
                {children}
            </div>
        </div>
    </>
}
