import '../utils/style/components.css'

export default function Tag(props) {
    return (
        <div
            className="tag"
            onClick={() => {
            props.tagType === 'department'
                ? props.setDepartment(props.name)
                : props.setTopic(props.name)
            }}
        >
            {props.name}
        </div>
    )
}