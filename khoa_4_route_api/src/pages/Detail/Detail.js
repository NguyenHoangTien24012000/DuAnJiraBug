import React from 'react'

export default function Detail(props) {
    return (
        <div>
            Gia tri tham so : {props.match.params.id}

            Path name hien tai : {props.match.path}
        </div>
    )
}
