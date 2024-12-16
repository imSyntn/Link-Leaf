import React, { useCallback, useEffect, useRef } from "react";
import { useUserContext } from "@/app/UserContext";
import UrlCard from "./UrlCard";
import Loader from "./Loader";
import {Reorder} from 'framer-motion'
import axios from "axios";

export interface urlType {
  siteName: string;
  siteURL: string;
  description: string;
  id: number;
}

const UrlContainer = ({
  changeUpdate,
  loading,
  userLinks,
  setUserLinks
}: {
  changeUpdate: () => void;
  loading: boolean;
  userLinks: urlType[];
  setUserLinks: React.Dispatch<React.SetStateAction<urlType[]>>
}) => {
  const { user } = useUserContext();
  const reorderRef = useRef(false)
  // const [activeCard, setActiveCard] = useState<number | null>(null);
  
  // const onDrop = (index:number) => {
  //   if (activeCard == index || !activeCard) return null
  //   const newLinks = [...userLinks]
  //   const [card] = newLinks.splice(activeCard, 1)
  //   newLinks.splice(index, 0, card)
  //   setUserLinks(newLinks)
  // };

  const updateOrder = useCallback(async() => {
    const {data} = await axios.put('/api/profile/update', userLinks )
    console.log(data)
    reorderRef.current = false
  },[userLinks])

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout >;
    console.log(userLinks);

    setTimeout(()=> {
      if(reorderRef.current) {
        updateOrder()
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [userLinks]);

  return (
    <div
      className={`relative mt-6 w-full overflow-x-auto border-2 border-gray-700 shadow-md rounded-lg ${
        user.isLoggedin ? "" : "border-none"
      }`}
    >
      {/* {
        !user.isLoggedin ? (
          <p className='text-2xl  tracking-widest text-center pt-10'>You are being redirected ...</p>
        ) : ( */}
      {loading ? (
        <div className="h-28">
          <Loader />
        </div>
      ) : userLinks.length < 1 ? (
        <h2 className="my-6 text-center text-xl">No Links Available.</h2>
      ) : (
        <Reorder.Group axis="y" onReorder={(newOrder)=> {
          reorderRef.current = true;
          setUserLinks(newOrder)
        }} values={userLinks} className="px-6 py-2">
          {/* <DropArea onDrop={()=> onDrop(0)} /> */}
          {userLinks.map((item: urlType, index: number) => (
              <UrlCard key={item.id}
                index={index}
                urlObj={item}
                changeUpdate={changeUpdate}
              />
          ))}
        </Reorder.Group>
      )}
    </div>
  );
};

export default UrlContainer;
