import '../utils/style/components.css'

export default function Button(props) {
    return (
        <button className={props.className}>
            {props.name}
        </button>
    )
}