export default function StylePropertyGrid({children}: { children: React.ReactNode }) {
    return <>
        <div className={'grid grid-cols-2 gap-default'}>
            {children}
        </div>
    </>
}
