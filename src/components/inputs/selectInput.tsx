import "../css/selectComp.css"

type selectProps<T> = {
    classname?: string; //
    label: string; //
    id: string; //
    value: T;
    labelKey: keyof T;
    idKey: keyof T;
    options: T[];
    onValueChange: (param: T) => void;
}

const InputSelect = <T,>({ classname, label, id, options, onValueChange, value, idKey, labelKey }: selectProps<T>) => {

    const handleValueChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        if (event.target.value === '') {
            onValueChange(null);
        } else {
            const O: T = options.find((o: T) => o[idKey].toString() === event.target.value.toString());

            if (O) {
                onValueChange(O);
            }
        }
    }

    return (

        <div className={classname ? classname : 'input-select'}>
            <label>
                {label}
            </label>

            <select
                id={id}
                onChange={handleValueChange}
                value={value !== undefined && value !== null ? value[idKey] as string : ''}>
                <option style={{ display: 'none' }} value="" ></option>
                <option value="" style={{ color: 'red' }}> Remover </option>
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
