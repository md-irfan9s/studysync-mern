import React, { useEffect, useState } from "react"
import ReactStars from "react-rating-stars-component"
// Import Swiper React components
// import { Swiper, SwiperSlide } from "swiper/react"
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import "../../App.css"
// Icons
import { FaStar } from "react-icons/fa"
// Import required modules
import { Autoplay, FreeMode, Pagination } from "swiper/modules"

// Get apiFunction and the endpoint
import { apiConnector } from "../../services/apiconnector"
import { ratingsEndpoints } from "../../services/apis"

// spotlight card 
import SpotlightCard from "../../Animation/SpotlightCard"

function ReviewSlider() {
  const [reviews, setReviews] = useState([])
  const truncateWords = 15

  useEffect(() => {
    (async () => {
      const { data } = await apiConnector(
        "GET",
        ratingsEndpoints.REVIEWS_DETAILS_API
      )
      if (data?.success) {
        setReviews(data?.data)
      }
    })()
  }, [])

  // console.log(reviews)

  return (
    <div className="text-white">
      <div className="my-[50px] h-[184px] max-w-maxContentTab lg:max-w-maxContent ">
        <Swiper
          // slidesPerView={3}
          spaceBetween={25}
          loop={true}
          freeMode={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          speed={900}
          modules={[FreeMode, Pagination, Autoplay]}
          className="w-full "
          breakpoints={{
            320: { slidesPerView: 1 },    // Mobile
            640: { slidesPerView: 1.5 },  // Small tablets
            768: { slidesPerView: 2 },    // Tablets
            // 1024: { slidesPerView: 3 },   // Laptops
            1280: { slidesPerView: 3 },   // Large screens
          }}
        >
          {reviews.map((review, i) => {
            return (

                <SwiperSlide key={i}>
              <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(39, 42, 155,0.7)">

                  <div className=" mr-4 flex flex-col gap-3 bg-richblack-900 p-4 rounded-md text-[14px]
                   items-center justify-center
                text-richblack-25 h-[150px]">
                    <div className="flex justify-center items-center gap-4">
                      <img
                        src={
                          review?.user?.image
                            ? review?.user?.image
                            : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                        }
                        alt=""
                        className="h-9 w-9 rounded-full object-cover"
                      />
                      <div className="flex flex-col">
                        <h1 className="font-semibold text-richblack-5">{`${review?.user?.firstName} ${review?.user?.lastName}`}</h1>
                        <h2 className="text-[12px] font-medium text-richblack-500">
                          {review?.course?.courseName}
                        </h2>
                      </div>
                    </div>
                    <p className="font-medium text-center text-richblack-25">
                      {review?.review.split(" ").length > truncateWords
                        ? `${review?.review
                          .split(" ")
                          .slice(0, truncateWords)
                          .join(" ")} ...`
                        : `${review?.review}`}
                    </p>
                    <div className="flex justify-center items-center gap-2 ">
                      <h3 className="font-semibold text-yellow-100">
                        {review.rating.toFixed(1)}
                      </h3>
                      <ReactStars
                        count={5}
                        value={review.rating}
                        size={20}
                        edit={false}
                        activeColor="#ffd700"
                        emptyIcon={<FaStar />}
                        fullIcon={<FaStar />}
                      />
                    </div>
                  </div>
              </SpotlightCard>

                </SwiperSlide>

            )
          })}
          {/* <SwiperSlide>Slide 1</SwiperSlide> */}
        </Swiper>
      </div>

    </div>
  )
}

export default ReviewSlider