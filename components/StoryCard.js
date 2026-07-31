import Bunny from "../public/bunny.jpg";
import Shinchan from "../public/shinchan.jpg";
import Image from "next/image";

export function StoryCard() {
    return <>
        <div>
            <Image src={Bunny} alt="" height={400} width={200} className={`rounded-4xl`}/>
            <div className="profilePic"><Image src={Shinchan} alt="" height={100} width={100}
                                               className={`rounded-full scale-50 absolute top-5`}/></div>
        </div>
    </>
}