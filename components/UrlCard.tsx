import React from "react";
import { urlType } from "./UrlContainer";
import { AddLink } from "./AddLink";
import { IconGripVertical } from "@tabler/icons-react";
import {Reorder} from 'framer-motion'
// import { IconTrash } from '@tabler/icons-react';

const UrlCard = ({
  urlObj,
  changeUpdate,
}: {
  urlObj: urlType;
  changeUpdate: () => void;
  index: number;
}) => {

  return (
    <Reorder.Item value={urlObj} id={String(urlObj.id)}
      // draggable
      // drag="y"
      // onDragStart={() => setActiveCard(index)}
      // onDragEnd={()=> setActiveCard(null)}
      className="px-6 border rounded-lg dark:border-gray-700  hover:backdrop-blur-[2px] cursor-grab flex items-center gap-5 my-3"
    >
      <IconGripVertical stroke={2} />
      <div className="w-full">
        <p className="pt-4 font-medium whitespace-nowrap">{urlObj.siteName}</p>
        <p className="py-2">{urlObj.description}</p>
        <div className="pb-2 flex gap-2 justify-between">
          <a
            href={urlObj.siteURL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-200 break-all"
          >
            {urlObj.siteURL}
          </a>
          <AddLink
            buttonText="Edit"
            delBtn
            urlObj={urlObj}
            changeUpdate={changeUpdate}
            editProfile={false}
          />
        </div>
      </div>
    </Reorder.Item>
  );
};

export default UrlCard;
