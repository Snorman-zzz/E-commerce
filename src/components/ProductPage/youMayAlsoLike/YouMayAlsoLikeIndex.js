import React, {useState} from "react";
import "./YouMayAlsoLikeIndex.scss";
import 'swiper/css'
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css/navigation'
import {Navigation} from "swiper/modules";


const YouMayAlsoLikeIndex = () => {

	const [swiperRef, setSwiperRef] = useState(null)
	const [imgs, setImgs] = useState([{
		current: 0,
		img: ['https://images.lululemon.com/is/image/lululemon/LW3DUTS_058292_1?$story_carousel$&wid=750&op_usm=0.8,1,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72',
			'https://images.lululemon.com/is/image/lululemon/LW3DUTS_034204_1?wid=750&op_usm=0.8,1,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72'
		],
		colors: ['https://images.lululemon.com/is/image/lululemon/58292?wid=68&hei=68&fit=crop,1&op_usm=0.8,1,10,0&fmt=webp&qlt=90,1&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72', 'https://images.lululemon.com/is/image/lululemon/34204?wid=68&hei=68&fit=crop,1&op_usm=0.8,1,10,0&fmt=webp&qlt=90,1&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72'],
		title: 'Perfectly Oversized Crew',
		visually: "",
		price: "108",
		oldPrice: ""
	}, {
		current: 0,
		img: ['https://images.lululemon.com/is/image/lululemon/LW3HKHS_063407_1?$story_carousel$&wid=750&op_usm=0.8,1,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72',
			'https://images.lululemon.com/is/image/lululemon/LW3FJ6S_7393_1?wid=750&op_usm=0.8,1,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72',
			'https://images.lululemon.com/is/image/lululemon/LW3FJ6S_047763_1?$story_carousel$&wid=750&op_usm=0.8,1,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72',
			'https://images.lululemon.com/is/image/lululemon/LW3HKHS_052868_1?$story_carousel$&wid=750&op_usm=0.8,1,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72',
			'https://images.lululemon.com/is/image/lululemon/LW3FJ6S_029847_1?$story_carousel$&wid=750&op_usm=0.8,1,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72',
			'https://images.lululemon.com/is/image/lululemon/LW3FL7S_032493_1?$story_carousel$&wid=750&op_usm=0.8,1,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72',
			'https://images.lululemon.com/is/image/lululemon/LW3HKHS_026839_1?$story_carousel$&wid=750&op_usm=0.8,1,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72',
			'https://images.lululemon.com/is/image/lululemon/LW3FJ6S_036744_1?$story_carousel$&wid=750&op_usm=0.8,1,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72',
			'https://images.lululemon.com/is/image/lululemon/LW3FJ6S_027597_1?$story_carousel$&wid=750&op_usm=0.8,1,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72',
			'https://images.lululemon.com/is/image/lululemon/LW3FJ6S_0001_1?$story_carousel$&wid=750&op_usm=0.8,1,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72'
		],
		colors: [
			'https://images.lululemon.com/is/image/lululemon/63407?wid=68&hei=68&fit=crop,1&op_usm=0.8,1,10,0&fmt=webp&qlt=90,1&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72',
			'https://images.lululemon.com/is/image/lululemon/7393?wid=68&hei=68&fit=crop,1&op_usm=0.8,1,10,0&fmt=webp&qlt=90,1&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72',
			'https://images.lululemon.com/is/image/lululemon/47763?wid=68&hei=68&fit=crop,1&op_usm=0.8,1,10,0&fmt=webp&qlt=90,1&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72',
			'https://images.lululemon.com/is/image/lululemon/52868?wid=68&hei=68&fit=crop,1&op_usm=0.8,1,10,0&fmt=webp&qlt=90,1&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72',
			'https://images.lululemon.com/is/image/lululemon/29847?wid=68&hei=68&fit=crop,1&op_usm=0.8,1,10,0&fmt=webp&qlt=90,1&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72',
			'https://images.lululemon.com/is/image/lululemon/32493?wid=68&hei=68&fit=crop,1&op_usm=0.8,1,10,0&fmt=webp&qlt=90,1&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72',
			'https://images.lululemon.com/is/image/lululemon/26839?wid=68&hei=68&fit=crop,1&op_usm=0.8,1,10,0&fmt=webp&qlt=90,1&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72',
			'https://images.lululemon.com/is/image/lululemon/36744?wid=68&hei=68&fit=crop,1&op_usm=0.8,1,10,0&fmt=webp&qlt=90,1&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72',
			'https://images.lululemon.com/is/image/lululemon/27597?wid=68&hei=68&fit=crop,1&op_usm=0.8,1,10,0&fmt=webp&qlt=90,1&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72',
			'https://images.lululemon.com/is/image/lululemon/0001?wid=68&hei=68&fit=crop,1&op_usm=0.8,1,10,0&fmt=webp&qlt=90,1&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72'
		],
		title: "Scuba Oversized Funnel Neck Half Zip",
		visually: "",
		price: "118",
		oldPrice: ""
	}, {
		current: 0,
		img: ['https://images.lululemon.com/is/image/lululemon/LW3DUTS_0002_1?$story_carousel$&wid=750&op_usm=0.8,1,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72', 'https://images.lululemon.com/is/image/lululemon/LW3DUVS_045337_1?$story_carousel$&wid=750&op_usm=0.8,1,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72'],
		colors: ['https://images.lululemon.com/is/image/lululemon/0002?wid=68&hei=68&fit=crop,1&op_usm=0.8,1,10,0&fmt=webp&qlt=90,1&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72', 'https://images.lululemon.com/is/image/lululemon/45337?wid=34&hei=34&fit=crop,1&op_usm=0.8,1,10,0&fmt=webp&qlt=90,1&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72'],
		title: "Perfectly Oversized Crew",
		visually: "",
		price: "69",
		oldPrice: "108"
	}, {
		current: 0,
		img: ['https://images.lululemon.com/is/image/lululemon/LW3FUHS_047748_1?$story_carousel$&wid=750&op_usm=0.8,1,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72', 'https://images.lululemon.com/is/image/lululemon/LW3FUIS_046634_1?$story_carousel$&wid=750&op_usm=0.8,1,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72'],
		colors: ['https://images.lululemon.com/is/image/lululemon/47748?wid=68&hei=68&fit=crop,1&op_usm=0.8,1,10,0&fmt=webp&qlt=90,1&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72',
			'https://images.lululemon.com/is/image/lululemon/46634?wid=68&hei=68&fit=crop,1&op_usm=0.8,1,10,0&fmt=webp&qlt=90,1&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72'],
		title: "Dance Studio Jacket",
		visually: '',
		price: "128",
		oldPrice: ""
	}])

	return <section>
		<div className="youMayAlsoLike">
			<h2 className="title">You may also like</h2>

			<div className="images-ul">
				{imgs.map((e, i) =>
					<div className="images-li" key={i}>
						<div className="images-li-wrap">
							<img
								src={e.img[e.current]}
								alt="" className="img"/>

							<div className="images-color">
								<div className='colors'>
									<Swiper
										className='swiper'
										onSwiper={setSwiperRef}
										spaceBetween={3}
										slidesPerView={7}
										modules={[Navigation]}
										navigation={{
											nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev', disabledClass: 'disable', // 当导航按钮变为不可用时添加的class,也就是当swiper索引为0时上一张没有prevEl的class类名就会添加一个disable，也就是.swiper-button-prev .disable
										}}
									>
										{e.colors.map((slideContent, index) => (
											<SwiperSlide style={{height: '100%', lineHeight: '4.3rem'}} key={index} virtualIndex={index}>
												<img
													className={'color ' + (index === e.current ? ' active' : '')}
													onMouseEnter={() => {
														e.current = index
														setImgs([...imgs])
													}}
													src={slideContent}
													alt=''/>
											</SwiperSlide>
										))}

										<div className='swiper-button-prev'>
										</div>
										<div className='swiper-button-next'>
										</div>
									</Swiper>
								</div>
							</div>
						</div>

						<div className="images-li-title">{e.title}</div>
						<div className="image-li-subtitle">
								<span className="price-1jnQj price">
									<span className="lll-hidden-visually">{e.visually}&nbsp;</span>
									<span className="">${e.price}
										<abbr className="price__currency-code">&nbsp;USD</abbr>
									</span>
									<span className="price__spacer">&nbsp;&nbsp;</span>
								</span>

							{e.oldPrice && <span className="price-1jnQj price delete">
									<span className="lll-hidden-visually">{e.visually}&nbsp;&</span>
								<span className="">${e.oldPrice}
									<abbr className="price__currency-code">&nbsp;USD</abbr>
									</span>
									<span className="price__spacer">&nbsp;</span>
								</span>}
						</div>

					</div>)}
			</div>
		</div>
	</section>
};

export default YouMayAlsoLikeIndex;
