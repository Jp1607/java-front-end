import "../css/inputComp.css"

type inputType = 'text' | 'number' | 'password' | 'date'

type inputProps = {

    label: string;
    id: string;
    type: inputType;
    className?: string;
    labelStyle?: string;
    inputStyle?: string;
    value?: string | number;
    placeHolder?: string;
    readonly?: boolean;
    action: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputComponent: React.FC<inputProps> = ({ label, id, type, className, labelStyle, inputStyle, value, placeHolder, readonly, action }): JSX.Element => {

    return (

        <div className= {className ? className : "input-component"} id={id}>

            <label className={labelStyle}>
                {label}
            </label>

            <input
            readOnly={readonly}
            className={inputStyle}
                type={type}
                value={value}
                placeholder={placeHolder}
                onChange={action}>
            </input>

        </div>
    )
}

export default InputComponent;