import { useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";

export default function NumberSliderInput({ value, onChange }: {
    value: number;
    onChange: (value: number) => void;
}) {
    const [number, setNumber] = useState(value || 0);
    const [debouncedNumber, setDebouncedNumber] = useState(number);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedNumber(number);
        }, 200);

        return () => clearTimeout(handler);
    }, [number]);

    // useEffect(() => {
    //     onChange(debouncedNumber);
    // }, [debouncedNumber]);

    return (
        <div className="flex gap-default group items-center">
            <div className="rounded-lg flex items-center justify-center bg-background group-hover:bg-accent h-[35px] w-[35px]">
                <input
                    disabled
                    className={'border-none text-center bg-none bg-inherit outline-none w-full'}
                    value={Number(value || 0)}
                    onChange={e => setNumber(parseInt(e.target.value))}
                />
            </div>
            <Slider
                defaultValue={[number]}
                max={100}
                step={1}
                className="flex-1"
                onValueChange={(value) => setNumber(value[0])}
            />
        </div>
    );
}
