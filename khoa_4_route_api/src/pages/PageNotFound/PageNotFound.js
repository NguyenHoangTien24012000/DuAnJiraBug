import React from 'react'

export default function PageNotFound(props) {
    return (
        <div>
            Khong tim thay trang này {props.match.url}
        </div>
    )
}
