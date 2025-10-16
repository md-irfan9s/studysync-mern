import React, { useState } from "react";
import SidebarLink from "../SidebarLink";
import { sidebarLinks } from "../../../../data/dashboard-links";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../../services/operations/authAPI";
import {VscSignOut} from "react-icons/vsc"
import ConfirmationModal from "../../../common/ConfirmationModal";

const Bottombar = () => {

    const { user } = useSelector((state) => state.profile)

    const [confirmationModal, setConfirmationModal] = useState(null)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (

        <div className="relative
        ">

            <div className="md:hidden fixed bottom-0 left-0 flex justify-center items-center w-full
         min-w-[220px] bg-richblack-800 z-10
        ">
                {
                    sidebarLinks.map((link) => {
                        if (link.type && user?.accountType !== link.type) return null

                        return (
                            <SidebarLink key={link.id} link={link} 
                            
                            iconName={link.icon} />
                        )
                    })
                }


                <button
                    onClick={() =>
                        setConfirmationModal({
                            text1: "Are you sure?",
                            text2: "You will be logged out of your account.",
                            btn1Text: "Logout",
                            btn2Text: "Cancel",
                            btn1Handler: () => dispatch(logout(navigate)),
                            btn2Handler: () => setConfirmationModal(null),
                        })
                    }
                    className="px-8 py-2 text-sm font-medium text-richblack-300"
                >
                    <div className="flex items-center gap-x-2">
                        <VscSignOut className="text-lg" />
                        <span className="hidden md:inline">Logout</span>
                    </div>
                </button>

            </div>
            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}

        </div>

    )


}

export default Bottombar