import UserData from "./userData";

export default function Header() {
    return(
        <div className="bg-red-500">
            <h1 className="font-bold text-white text-2xl">Fruitflow</h1>
            <UserData />
        </div>
    )
}