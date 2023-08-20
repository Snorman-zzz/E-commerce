import './ProductDetailsIndex.scss'
import {useEffect, useState} from 'react'
import axios from 'axios'
import 'swiper/css'
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css/navigation'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import {Navigation} from 'swiper/modules'
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import CloseIcon from '@mui/icons-material/Close';

const ProductDetailsIndex = () => {
	const [data, setData] = useState()
	const [mediaData, setMediaData] = useState([])
	const [current, setCurrent] = useState(0)
	const [swiperCurrent, setSwiperCurrent] = useState(0)
	const [swiperRef, setSwiperRef] = useState(null)
	const [showMagnifier, setShowMagnifier] = useState(false) // 是否放大图片
	const [sizeCurrent, setSizeCurrent] = useState(0)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get('http://api-lulu.hibitbyte.com/product/prod10550089?mykey=crQ6rrfM5peLErhuBL619aHXMX6Qs4vvXW85dJEk22AxPTwcUnemOyOvQtyexIOBdFhAREtJoiPR/AaWsWylpg==')
				setData(response.data.rs)
				setMediaData(response.data.rs.images[current].mainCarousel.media.split('|'))
			} catch (error) {
				console.error('Error fetching Data: ', error)
			}
		}
		fetchData()
	}, [])

	if (!data) {
		return <div>loading……</div>
	}
	return <div className='productDetailsIndex'>
		<div className='left'>
			<div className='left-warp'>
				<Swiper
					className='swiper'
					navigation={{
						nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev', disabledClass: 'disable', // 当导航按钮变为不可用时添加的class,也就是当swiper索引为0时上一张没有prevEl的class类名就会添加一个disable，也就是.swiper-button-prev .disable
					}}
					modules={[Navigation]}
					loop={true}
					spaceBetween={0}
					slidesPerView={1}
					onSlideChange={(e) => setSwiperCurrent(e.realIndex)}
					onSwiper={setSwiperRef}>
					{mediaData.map((e, i) => (<SwiperSlide key={e + i} className='swiper-img'>
						<img className='img' src={e} alt=''/>
					</SwiperSlide>))}

					<div className='swiper-button-prev'>
						<ArrowBackIosNewIcon style={{color: '#000'}}/>
					</div>
					<div className='swiper-button-next'>
						<ArrowForwardIosIcon style={{color: '#000'}}/>
					</div>
				</Swiper>

				<div className="magnifier" onClick={() => setShowMagnifier(true)}>
					<ZoomInIcon style={{color: '#000'}}/>
				</div>
			</div>
			<div className='left-bottom'>
				<div className='dots'>
					{mediaData.map((e, i) => (
						<div key={i} className={'dot ' + (i === swiperCurrent ? 'active' : '')}
						     onClick={() => swiperRef.slideTo(i, 300)}>
							<img src={e} alt='' className='img'/>
						</div>))}
				</div>
				<div className='hint'>Sundus is 5’9" and wears a size 6</div>
			</div>
		</div>
		<div className='center'>
			<div className="center-warp">
				<div className='title'>{data.name}</div>
				<div className='price'>{data.price}</div>
				<div className='hint'>
					<b>Colour </b>
					{data.swatches[current].swatchAlt}
				</div>
				<div className='colors'>
					{data.swatches.map((e, i) => (<div
						key={i}
						className={'color' + (i === current ? ' active' : '')}
						onClick={() => {
							setCurrent(i)
							// 切换颜色，改变主图
							setMediaData(data.images[i].mainCarousel.media.split('|'))
							setSwiperCurrent(0)
						}}>
						<img src={e.swatch} alt='' className='img'/>
					</div>))}
				</div>
				<div className="size-hint">
				<span className="size">
					<b>Size</b>&nbsp;&nbsp;
					{data.sizes[0].details[sizeCurrent]}
				</span>
					<span className="guide">
					<b>
					Size Guide
					</b>
				</span>
				</div>
				<div className="size-box">
					{
						data.sizes[0].details.map((e, i) =>
							<div onClick={() => setSizeCurrent(i)} key={e}
							     className={"box " + (sizeCurrent === i ? 'active' : '')}>{e}</div>
						)
					}
				</div>
			</div>
		</div>
		<div className='right'>
			<div className='right-wrap'>

				<div className="title">You may like</div>
				<div className="column">
					<img
						src="https://images.lululemon.com/is/image/lululemon/LW3EZLS_045772_1?wid=174&op_usm=0.8,1,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72"
						alt="" className="img"/>
					<div className="text">Perfectly <br/> Oversized</div>
				</div>
				<div className="column">
					<img
						src="https://images.lululemon.com/is/image/lululemon/LW3GLAS_027597_1?wid=174&op_usm=0.8,1,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72"
						alt="" className="img"/>
					<div className="text">Ribbed <br/> Softstreme</div>
				</div>
				<div className="column">
					<img
						src="https://images.lululemon.com/is/image/lululemon/LW3EBES_0001_1?wid=174&op_usm=0.8,1,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72"
						alt="" className="img"/>
					<div className="text">Perfectly <br/> Oversized</div>
				</div>
				<div className="column">
					<img
						src="https://images.lululemon.com/is/image/lululemon/LW3GLAS_054428_1?wid=174&op_usm=0.8,1,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72"
						alt="" className="img"/>
					<div className="text">Ribbed <br/> Softstreme</div>
				</div>
			</div>
		</div>

		{showMagnifier &&
			<div className="magnifier-page">
				<div className="magnifier-page-wrap">
					<div className="magnifier-head">
						<div className='magnifier-head-wrap' onClick={() => setShowMagnifier(false)}>
							<ArrowBackIosNewIcon fontSize="small"/>
							&nbsp;
							<div className="text">Back to Product</div>
						</div>
						<div className="magnifier-title">{data.name}</div>
						<div className="icon" onClick={() => setShowMagnifier(false)}>
							<CloseIcon fontSize="small"/>
						</div>
					</div>
					<div className="magnifier-body">
						{mediaData.map(e => <img key={e} className='img' src={e} alt=""/>)}
					</div>
				</div>
			</div>}
	</div>
}

export default ProductDetailsIndex
