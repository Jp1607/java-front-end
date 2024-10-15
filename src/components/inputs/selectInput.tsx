import "../css/selectComp.css"

type selectProps<T> = {
    classname?: string; //
    label: string; //
    id: string; //
    value: T;
    labelKey: keyof T;
    idKey: keyof T;
    options: T[];
    readonly?: boolean;
    onValueChange: (param: T) => void;
}

const InputSelect = <T,>({ classname, label, id, options, readonly, onValueChange, value, idKey, labelKey }: selectProps<T>) => {

    const handleValueChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        if (event.target.value === '') {
            onValueChange(null);
        } else {
            const O: T = options.find((o: T) => o[idKey].toString() === event.target.value.toString());

            if (O) {
                onValueChange(O);
                console.log(O)
            }
        }
    }

    return (

        <div className={classname ? classname : 'input-select'}
            id={id}>
            <label>
                {label}
            </label>

            <select
                disabled={readonly}
                onChange={handleValueChange}
                value={value !== undefined && value !== null ? value[idKey] as string : ''}>
                {/* <option style={{ display: 'none' }} value="" ></option> */}
                    {/* <option value="" style={{ color: 'red' }}>  </option> */}
                {
                    options.map((o: T, index: number) => {
                        return <option key={`select-${index}`} value={o[idKey] as string}>{o[labelKey] as string}</option>
                    })
                }
            </select>
        </div>
    )
}

export default InputSelect;
