import React from 'react'

export default function ImageHelper(props) {
    const imageurl = props.item.dispic
    return (
        <div className='image'>
            <div className='rounded'>
                <img
                    src={imageurl}
                    style={
                        {
                            objectFit: "cover",
                            width: "100%",
                            display: "block"
                        }
                    }
                    className='mb-3 rounded'
                    alt=''
                />
            </div>
        </div>
    )
}
