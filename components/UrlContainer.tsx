import React, { useCallback, useEffect, useRef } from "react";
import { useUserContext } from "@/app/UserContext";
import UrlCard from "./UrlCard";
import Loader from "./Loader";
import { Reorder } from "framer-motion";
import axios from "axios";

export interface urlType {
  siteName: string;
  siteURL: string;
  description: string;
  id: number;
  sortOrder: number;
}

const UrlContainer = ({
  changeUpdate,
  loading,
  userLinks,
  setUserLinks,
}: {
  changeUpdate: () => void;
  loading: boolean;
  userLinks: urlType[];
  setUserLinks: React.Dispatch<React.SetStateAction<urlType[]>>;
}) => {
  const { user } = useUserContext();
  const reorderRef = useRef<urlType[]>([]); // Store initial order
  const fetchTimer = useRef<ReturnType<typeof setTimeout>>();

  const updateOrderApiCall = useCallback(async () => {
    const { data } = await axios.put(
      `/api/profile/update?id=${user.id}`,
      userLinks
    );
    console.log(data);
  }, [userLinks, user.id]);

  useEffect(() => {
    if (reorderRef.current.length === 0 && userLinks.length > 0) {
      reorderRef.current = [...userLinks]; 
    }
  }, [userLinks]);

  const checkChanges = (oldOrder: urlType[], newOrder: urlType[]) => {
    for (let i = 0; i < oldOrder.length; i++) {
      if (oldOrder[i].id !== newOrder[i].id) {
        return true; 
      }
    }
    return false;
  };

  return (
    <div
      className={`relative mt-6 w-full overflow-x-auto border-2 border-gray-700 shadow-md rounded-lg custom:border-none ${
        user.isLoggedin ? "" : "border-none"
      }`}
    >
      {loading ? (
        <div className="h-28">
          <Loader />
        </div>
      ) : userLinks.length < 1 ? (
        <h2 className="my-6 text-center text-xl">No Links Available.</h2>
      ) : (
        <Reorder.Group
          axis="y"
          onReorder={(newOrder) => {
            clearTimeout(fetchTimer.current);
            
            const updatedOrder = newOrder.map((item, index) => ({
              ...item,
              sortOrder: index + 1,
            }));

            setUserLinks(updatedOrder);

            fetchTimer.current = setTimeout(() => {
              if (checkChanges(reorderRef.current, updatedOrder)) {
                updateOrderApiCall();
                reorderRef.current = updatedOrder;
              } else {
                console.log("No API call, order is the same");
              }
            }, 2000);
          }}
          values={userLinks}
          className="px-6 py-2 custom-2:px-3 custom-2:py-0 custom:!px-0"
        >
          {userLinks.map((item: urlType, index: number) => (
            <UrlCard
              key={item.id}
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
