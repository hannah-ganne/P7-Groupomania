import '../utils/style/components.css'

export default function Button(props) {
    return (
        <button className={props.className} type={props.type} onClick={props.onClick}>
            {props.name}
        </button>
    )
}