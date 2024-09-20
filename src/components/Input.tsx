import "./css/inputComp.css"

type inputType = 'text' | 'number' | 'password'

type inputProps = {

    label: string;
    id: string;
    type: inputType;
    value?: string | number;
    placeHolder?: string;
    action: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputComponent: React.FC<inputProps> = ({ label, id, type, value, placeHolder, action }): JSX.Element => {

    return (

        <>
            <label>
                {label}
            </label>

            <input
                id={id}
                type={type}
                value={value}
                placeholder={placeHolder}
                onChange={action}>
            </input>
        </>
    )
}

export default InputComponent;