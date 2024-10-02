import "../css/inputComp.css"

type inputType = 'text' | 'number' | 'password'

type inputProps = {

    label: string;
    id: string;
    type: inputType;
    className?: string;
    labelStyle?: string;
    inputStyle?: string;
    value?: string | number;
    placeHolder?: string;
    action: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputComponent: React.FC<inputProps> = ({ label, id, type, className, labelStyle, inputStyle, value, placeHolder, action }): JSX.Element => {

    return (

        <div className= {className ? className : "input-component"}>

            <label className={labelStyle}>
                {label}
            </label>

            <input
            className={inputStyle}
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