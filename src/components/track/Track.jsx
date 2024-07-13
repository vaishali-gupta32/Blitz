import { useNavigate } from "react-router";

const Track = () => {
    return (
        <section className="bg-[#2E2646]">
            <div className="container mx-auto px-5 py-10 md:py-14 ">
                {/* Heading */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-vidaloka text-[#FFFF00]">
                        <span>Want to become a fashion influencer or boost your career? </span> <br />JOIN US !!!
                    </h1>
                </div>
                
                {/* Main Section */}
                <div className="flex flex-wrap -m-4 text-center">
                    {/* Track 1 */}
                    <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
                        {/* Track Card */}
                        <div className="border-2 hover:shadow-xl hover:shadow-gray-200 border-[#433B58] bg-[#EAEBFF] shadow-[inset_0_0_2px_rgba(0,0,0,0.6)] px-4 py-6 rounded-lg">
                            {/* Track Icon */}
                            <svg className="text-[#8379CD] w-12 h-12 mb-3 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                            {/* Track Title */}
                            <h2 className="title-font font-medium text-lg text-gray-900">How Blitz Can Help You Shine</h2>
                            {/* Track Description */}
                            <p className="leading-relaxed">Blitz connects you with top brands, offers powerful content creation tools, and provides a vast platform to grow your audience. Start earning through various monetization options and elevate your fashion influence.</p>
                        </div>
                    </div>

                    {/* Track 2 */}
                    <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
                        {/* Track Card */}
                        <div className="border-2 hover:shadow-xl hover:shadow-gray-200 border-[#433B58] bg-[#EAEBFF] shadow-[inset_0_0_2px_rgba(0,0,0,0.6)] px-4 py-6 rounded-lg">
                            {/* Track Icon */}
                            <svg className="text-[#8379CD] w-12 h-12 mb-3 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                            {/* Track Title */}
                            <h2 className="title-font font-medium text-lg text-gray-900">Steps to Become a Fashion Influencer with Blitz</h2>
                            {/* Track Description */}
                            <p className="leading-relaxed">Join Blitz, create your profile, connect with brands, and share your unique content. Grow your followers and earn from brand partnerships and sponsored posts. It's simple, fun, and rewarding!</p>
                        </div>
                    </div>

                    {/* Track 3 */}
                    <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
                        {/* Track Card */}
                        <div className="border-2 hover:shadow-xl hover:shadow-gray-200 border-[#433B58] bg-[#EAEBFF] shadow-[inset_0_0_2px_rgba(0,0,0,0.6)] px-4 py-6 rounded-lg">
                            {/* Track Icon */}
                            <svg className="text-[#8379CD] w-12 h-12 mb-3 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                            {/* Track Title */}
                            <h2 className="title-font font-medium text-lg text-gray-900">Exciting Perks of Being a Blitz Influencer</h2>
                            {/* Track Description */}
                            <p className="leading-relaxed">Enjoy exclusive invites to events, early access to collections, and join a supportive community. Access resources to refine your skills and stay ahead of trends. Join Blitz now to unlock these perks and more!</p>
                        </div>
                    </div>

                </div>

                 {/* About Us Section */}
                 <div className="mt-16 bg-cover bg-center py-16 px-6 rounded-lg" style={{ backgroundImage: 'url("https://th.bing.com/th/id/R.3387028e88a456486480d7b16e32f1d0?rik=%2bnn%2bKvrPYGmKRg&riu=http%3a%2f%2feskipaper.com%2fimages%2ffashion-background-1.jpg&ehk=dZVPJu2NGhv%2bp9VY77GqrRK4ck34%2bya18JMNx%2bfI0Wk%3d&risl=&pid=ImgRaw&r=0")' }}>
                    <h2 className="text-4xl font-bold text-left text-white mb-6">About Us</h2>
                    <p className="text-left text-white text-lg leading-relaxed">
                        Blitz is a premier platform for aspiring fashion influencers. We connect you with top brands, provide powerful content creation tools, and offer a vast platform to grow your audience. Our mission is to empower individuals to elevate their fashion influence and achieve their career goals. Join our community and start your journey today!
                    </p>
                </div>
            </div>
        </section>
    );
}

export default Track;
