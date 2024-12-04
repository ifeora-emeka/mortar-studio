import { useLeftPanelContext } from "@/components/builder/context/left-panel.context";
import LeftPanelContainer from "./LeftPanelContainer";

export default function ComponentsLeftPanel() {
  const { state: { activePanel } } = useLeftPanelContext();
  return (
    <LeftPanelContainer show={activePanel === 'components'}>
      <div className="flex flex-col">
        <EachComponent preview="https://cdn.dribbble.com/userupload/7602767/file/original-752423514261ceded547cf92feece123.png?resize=1600x1200&vertical=center" />
        <EachComponent preview="https://cdn.dribbble.com/userupload/7957397/file/original-6199ec552c973020de15eeeafd5ccae5.png?resize=1024x768&vertical=center" />
        <EachComponent preview="https://cdn.dribbble.com/userupload/17079265/file/original-d0de2043e589094386d22faf033f2bda.png?resize=1024x768&vertical=center" />
        <EachComponent preview="https://cdn.dribbble.com/userupload/7602767/file/original-752423514261ceded547cf92feece123.png?resize=1600x1200&vertical=center" />
      </div>
    </LeftPanelContainer>
  )
}

const EachComponent = ({ preview }: { preview: string }) => {
  return <div className="p-default border-b hover:bg-card cursor-pointer transition-colors duration-300 relative group">
    <div className='absolute top-0 left-0 bottom-0 right-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-all duration-300 flex justify-center items-center'>
      <button className="py-sm px-default bg-primary text-primary-foreground rounded-md shadow-md absolute opacity-0 group-hover:opacity-100 transition-all duration-300 hover:shadow-lg">Add To Selected</button>
    </div>
    <img src={preview} alt='preview' className="rounded-md" />
  </div>
}
