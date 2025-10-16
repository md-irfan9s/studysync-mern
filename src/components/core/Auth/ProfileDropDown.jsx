import { useEffect, useRef, useState } from "react"
import { AiOutlineCaretDown } from "react-icons/ai"
import {
  VscDashboard, VscSignOut, VscHome,
  VscBook, VscSettingsGear
} from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import useOnClickOutside from "../../../hooks/useOnClickOutside"
import { logout } from "../../../services/operations/authAPI"
// import {GrCatalog} from "react-icons/gr"
import { MdOutlineRoundaboutLeft } from "react-icons/md"
import { IoIosContacts } from "react-icons/io"
import { BsChevronDown } from "react-icons/bs"
import { apiConnector } from "../../../services/apiconnector"
import { categories } from "../../../services/apis"

export default function ProfileDropdown() {
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const { token } = useSelector((state) => state.auth)

  const [loading, setLoading] = useState(false)
  const [subLinks, setSubLinks] = useState([])
  useEffect(() => {
    (async () => {
      setLoading(true)
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        setSubLinks(res.data.data)
      }
      catch (error) {
        console.log("Could not fetch Categories.", error)
      }
      setLoading(false)
    })()

  }, [])

  useOnClickOutside(ref, () => setOpen(false))

  if (!user) return null

  return (
    <button className="relative" onClick={() => setOpen(true)}>
      <div className="flex items-center gap-x-1">
        <img
          src={user?.image}
          alt={`profile-${user?.firstName}`}
          className="aspect-square w-[30px] rounded-full object-cover"
        />
        <AiOutlineCaretDown className="text-sm text-richblack-100" />
      </div>
      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-[118%] right-0 z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800"
          ref={ref}
        >
          <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
            <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
              <VscDashboard className="text-lg" />
              Dashboard
            </div>
          </Link>
          <div
            onClick={() => {
              dispatch(logout(navigate))
              setOpen(false)
            }}
            className="hidden md:flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
          >
            <VscSignOut className="text-lg" />
            Logout


          </div>

          {/* Responsive in different devices  */}
          <div className="md:hidden divide-y-[1px] divide-richblack-700
          text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-2
          "
            onClick={() => setOpen(false)}
          >

            <div className="flex items-center w-full gap-x-1 py-[10px] px-[12px] 5"
              onClick={() => navigate("/")}
            >
              <VscHome className="text-lg" />
              Home

            </div>


            <div className="flex flex-col items-center w-full gap-x-1 py-[10px] px-[12px] "
            >
              <div className="flex items-center gap-x-2">
                <VscBook className="text-lg text-richblack-100" />
                Catalog
                <BsChevronDown />
              </div>


              <div className="flex flex-col items-center"
              // onClick={() => setmenue(false)}
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

            <div className="flex items-center w-full gap-x-1 py-[10px] px-[12px]"
              onClick={() => navigate("/about")}
            >
              <MdOutlineRoundaboutLeft className="text-lg" />
              About us</div>

            <div className="flex items-center w-full gap-x-1 py-[10px] px-[12px]"
              onClick={() => navigate("/contact")}
            >
              <IoIosContacts className="text-lg" />
              Contact</div>

            <div className="flex items-center w-full gap-x-1 py-[10px] px-[12px]"
              onClick={() => navigate("/dashboard/settings")}
            >
              <VscSettingsGear />
              Settings
            </div>

            <div
            onClick={() => {
              dispatch(logout(navigate))
              setOpen(false)
            }}
            className="md:hidden flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
          >
            <VscSignOut className="text-lg" />
            Logout


          </div>
          </div>
        </div>
      )}
    </button>
  )
}