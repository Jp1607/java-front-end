import "../css/inputComp.css"

type inputType = 'text' | 'number' | 'password' | 'date'

type inputProps = {

    label: string;
    id: string;
    type: inputType;
    max?: number;
    classname?: string;
    labelStyle?: string;
    inputStyle?: string;
    value?: string | number;
    placeHolder?: string;
    readonly?: boolean;
    action: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputComponent: React.FC<inputProps> = ({ label, id, type, max, classname, labelStyle, inputStyle, value, placeHolder, readonly, action }): JSX.Element => {

    return (

        <div className= {classname ? classname : "input-component"} id={id}>

            <label className={labelStyle}>
                {label}
            </label>

            <input
            disabled={readonly}
            className={inputStyle}
            max={max}
        
                type={type}
                value={value}
                placeholder={placeHolder}
                onChange={action}>
            </input>

        </div>
    )
}

export default InputComponent;