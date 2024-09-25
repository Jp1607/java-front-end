import "../css/inputComp.css"

type inputType = 'text' | 'number' | 'password' | 'submit'

type inputProps = {

    label: string;
    id: string;
    type: inputType;
    className?: string;
    value?: string | number;
    placeHolder?: string;
    action: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputComponent: React.FC<inputProps> = ({ label, id, type, className, value, placeHolder, action }): JSX.Element => {

    return (

        <div className={className}>

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

        </div>
    )
}

export default InputComponent;