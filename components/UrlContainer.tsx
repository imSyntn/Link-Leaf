import React from 'react'
import UrlCard from './UrlCard'

export interface urlType {
    sitename: string,
    siteurl: string,
    text: string
}

const UrlContainer = () => {

    const urls: urlType[] = [{
        sitename: "TechNova",
        siteurl: "https://technova.com",
        text: "A hub for the latest tech news and gadget reviews.",
      },
      {
        sitename: "HealthSphere",
        siteurl: "https://healthsphere.com",
        text: "Your go-to platform for health tips and wellness advice.",
      },
      {
        sitename: "EduLearn",
        siteurl: "https://edulearn.com",
        text: "Online courses and learning resources for all ages.",
      }, {
        sitename: "Foodie's Paradise",
        siteurl: "https://foodiesparadise.com",
        text: "Explore recipes, restaurant reviews, and food trends.",
      },
      {
        sitename: "TravelScope",
        siteurl: "https://travelscope.com",
        text: "Discover travel destinations and plan your next adventure.",
      },
      {
        sitename: "CodeBase",
        siteurl: "https://codebase.com",
        text: "A platform for developers to share code and projects.",
      }]

    return (
        <div className="h-full w-[100vw] border-2 border-gray-700 mt-6 relative overflow-x-auto shadow-md sm:rounded-lg">


            <table className='w-full text-lg text-left rtl:text-right text-gray-500 dark:text-gray-400 '>
                <thead className='border-b text-lg text-gray-700 uppercas dark:text-white bg-[#1e293b4a]'>
                    <tr>
                        <th scope="col" className="px-6 py-3">Site Name</th>
                        <th scope="col" className="px-6 py-3">Site URL</th>
                        <th scope="col" className="px-6 py-3">Description</th>
                        <th scope="col" className="px-6 py-3">
                            <span className='sr-only'>Edit</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        urls.map((item: urlType, index: number) => (
                            <UrlCard key={index} urlObj={item} />
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default UrlContainer