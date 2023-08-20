import { useState } from 'react'
import './PictureShow.scss'

const PictureShow = () => {
    const [current, setCurrent] = useState(1) // 切换标签
    return (
        <div className='pictureShow'>
            <div className='img-wrap'>
                <div className='hint'>Embrace your soft side.</div>
                <img
                    // src='https://images.lululemon.com/is/image/lululemon/na_jul23_wk3_W_BTS_CDP_Hero_D_WhatsNew?$cdp-hero$&wid=1970&op_usm=0.8,1,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72'
                    src='https://images.lululemon.com/is/image/lululemon/na_Jul23_wk4_W_OTM_CDP_Hero_D_WhatsNew?$cdp-hero$&amp;wid=1970&amp;op_usm=0.8,1,10,0&amp;fmt=jpeg&amp;qlt=75,1&amp;fit=constrain,0&amp;op_sharpen=0&amp;resMode=sharp2&amp;iccEmbed=0&amp;printRes=72'
                    alt=''
                    className='img'
                />
            </div>
            <div className='tabs'>
                <div className={'tab' + (current === 0 ? ' active' : '')} onClick={() => setCurrent(0)}>
                    All What's New
                </div>
                <div className={'tab' + (current === 1 ? ' active' : '')} onClick={() => setCurrent(1)}>
                    Women's What's New
                </div>

                <div className={'tab' + (current === 2 ? ' active' : '')} onClick={() => setCurrent(2)}>
                    Men's What's New
                </div>
                <div className={'tab' + (current === 3 ? ' active' : '')} onClick={() => setCurrent(3)}>
                    Accessories What's New
                </div>
            </div>
        </div>
    )
}

export default PictureShow
