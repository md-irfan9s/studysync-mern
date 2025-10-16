import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { VscHome, VscBook, } from "react-icons/vsc"
import { MdOutlineRoundaboutLeft } from "react-icons/md"
import { BsChevronDown } from "react-icons/bs"
import { IoIosContacts } from "react-icons/io"
import { useEffect, useState } from "react";
import { categories } from "../../../services/apis";
import { apiConnector } from "../../../services/apiconnector";
// import CatalogNavMenue from "./CatalogNavMenue";
import CTAButton from "../HomePage/Button"

export default function NavHamburfer({ openMenue, setmenue }) {

    const { token } = useSelector((state) => state.auth)
    const navigate = useNavigate();


    const [subLinks, setSubLinks] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        (async () => {
            setLoading(true)
            try {
                const res = await apiConnector("GET", categories.CATEGORIES_API)
                setSubLinks(res.data.data)
            } catch (error) {
                console.log("Could not fetch Categories.", error)
            }
            setLoading(false)
        })()
    }, [])

    // console.log("sub links", subLinks)

    //   const matchRoute = (route) => {
    //     return matchPath({ path: route }, location.pathname)
    //   }


    return (

        <div className="relative text-richblack-5 md:hidden">
            {
                token === null &&

                <div className="hamburgermenue absolute z-[100] bg-[rgb(22_29_41_/_59%)] backdrop-blur-sm top-8 right-[-2rem]
        -left-[15rem] h-[1000px] px-6 py-6 rounded-md flex flex-col gap-y-4 ">

                    <div className="flex items-center w-full gap-x-1 py-[10px] px-[12px] text-lg"
                        onClick={() => (navigate("/"),
                            setmenue(false)
                        )}
                    >
                        <VscHome className="text-lg" />
                        Home

                    </div>


                    <div className="flex flex-col items-start w-full gap-x-1 py-[10px] px-[12px] text-lg"
                    >
                        <div className="flex gap-x-2 text-start items-center">

                            <VscBook className="text-lg text-richblack-100" />
                            Catalog
                            <BsChevronDown />
                        </div>
                        <div className="flex flex-col items-center w-full"
                            onClick={() => setmenue(false)}
                        >
                            {loading ? (
                                <p className="text-center">Loading...</p>
                            ) : subLinks.length ? (
                                <>
                                    {subLinks
                                        ?.filter(
                                            (subLink) => subLink?.courses?.length > 0
                                        )
                                        ?.map((subLink, i) => (
                                            <Link
                                                to={`/catalog/${subLink.name
                                                    .split(" ")
                                                    .join("-")
                                                    .toLowerCase()}`}
                                                className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                                key={i}
                                            >
                                                <p>{subLink.name}</p>
                                            </Link>
                                        ))}
                                </>
                            ) : (
                                <p className="text-center">No Courses Found</p>
                            )}

                        </div>


                    </div>

                    <div className="flex items-center w-full gap-x-1 py-[10px] px-[12px] text-lg"
                        onClick={() => (navigate("/about"),
                            setmenue(false)
                        )}
                    >
                        <MdOutlineRoundaboutLeft className="text-lg" />
                        About us</div>

                    <div className="flex items-center w-full gap-x-1 py-[10px] px-[12px] text-lg"
                        onClick={() => (navigate("/contact"),
                            setmenue(false)
                        )}
                    >
                        <IoIosContacts className="text-lg" />
                        Contact</div>


                    <div onClick={() => setmenue(false)}>
                        <CTAButton active={true} linkto={"/signup"}>
                            Sign up
                        </CTAButton>
                    </div>

                </div>


            }

        </div>

    );

}


