export function Buttons() {
    const {label = '', variant = '', callback = () => {}} = props;

    return(
        <div className={className('card-show-button', {secondary: variant === 'secondary'})} onClick={() => callback()}>{label}</div>
    );
}