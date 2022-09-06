import { useState, useEffect } from "react"
import '../utils/style/Avatar.css'
import avatar from '../assets/user.png'

export default function Avatar(props) {

    return (
        <div className="avatar" onClick={props.toggleDropdown}>
            <img className="avatar--pic" src={props.imageUrl} alt="avatar"/>
        </div>
    )
}