'use client'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface CarouselProps {
    dotsProp?: boolean;
    infiniteProp?: boolean;
    speedProp?: number;
    slideToShowProp?: number;
    slidesToScrollProp?: number;
    children: React.ReactNode;
}

const Carousel = ({
    dotsProp = true,
    infiniteProp = true,
    speedProp = 500,
    slideToShowProp = 3,
    slidesToScrollProp = 3,
    children
}: CarouselProps) => {

    const settings = {
        dots: dotsProp,
        infinite: infiniteProp,
        speed: speedProp,
        slidesToShow: slideToShowProp,
        slidesToScroll: slidesToScrollProp,
        orientation: "horizontal",
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 6,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 820,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ]
    };

    return (
        <div className="w-full m-auto overflow-hidden">
            <div className="mt-1">
                <Slider {...settings}>{children}</Slider>
            </div>
        </div>
    );
};

export default Carousel;