import "../css/selectComp.css"

type selectProps = {
    label: string;
    id: string;
    options: string[];
    action: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

const InputSelect: React.FC<selectProps> = ({ label, id, options, action }) => {

    return (

        <>
            <label>
                {label}
            </label>

            <select
            id = {id}
            onChange = {action}>
                {options.map((o: string) => (
                    <option value = {o}>{o.toUpperCase()}</option>
                ))}
            </select>
        </>
    )
}

export default InputSelect