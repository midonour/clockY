export default function NavBar({onOpenedTap}){
    return(<div className="nav-bar">
        <button onClick={()=>onOpenedTap(1)}>Clock</button>
        <button onClick={()=>onOpenedTap(2)}>Stop watch</button>
        <button onClick={()=>onOpenedTap(3)}>Alarm</button>
    </div>)
}