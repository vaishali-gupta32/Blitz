import { useNavigate } from "react-router";

// category 
const category = [
    {
        image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQXPiYN8-ivC2RWp_B7tcEwcOhWYbX67WJL6T-GBalCtwSsMl1d', 
        name: 'Men'
    },
    {
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfABMAsoTs4ztTnqY2A1cMwPwz2XEMZLN0yvq2hqhurJhwl7Gr',
        name: 'Women'
    },
    {
        image: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTQalc9B0ooS8fpMBXRQY1LkVfa3AkchUMzK0d2nprt1VlyxXnu',
        name:  'Kids'
    },
    {
        image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT6IDhaxlYUN9mG920eQEw44Ohu5vkwkPRMBIovtiO4ZHdz-bxF',
        name: 'Accessories'
    },
    {
        image: 'data:image/jpeg;base64,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',
        name: 'MERCH'
    }
];

const Category = () => {
    const navigate = useNavigate();
    return (
        <div className="relative p-4 bg-[url('/bg.png')]">
             <div className="ml-2 mt-6 px-4" >
                    <h2 className="text-4xl font-Montserrat mb-10 text-[#FFFF00]">Shop by Categories</h2>
                </div>
            <div className="flex flex-col mt-6 mb-5 px-4">
                {/* main 1 */}
                <div className="grid grid-cols-2 gap-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
                    {/* category  */}
                    {category.map((item, index) => {
                        return (
                            <div key={index} className="px-3">
                                {/* Image  */}
                                <div onClick={() => navigate(`/category/${item.name}`)} className="relative w-full h-40 lg:w-full lg:h-96 max-w-xs overflow-hidden cursor-pointer mb-4">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center py-2">
                                        <h1 className="text-lg lg:text-xl font-medium">{item.name}</h1>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 bg-[#433B58] text-white">
                <marquee className="py-2">Get up to 30% off on your first order &#x2022; Get up to 30% off on your first order &#x2022; Get up to 30% off on your first order &#x2022; Get up to 30% off on your first order &#x2022; Get up to 30% off on your first order</marquee>
            </div>
            <style dangerouslySetInnerHTML={{ __html: "\n.hide-scroll-bar {\n  -ms-overflow-style: none;\n  scrollbar-width: none;\n}\n.hide-scroll-bar::-webkit-scrollbar {\n  display: none;\n}\n" }} />
        </div>
    );
}

export default Category;
