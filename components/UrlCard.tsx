import React from 'react'
import { urlType } from './UrlContainer'
import { AddLink } from './AddLink'
// import { IconTrash } from '@tabler/icons-react';

const UrlCard = ({ urlObj }: { urlObj: urlType }) => {
  return (
    <tr className='border-b dark:border-gray-700  hover:backdrop-blur-[2px]'>
      <th className='px-6 py-4 font-medium whitespace-nowrap'>{urlObj.siteName}</th>
      <td className='px-6 py-4'>
        <a href={urlObj.siteURL} target="_blank" rel="noopener noreferrer" className='text-blue-50'>{urlObj.siteURL}</a>
      </td>
      <td className='px-6 py-4'>{urlObj.description}</td>
      <td className='px-6 py-4 text-right w-10'>
        <AddLink buttonText="Edit" delBtn urlObj={urlObj} />
        {/* <IconTrash /> */}
      </td>
    </tr>
  )
}

export default UrlCard