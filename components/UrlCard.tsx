import React from "react";
import { urlType } from "./UrlContainer";
import { AddLink } from "./AddLink";
import { IconGripVertical } from "@tabler/icons-react";
import { Reorder } from "framer-motion";
import Image from "next/image";
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
    <Reorder.Item
      value={urlObj}
      id={String(urlObj.id)}
      className="px-6 py-4 border rounded-lg dark:border-gray-700  hover:backdrop-blur-[2px] cursor-grab flex items-center gap-5 my-3 custom-2:px-3 custom:gap-2"
    >
      <IconGripVertical stroke={2} />
      <Image
        width={40}
        height={40}
        src={`https://www.google.com/s2/favicons?domain=${urlObj.siteURL}&sz=128`}
        alt={urlObj.siteName}
        className="rounded-sm custom-2:w-8 custom-2:h-58 mr-1"
      />
      <div className="w-full">
        <p className="font-medium whitespace-nowrap">{urlObj.siteName}</p>
        <p className="py-2">{urlObj.description}</p>
        <div className="flex gap-2 justify-between">
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
