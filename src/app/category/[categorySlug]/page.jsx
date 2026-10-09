import baseApiUser from '../../baseApi/urlApi';
import ShareCard from '../../component/shareCard/ShareCard';
import React from 'react';




const DynamicCatSlugPage = async ({ params }) => {

    const { categorySlug } = await params
    const res = await fetch(`${baseApiUser}//api/products?category=${categorySlug}`)
    const data = await res.json()
    console.log("dyn",data);



//   "_id": "6ac35170d407baee6a7b2b7e",
//     "name": "iPhone 15 Pro Max",
//     "slug": "iphone-15-pro-max",
//     "category": "phone",
//     "brand": "Apple",
//     "currentPrice": 195000,
//     "previousPrice": 190000,
//     "trend": "up",
//     "trendPercent": 2.6,
//     "image": "https://www.startech.com.bd/image/cache/catalog/mobile/apple/iphone-15-plus/iphone-15-plus-blue-official-05-500x500.webp",
//     "unit": "per piece",
//     "description": "Apple A17 Pro chip, titanium design, 48MP triple camera with 5x telephoto. USB 3 speed.",


    return (
        <div>
            dynamic
            <h2>{categorySlug}</h2>

            <div className='grid grid-cols-4'>
                {
                    data.map(dcd => <div key={dcd._id}>

                        <div >
                            <div className='flex'>
                            <h2>{dcd.name}</h2>
                            <img src={dcd.image} alt="logo" />
                            <p>{dcd.brand}</p>
                            <p>{dcd.cateory}</p>
                        </div>
                        </div>

                    </div>)
                }
            </div>
        </div>
    );
};

export default DynamicCatSlugPage;